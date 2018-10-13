const express = require("express");
const router = express.Router();
const knex = require("../../db/index.js");

router.post("/:restaurant_id", (req, res) => {
  knex("evaluations")
    .insert({
      restaurant_id: req.params.restaurant_id,
      user_id: 1,
      price: req.body.price,
      cozy: req.body.cozy,
      luxury: req.body.luxury,
      modern: req.body.modern,
      taste: req.body.taste,
      loud: req.body.loud,
      services: req.body.services,
      recurrence: req.body.recurrence
    })
    .then(() => {
      // const knexWhere = knex('evaluations').where({restaurant_id: req.params.id}) <---- why wouldn't this work ????
      const getAvg = entry => {
        return knex("evaluations")
          .where({ restaurant_id: req.params.restaurant_id })
          .first(knex.raw(`ROUND(AVG(${entry}))`))
          .then(data => data.round);
      };

      const total_count_recur = () => {
        return knex("evaluations")
          .where({ restaurant_id: req.params.restaurant_id })
          .first()
          .count("recurrence")
          .then(data => data.count);
      };

      const total_count_true_recur = () => {
        return knex("evaluations")
          .where({ restaurant_id: req.params.restaurant_id })
          .where({ recurrence: true })
          .first()
          .count("recurrence")
          .then(data => data.count);
      };

      const getAvgRecurrence = () => {
        return total_count_true_recur().then(true_recur => {
          return total_count_recur().then(total_recur => {
            return Math.round(
              (parseInt(true_recur) / parseInt(total_recur)) * 100
            );
          });
        });
      };

      return Promise.all([
        getAvg("price"),
        getAvg("cozy"),
        getAvg("luxury"),
        getAvg("modern"),
        getAvg("taste"),
        getAvg("loud"),
        getAvg("services"),
        getAvgRecurrence()
      ]);
    })
    .then(
      ([
        avg_price,
        avg_cozy,
        avg_luxury,
        avg_modern,
        avg_taste,
        avg_loud,
        avg_services,
        avg_recurrence
      ]) => {
        return knex("restaurants")
          .where({ id: req.params.restaurant_id })
          .first()
          .update({
            price: avg_price,
            cozy: avg_cozy,
            luxury: avg_luxury,
            modern: avg_modern,
            taste: avg_taste,
            loud: avg_loud,
            services: avg_services,
            recurrence: avg_recurrence
          });
      }
    )
    .then(result => {
      knex("restaurants")
        .first()
        .where({ id: req.params.restaurant_id })
        .then(data => {
          console.log(data);
          res.send(data);
        });
    });
});

router.get("/get_ten/:eval_types/:numOfResult", (req, res) => {
  const getData = () => {
    if (req.params.eval_types.split(",").includes("empty"))
      res.send({ errors: "no data" });
    else {
      const receivedDataArray = req.params.eval_types.split(",");
      let receivedParams = req.params.eval_types.split(",");
      receivedParams.unshift("name");
      receivedParams.unshift("id");
      receivedParams.push("imgUrl");
      let queryString = "(";

      for (let i = 0; i < receivedDataArray.length; i++) {
        if (i >= receivedDataArray.length - 1)
          queryString += `${receivedDataArray[i]} )`;
        else queryString += `${receivedDataArray[i]} + `;
      }
      // console.log(`(${queryString}/${receivedDataArray.length}) desc`)
      if (req.query.rest_type === "undefined") {
        return knex("restaurants")
          .select(receivedParams)
          .orderBy(
            knex.raw(`${queryString}/${receivedDataArray.length}`),
            "desc"
          )
          .limit(req.params.numOfResult)
          .then(data => data);
      } else {
        return knex("restaurants")
          .select(receivedParams)
          .where({ type: req.query.rest_type })
          .orderBy(
            knex.raw(`${queryString}/${receivedDataArray.length}`),
            "desc"
          )
          .limit(req.params.numOfResult)
          .then(data => data);
      }
    }
  };

  const get_total_count = restaurant_id => {
    return knex("evaluations")
      .where({ restaurant_id: restaurant_id })
      .first()
      .count("restaurant_id")
      .then(data => data);
  };

  getData()
    .then(restaurants => {
      const passingData = [restaurants];

      for (let restaurant of restaurants) {
        passingData.push(get_total_count(restaurant.id));
      }
      return Promise.all(passingData);
    })
    .then(data => {
      const restaurantsData = data.shift();

      for (let i = 0; i < restaurantsData.length; i++) {
        restaurantsData[i].count = data[i].count;
        delete restaurantsData[i].id;
      }

      console.log(restaurantsData);
      res.send(restaurantsData);
    });
});

module.exports = router;
