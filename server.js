var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var path = require("path");

var PORT = process.env.PORT || 3000;

var app = express();

// Requiring our models for syncing
var db = require("./models");

// Serve static content for the app from the "public" directory in the application directory.
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));

// Override with POST having ?_method=UPDATE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

//wasn't sure how to declare helpers, giving it a try

    //Calculate number of uneaten burgers
    exphbs.create('get_Ready', function (obj) {
        var cnt = 0;
        for(var i=0;i<obj.length;i++){
            if(obj.devoured === false)
                cnt++;
        }
        return cnt;
    }); 

    //Calculate number of burgers that have been eaten
    exphbs.create('get_Devoured', function (obj) {
        var cnt = 0;
        for(var i=0;i<obj.length;i++){
            if(obj.devoured === true)
                cnt++;
        }
        return cnt;
    });

    

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Import routes and give the server access to them.
var routes = require("./controllers/burgers_controller.js");

app.use("/", routes);

/*app.listen(PORT, function(){
    console.log("app is listening on PORT: " + PORT);
});
*/

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });


