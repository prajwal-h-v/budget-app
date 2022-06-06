var express = require("express");
const { Users } = require("../models/users");
var router = express.Router();
var jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");
const bcrypt = require("bcrypt");

/* GET users listing. */
router.get("/", auth, function (req, res, next) {
  Users.getUsers()
    .then((result) => {
      console.log(result);
      res.status(200).send({
        data: result,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).send({
        error: error.error,
      });
    });
});

// POST request
router.post("/register", (req, res) => {
  const user = req.body;
  // console.log("request -", user);
  Users.getUser(user.email).then((userDoc) => {
    if (userDoc) {
      res.status(200).send({ error: "Entered email already exists." });
      return;
    }
    Users.saveUser(new Users(user))
      .then((result) => {
        delete result.password;
        res.status(202).send({
          token: jwt.sign({ userId: result._id }, "secret"),
          data: result,
        });
      })
      .catch((error) => {
        res.status(400).send({
          error: "Something went wrong->" + error,
        });
      });
  });
});

router.post("/login", (req, res) => {
  console.log("user login request");
  const user = req.body;
  Users.getUser(user.email)
    .then((userDoc) => {
      if (!userDoc) {
        res.status(200).send({
          error: "Email Address is not registered",
        });
        return;
      }
      bcrypt.compare(user.password, userDoc.password, (err, result) => {
        if (err || !result) {
          res.status(200).send({
            error: "Entered wrong password",
          });
          return;
        }
        delete userDoc.password;
        res.status(202).send({
          token: jwt.sign(
            { user_id: userDoc._id, email: userDoc.email },
            "secret"
          ),
          data: userDoc,
        });
      });
    })
    .catch((error) => {
      res.status(400).send({
        error: "Something went wrong" + error,
      });
    });
});

module.exports = router;
