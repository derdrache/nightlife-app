app.controller('MainController', ['$scope', "$http","$location","$cookies", function($scope, $http, $location, $cookies) {
    
    
    $scope.wirdGeladen = false;
    $scope.locations= [];
   
    $scope.suche = function(suchDaten, key){
        if (key.charCode === 13){
            $location.path("/result");
            $scope.wirdGeladen = true;
            $http.post("/",  {"suche":suchDaten}).success(function(res){
                $scope.locations = res.businesses;
                $scope.wirdGeladen = false;
            })
        }

    }
    

    
    $scope.gmail= { 
        username: "",
        email: ""
    }
    
    $scope.onGoogleLogin = function(locationName){
        if (!$cookies.get("email")){
            var params = {
                "clientid": "42885971084-rm9b9e16dpl60lreonr7gm0uvupv04lk.apps.googleusercontent.com",
                "cookiepolicy": "single_host_origin",
                "callback": function(result){
                    if (result["status"]["signed_in"]){
                        
                        var request = gapi.client.plus.people.get(
                            {
                                "userId": "me"
                            }
                            )
                            request.execute(function(resp){
                                $scope.$apply(function(){
                                    $scope.gmail.username= resp.displayName;
                                    $scope.gmail.email = resp.emails[0].value;
                                    $cookies.put("email", resp.emails[0].value)
                                    console.log($scope.gmail)
                                })
                            })
                    }
                },
                "approvalprompt": "force",
                "scope": "https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.profile.emails.read"
            }
            gapi.auth.signIn(params);
        }  
        else{
            var dabei = 0;
            if (!$cookies.get("locationName")){
                $cookies.put("locationName", true);
                dabei = 1;
                //hinzufügen
            }
            else{
                //reduzieren
                $cookies.put("locationName", false);
                dabei = -1;
            }
            $http.post("/result", dabei).success(function(res){
                console.og(res);
            })
  
        }
        
        
        
        
    }


}]);
