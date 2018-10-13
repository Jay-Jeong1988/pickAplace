const express = require("express");
const router = express.Router();
const knex = require("../../db/index.js");
const { check, validationResult, body } = require('express-validator/check');
const jwt = require('jsonwebtoken');
var store = require("../../store.js");


router.post(
  "/",
  [
    check("email").isEmail(),
    check("password").isLength({ min: 5 }),
    body("password_confirmation").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      } else {
        return true;
      }
    }),
    body("email").custom(value => {
      return knex("users")
        .select()
        .where({ email: value })
        .then(([user]) => {
          if (user) return Promise.reject("E-mail already in use");
        });
    }),
    body("address").custom(value => {
      if (value === "") throw new Error("Address should not be empty");
      else return true;
    })
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      errors.array().forEach(error => console.log(error.msg));
      return res.status(422).json({ errors: errors.array() });
    } else {
      store
        .createUser({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          email: req.body.email,
          password: req.body.password,
          address: req.body.address
        })
        .then(() => {
          const token = jwt.sign(
            {
              jwt: {
                email: req.body.email,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                address: req.body.address
              }
            },
            "secret",
            { expiresIn: 60 * 60 }
          );
          console.log(`user created: 
                ${req.body.first_name} ${req.body.last_name}, 
                email: ${req.body.email} 
                password: ${req.body.password} 
                address: ${req.body.address}`);
          res.status(200).send({ jwt: token });
        });
    }
  }
);

module.exports = router;
