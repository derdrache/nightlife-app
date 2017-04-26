var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var app = express();
const mongoClient = require("mongodb").MongoClient;


const dburl = "mongodb://webapps:webapps@ds157500.mlab.com:57500/webapps";
const url = "https://dynamic-web-application-projects-derdrache.c9users.io/";








/* Middelwares */
app.use(express.static(__dirname+"/client"));
app.use(bodyParser.json());







/* Suche Abfragen */
app.post("/", function(req,res){
    var suche = req.body.suche;
     var apiSearch = {
        url : "https://api.yelp.com/v3/businesses/search?location="+suche,
       headers: {
           "Authorization": " Bearer kSz-zn592vm_19DtHHhM-hPv7Uw8Bi6FjF1rk1UFMYhnGDZqCTn8UBwYmMd3BAtI15wy3LxlxyObTmExKfgSwfMdKfRTjDhp4avBvg2K7SFlJl1CHSeNyEAG_Kf1WHYx"
       }
    }
    
    request.get(apiSearch, function (req,result){
        var apiData = res.body;
    
        res.send(result.body)
    })
    
})





 


       










app.listen((process.env.PORT||8080|| 5000), function(){
    console.log("roger, we are online...");
})