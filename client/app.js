var app = angular
  .module("Nightlife", ["ngRoute", "ngCookies"]);

 app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl: 'views/home.html'
    })
    .when("/result", {
        templateUrl: "views/result.html"
    })
    
});


