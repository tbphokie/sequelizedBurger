var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/index", function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };
    //console.log(hbsObject);
    res.render("index", hbsObject);
  });
});
router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };
    //console.log(hbsObject);
    res.render("index", hbsObject);
  });
});
  
  router.post("/", function(req, res) {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

      //console.log("burgers_controller.js");
      //console.log(date);

    burger.insertOne([
      "burger_name", "devoured", "date"
    ], [
      req.body.burger_name, req.body.devoured, dateTime
    ], function() {
      res.redirect("/index");
    });
  });
  
  router.put("/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    //console.log("condition", condition);
  
    burger.updateOne({
      devoured: req.body.devoured,
    }, condition, function() {
      res.redirect("/index");
    });
  });

  // Export routes for server.js to use.
module.exports = router;