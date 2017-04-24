var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var app = express();
const mongoClient = require("mongodb").MongoClient;
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
var router = express.Router();
var user = require ("./routes/user")

const dburl = "mongodb://webapps:webapps@ds157500.mlab.com:57500/webapps";
const url = "https://dynamic-web-application-projects-derdrache.c9users.io/";


var strategy = new Auth0Strategy({
    domain:       "derdrache.eu.auth0.com",
    clientID:     "Y7e33aq7hFf82uNQ68fOMa0iPX1Hse_g",
    clientSecret:  "ulcg2dt7iK7qTTzCuAgVA6UXxu13VeEidXA2m67XGkKQLdGY7AvzEFu9061C4bIz",
    callbackURL:  "https://dynamic-web-application-projects-derdrache.c9users.io/" || 'http://localhost:3000/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  });

passport.use(strategy);

// This can be used to keep a smaller payload
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});









/* Middelwares */
app.use(express.static(__dirname+"/client"));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());



router.get('/login',
  function(req, res){
    res.render('login', { env: process.env });
  });

// Perform session logout and redirect to homepage
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// Perform the final stage of authentication and redirect to '/user'
router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/user');
  });






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