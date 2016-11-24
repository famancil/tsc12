var app = angular.module('TscApp', ['ngStorage','angular-growl','ngAnimate']);

app.controller('UserController', function($http,$scope,$window,growl){

	$scope.users=[];
    $scope.user={};

    var grant={
        'grant_type': 'password'
    }

    if($window.localStorage['username']){
        $window.location.href="../index.html";
    }

    var configu = {disableCountDown: true};

	$scope.logout = function(){
    	$window.localStorage.clear();
        $window.location.reload();
    }
    var sum=0;
    var a;
    $scope.err={}

    $scope.checkUser = function(config) {

        $http.get("http://localhost:3000/users",config)
            .success(function (data) {
                console.log(data);
                $scope.users=data;
                for (var i = 0; i < $scope.users.length; ++i){
                    if($scope.users[i].user.username == $scope.username && 
                        $scope.users[i].user.password == $scope.password){
                            sum=1;
                            a=i;
                        }
                }
                if(sum==1){
                    
                    $window.localStorage['id']=$scope.users[a].user.id;
                    $window.localStorage['username']=$scope.username;
                    $window.localStorage['password']=$scope.password;
                    $window.localStorage['fullname']=$scope.users[a].user.fullname;
                    $window.localStorage['email']=$scope.users[a].user.email;
                    
                    $window.location.href="../index.html";
                }
                else {
                    growl.error("Username y/o password incorrectos", configu);
                }
           
            })
            .error(function (response) {
                growl.error("Error, access token expirado", configu);

            });
        
    };

    $scope.getToken =function(type) {
        if(!$window.localStorage['accessToken']){
            if(type == 2){
                var configAuth = {
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'client_id': '705d5a0572ab9b0b60ca8e779683671d819626f670931eb90e3c492b255ce672',
                        'cliente_secret': 'd76fb29b962f257b2a8d37d80930163084a8cbf5100ef5df7d892e7595be983a',
                        'username' : 'famancil',
                        'password'  : 'hola123'
                     }
                };
            }
            else {
                var configAuth = {
                    headers: {
                        'Accept': 'application/json;odata=verbose',
                        'client_id': '705d5a0572ab9b0b60ca8e779683671d819626f670931eb90e3c492b255ce672',
                        'cliente_secret': 'd76fb29b962f257b2a8d37d80930163084a8cbf5100ef5df7d892e7595be983a',
                        'username' : $scope.username,
                        'password'  : $scope.password
                    }
                };
            }

            $http.post("http://localhost:3000/oauth/token",grant,configAuth)
            .success(function (data) {
                //$window.localStorage['token_type'] = data.token_type;
                $window.localStorage['accessToken']= data.token_type+" "+data.access_token;
                var config = {
                    headers: {
                    'Authorization' : $window.localStorage['accessToken'],
                    'Accept': 'application/json;odata=verbose',
                    }
                }; 
                if(type == 1)$scope.checkUser(config);
                else $scope.registerUser(config);
            })
            .error(function (response) {
                growl.error("Error en las credenciales, favor revisar", configu);
            });
        }        
    };

    $scope.login =function() {
        $scope.getToken(1);     // 1 = Login
    }

    $scope.signup =function() {
        $scope.getToken(2);         // 2 = signup
    }   

	$scope.registerUser = function(config) {

		sum=0;
		$http.get("http://localhost:3000/users",config)
            .success(function (data) {
                console.log(data);
                $scope.users=data;
                for (var i = 0; i < $scope.users.length; ++i){
                	if($scope.users[i].user.username != $scope.user.username){
                		sum++;
                	}      
            	}
            	if(sum==$scope.users.length){   
                    $http.post("http://localhost:3000/users",$scope.user, config)
            	       .then(
            	          function(response){
                            $window.localStorage['signup']="<b>Exito</b>, el usuario ha sido creado";
                            $window.location.href="../index.html";

                            $window.localStorage['id']=$scope.users[sum-1].user.id + 1;
                            $window.localStorage['username']=$scope.user.username;
                            $window.localStorage['password']=$scope.user.password;
                            $window.localStorage['fullname']=$scope.user.fullname;
                            $window.localStorage['email']=$scope.user.fullname;
            	          }, 
            	          function(response){
                            $scope.err=response;
                            growl.error("Error en el sistema, favor verificar credenciales", configu);
            	          	
            	          }
            	        );
            	}

            	else{ 
                    $window.localStorage.clear();
                    growl.error("Este username ya existe", configu);
                }
                
        	})
            .error(function (err) {
                
            });
		
	};
});

app.config(['growlProvider', function (growlProvider) {
  growlProvider.globalTimeToLive(3000);
  growlProvider.globalReversedOrder(true);
}]);