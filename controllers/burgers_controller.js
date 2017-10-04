var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var db = require("../models");

// Create all our routes and set up logic within those routes where required.
router.get("/index", function(req, res) {
  db.Burger.findAll({}).then(function(data){
      var hbsObject = {
        burgers: data
      };
      //console.log(hbsObject);
      res.render("index", hbsObject);    

  });
});

router.get("/", function(req, res) {
  db.Burger.findAll( {}).then(function(data){
      var hbsObject = {
        burgers: data
      };
      //console.log(hbsObject);
      res.render("index", hbsObject); 

  });
});
  
  router.post("/", function(req, res) {
    db.Burger.create(req.body).then(function() {
      res.redirect("/index");
    });
  });
  
  router.put("/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    //console.log("condition", condition);
  
    db.Burger.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      
      }).then(function(dbBurger) {
        res.redirect("/index");
      });
  });

  // Export routes for server.js to use.
module.exports = router;