var app = angular.module('TscApp', ['ngStorage','angular-growl','ngAnimate','ui.bootstrap.modal']);

app.controller('IndexController', function($http,$scope,$window,growl,$timeout){

	$scope.items = {};
	$scope.user = {};

	$scope.notes = [];
    $scope.tag=[];
	var num=9;

	var configu = {disableCountDown: true};


	
	$scope.id = $window.localStorage['id'];
    $scope.response = $window.localStorage['res'];
	$scope.user.username = $window.localStorage['username'];
	$scope.user.password = $window.localStorage['password'];
    $scope.user.fullname = $window.localStorage['fullname'];
    $scope.user.email = $window.localStorage['email'];

	var config = {
            headers: {
                'Authorization' : $window.localStorage['accessToken'],
                'Accept': 'application/json;odata=verbose',
                }
            };

	$http.get("http://localhost:3000/users/" + $scope.id + "/notes",config)
            .success(function (data) {
                console.log(data);
                $scope.notes=data;

        })
            .error(function (err) {
                
            });


    $http.get("http://localhost:3000/users/" + $scope.id + "/tags",config)
            .success(function (data) {
                console.log(data);
                $scope.tag=data;

        })
            .error(function (err) {
                
            });

	
	if($window.localStorage['signup']){
		growl.success("<b>Exito</b>, usuario ha sido creado", configu);
		$window.localStorage['signup']="";
	}

    $scope.logout = function(){
        $window.localStorage.clear();
        $window.location.href="../views/login.html";
    }

    $scope.assignNoteTag = function(user_id) {
        $scope.idUser=user_id;
        $scope.assignModal = true;
        $scope.assign={};
    };


    $scope.okAssignNoteTag = function(assign) {
       
       $http.post("http://localhost:3000/assignation", assign, config)
        .then(
                          function(response){
                            growl.success("<b>Exito</b>, asignación creada", configu); 
                            $timeout(function() {
                                $window.location.href="../index.html";
                            },2000);                          
                          }, 
                          function(response){
                            $scope.err=response;
                            growl.error("Error en la asignación, favor intentar de nuevo", configu);
                          }
                        );  


        $scope.assignModal = false;
    };

    $scope.cancelAssignNoteTag = function() {
        $scope.assignNoteTagModal = false;
        $window.location.reload();
    };


    $scope.cancelAssign = function() {
        $scope.assignModal = false;
        $window.location.reload();
    };

    $scope.showTag = function(tags) {
        $scope.tags=tags;
        $scope.showNoteTagModal = true;
    };

    $scope.cancelShowTag = function() {
        $scope.showNoteTagModal = false;
    };
});

app.config(['growlProvider', function (growlProvider) {
  growlProvider.globalTimeToLive(3000);
  growlProvider.globalReversedOrder(true);
}]);
