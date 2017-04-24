app.controller('MainController', ['$scope', "$http","$location", function($scope, $http, $location) {
    
    
    $scope.wirdGeladen = false;
    $scope.locations= [];
   
    $scope.suche = function(suchDaten, key){
        if (key.charCode === 13){
            $location.path("/result");
            $scope.wirdGeladen = true;
            $http.post("/",  {"suche":suchDaten}).success(function(res){
                $scope.locations = res.businesses;
                console.log(res)
                $scope.wirdGeladen = false;
            })
        }

    }
    
    $scope.teilnehmen= function(auswahl){
        console.log(auswahl)
    }
    
    $scope.lock = new Auth0Lock('Y7e33aq7hFf82uNQ68fOMa0iPX1Hse_g', 'derdrache.eu.auth0.com',{ auth: {
          redirectUrl: 'https://dynamic-web-application-projects-derdrache.c9users.io/#/result'
        , responseType: 'code'
        , params: {
          scope: 'openid name email picture'
        }
      }});
    


}]);
