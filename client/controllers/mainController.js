app.controller('MainController', ['$scope', "$http","$location","$cookies", function($scope, $http, $location, $cookies) {
    
    
    $scope.wirdGeladen = false;
    $scope.locations= [];
    $scope.teilnehmer={};

    

   
    $scope.suche = function(suchDaten, key){
        if (key.charCode === 13){
            $cookies.put("suche", suchDaten);
            $location.path("/result");
            $scope.wirdGeladen = true;
            $http.post("/",  {"suche":suchDaten}).success(function(res){
                var businesses = res.businesses;
                
                $scope.wirdGeladen = false;
                   $http.get("/result").success(function(daten){

                        for (var i = 0; i<businesses.length; i++){
                            for (var j = 0; j < daten[0].location.length; j++){
                                if (businesses[i].name == daten[0].location[j]){
                                    businesses[i].teilnehmer = daten[0].teilnehmer[j]
                                }                        
                            }
                        } 
                        
                    $scope.locations = businesses;    
                })
               
            })
        }

    }
    



    
    $scope.gmail= { 
        username: "",
        email: ""
    }
    
    $scope.onGoogleLogin = function(locationName){
        console.log($scope.locations)
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
            var dabei ={
                "standort": $cookies.get("suche"),
                "location": locationName,
                "zahl": 0
            };
            if (!$cookies.get(locationName)){
                $cookies.put(locationName, true);
                dabei.zahl = 1;
                //alert("add")
                //hinzufügen
            }
            else{
                //reduzieren
                $cookies.remove(locationName);
                dabei.zahl = -1;
                //alert("reduce")
            }
            
            $http.post("/result", dabei ).success(function(res){
                for (var i = 0; i<$scope.locations.length; i++){
                    for (var j = 0; j < res.location.length; j++){
                        if ($scope.locations[i].name == res.location[j]){
                            $scope.locations[i].teilnehmer = res.teilnehmer[j]
                        }                        
                    }
                }
            
            })
  
        }
    }

    





}]);
