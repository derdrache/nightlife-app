var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var app = express();
const mongoClient = require("mongodb").MongoClient;


const dburl = "mongodb://webapps:webapps@ds157500.mlab.com:57500/webapps";









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
        res.send(result.body)
        
    })
    
});


app.post("/result", function(req,res){
    
    mongoClient.connect(dburl, function(err,db){
        if (err) throw err;
       
        db.collection("nightlife_locations").find({"standort": req.body.standort}).toArray(function(err,result){
            if (err) throw err;
           
          if (result == 0){
              db.collection("nightlife_locations").insert({
                  "standort": req.body.standort,
                  "location": [req.body.location],
                  "teilnehmer": [req.body.zahl]
              })
          }
          else{
              var index = 0;
              for (var i = 0; i< result[0].location.length; i++){
                  if (result[0].location[i] == req.body.location){
                        var change = result[0].teilnehmer;
                        change[i] = change[i] + req.body.zahl
                      db.collection("nightlife_locations").update({"standort": req.body.standort},
                      {$set:
                      {"teilnehmer": change}
                      })
                      break;
                  }
                  index++
              }
              
              if (index == result[0].location.length){
                  var location = result[0].location;
                    location.push(req.body.location);
                  var teilnehmer = result[0].teilnehmer;
                    teilnehmer.push(req.body.zahl);
                  
                  
                  db.collection("nightlife_locations").update({"standort": req.body.standort},
                  {$set:
                      {"location": location,
                        "teilnehmer": teilnehmer  
                      }
                  })
              }
              
          }
        db.collection("nightlife_locations").find({"standort": req.body.standort}).toArray(function(err,result){
            if (err) throw err;
            
            res.send(result[0])
        }) 
            
            
        
        db.close();    
        });
    });
    
});



app.get("/result", function(req,res){
    mongoClient.connect(dburl, function(err,db){
        if (err) throw err;
        
        db.collection("nightlife_locations").find({}).toArray(function(err,result){
            if (err) throw err;
            
            res.send(result);
        })
         db.close();
    })
    
    
    
    
   
}) 


       










app.listen((process.env.PORT||8080|| 5000), function(){
    console.log("roger, we are online...");
})