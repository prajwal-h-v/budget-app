var express = require("express");
const { mongo } = require("../app");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log(mongo);
  res.render("index", { title: "Express" });
});

module.exports = router;
