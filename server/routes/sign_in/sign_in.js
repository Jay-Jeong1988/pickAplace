var express = require("express");
var router = express.Router();
var store = require("../../store.js");
const knex = require("../../db/index.js");
const jwt = require('jsonwebtoken');

router.post("/", (req, res) => {
  store
    .authenticate_user({
      email: req.body.email,
      password: req.body.password
    })
    .then(({ success }) => {
      if (success) {
        knex("users")
          .first()
          .where({ email: req.body.email })
          .then(user => {
            const payload = {
              email: user.email,
              first_name: user.first_name,
              last_name: user.last_name,
              address: user.address
            };
            const token = jwt.sign(
              {
                jwt: payload
              },
              "secret",
              { expiresIn: "1h" }
            );

            console.log(`${req.body.email} has signed in`);
            res.status(200).send({ jwt: token });
          });
      } else {
        const errors = [];
        errors.push({
          unauthorized: "Invalid email/password. Please try again."
        });
        res.status(401).json({ errors: errors });
      }
    });
});

module.exports = router;
