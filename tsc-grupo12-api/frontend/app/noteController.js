var app = angular.module('TscApp', ['ngStorage','angular-growl','ngAnimate','ui.bootstrap.modal']);

app.controller('NotesController', function($http,$scope,$window,growl,$timeout){

	$scope.items = {};
	$scope.user = {};
	$scope.users = [];
	var num=9;

	var configu = {disableCountDown: true};

	$scope.id = $window.localStorage['id'];
	$scope.user.username = $window.localStorage['username'];
	$scope.user.password = $window.localStorage['password'];

	var config = {
            headers: {
                'Authorization' : $window.localStorage['accessToken'],
                'Accept': 'application/json;odata=verbose',
                }
            };

	$http.get("http://localhost:3000/users/" + $scope.id ,config)
            .success(function (data) {
                console.log(data);
                $scope.users=data.user;

        })
            .error(function (err) {
                
            });

    $scope.logout = function(){
        $window.localStorage.clear();
        $window.location.href="../views/login.html";
    }

    $scope.registerNote = function(id) {
        $scope.idUser=id;
        $scope.showModal = true;
    };

    $scope.note={}

    $scope.ok = function(id) {
        $http.post("http://localhost:3000/users/"+id+"/notes",$scope.note, config)
        .then(
                          function(response){
                            growl.success("<b>Exito</b>, una nota ha sido creada", configu); 
                            $timeout(function() {
                                $window.location.reload();
                            },2000);                          
                          }, 
                          function(response){
                            $scope.err=response;
                            growl.error("Error en el registro, favor verificar datos", configu);
                          }
                        );  


        $scope.showModal = false;
    };

    $scope.cancel = function() {
        $scope.showModal = false;
        $window.location.reload();
    };

    $scope.editNote = function(note) {
        $scope.editNote=note;
        $scope.editNoteModal = true;
    };

    $scope.okEdit = function(note) {
        $http.put("http://localhost:3000/users/"+note.user_id+"/notes/"+note.id, note, config)
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


        $scope.editNoteModal = false;
    };

    $scope.cancelEdit = function() {
        $scope.editNoteModal = false;
        $window.location.reload();
    };

    $scope.deleteNote = function(id,user_id) {
        $scope.idNote=id;
        $scope.idUser=user_id;
        $scope.deleteNoteModal = true;
    };

    $scope.okDelete = function(id,user_id) {
        $http.delete("http://localhost:3000/users/"+user_id+"/notes/"+id, config)
        .then(
                          function(response){
                            growl.success("<b>Exito</b>, la nota ha sido eliminada", configu); 
                            $timeout(function() {
                               $window.location.reload();
                            },2000);                          
                          }, 
                          function(response){
                            $scope.err=response;
                            growl.error("Error en el registro, favor verificar datos", configu);
                          }
                        );  


        $scope.deleteNoteModal = false;
    };

    $scope.cancelDelete = function() {
        $scope.deleteNoteModal = false;
        $window.location.reload();
    };
});

app.config(['growlProvider', function (growlProvider) {
  growlProvider.globalTimeToLive(3000);
  growlProvider.globalReversedOrder(true);
}]);