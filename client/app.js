var app = angular
  .module("Nightlife", ["ngRoute", "ngCookies"]);

 app.config(function($routeProvider) {
    $routeProvider
    .when("/result", {
        templateUrl: "views/result.html"
    })

});


function onLoadFunction(){
    gapi.client.setApiKey("AIzaSyCg1hcItdFf2kuahZ8kN221Q5tTvbrwAI8");
    gapi.client.load("plus", "v1", function(){})
}
