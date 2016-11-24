var app = angular.module('TscApp', ['ngStorage','angular-growl','ngAnimate','ui.bootstrap.modal']);

app.controller('TagController', function($http,$scope,$window,growl,$timeout){

	$scope.items = {};
	$scope.user = {};
	$scope.users = [];
    $scope.tag=[];
	var num=9;

	var configu = {disableCountDown: true};

    $scope.registerTag = function(id) {
        $scope.idUser=id;
        $scope.registerTagModal = true;
    };

	$scope.user.id = $window.localStorage['id'];
	$scope.user.username = $window.localStorage['username'];
	$scope.user.password = $window.localStorage['password'];
    $scope.user.fullname = $window.localStorage['fullname'];

	var config = {
            headers: {
                'Authorization' : $window.localStorage['accessToken'],
                'Accept': 'application/json;odata=verbose',
                }
            };

    $http.get("http://localhost:3000/users/" + $scope.user.id + "/tags",config)
            .success(function (data) {
                console.log(data);
                $scope.tag=data;

        })
            .error(function (err) {
                
            });

    $scope.logout = function(){
        $window.localStorage.clear();
        $window.location.href="../views/login.html";
    }

    

    $scope.tagUser={}

    $scope.newTag = function(id) {
        $scope.tagUser.user_id=id;
        $http.post("http://localhost:3000/users/"+id+"/tags",$scope.tagUser, config)
        .then(
                          function(response){
                            growl.success("<b>Exito</b>, una etiqueta ha sido creada", configu); 
                            $timeout(function() {
                                $window.location.reload();
                            },2000);                          
                          }, 
                          function(response){
                            $scope.err=response;
                            growl.error("Error en el registro, favor verificar datos", configu);
                          }
                        );  


        $scope.registerTagModal = false;
    };

    $scope.cancelRegister = function() {
        $scope.registerTagModal = false;
        $window.location.reload();
    };

    $scope.editTag = function(tag) {
        $scope.editTag=tag;
        $scope.editTagModal = true;
    };

    $scope.okEditTag = function(tag) {

        $http.put("http://localhost:3000/users/"+tag.user_id+"/tags/"+tag.id, tag, config)
        .then(
                          function(response){
                            growl.success("<b>Exito</b>, la nota ha sido actualizada", configu); 
                            $timeout(function() {
                                $window.location.reload();
                            },2000);                          
                          }, 
                          function(response){
                            $scope.err=response;
                            growl.error("Error en el registro, favor verificar datos", configu);
                          }
                        );  


        $scope.editTagModal = false;
    };

    $scope.cancelEditTag = function() {
        $scope.editTagModal = false;
        $window.location.reload();
    };

    $scope.deleteTag = function(id,user_id) {
        $scope.idTag=id;
        $scope.idUser=user_id;
        $scope.deleteTagModal = true;
    };

    $scope.okDeleteTag = function(id,user_id) {
        $http.delete("http://localhost:3000/users/"+user_id+"/tags/"+id, config)
        .then(
                          function(response){
                            growl.success("<b>Exito</b>, la etiqueta ha sido eliminada", configu); 
                            $timeout(function() {
                                $window.location.reload();
                            },2000);                          
                          }, 
                          function(response){
                            $scope.err=response;
                            growl.error("Error, favor verificar", configu);
                          }
                        );  


        $scope.deleteTagModal = false;
    };
    $scope.cancelDeleteTag = function() {
        $scope.deleteTagModal = false;
        $window.location.reload();
    };
});

app.config(['growlProvider', function (growlProvider) {
  growlProvider.globalTimeToLive(3000);
  growlProvider.globalReversedOrder(true);
}]);
