var app = angular.module('TscApp', ['ngStorage','angular-growl','ngAnimate','ui.bootstrap.modal']);

app.controller('NotesController', function($http,$scope,$window,growl,$timeout){

	$scope.items = {};
	$scope.user = {};
	$scope.users = [];
	var num=9;

	var configu = {disableCountDown: true};


	//$scope.user=$rootScope.user;
	//var storageType = localStorageService.set("num",num);
	//$scope.num=localStorageService.get("num");
	//$window.localStorage.setItem("num", num);
	//$scope.title = $rootScope.test;
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

	//$scope.$storage = $localStorage
	/*if($scope.items)$window.location.href="../views/login.html";
	else $window.location.href="../views/about.html";*/

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
                            //growl.success("<b>Exito</b>, usuario ha sido creado", configu);
                            // success callback
                          }, 
                          function(response){
                            $scope.err=response;
                            growl.error("Error en el registro, favor verificar datos", configu);
                            // failure callback
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
        //$scope.editNote=note;
        $http.put("http://localhost:3000/users/"+note.user_id+"/notes/"+note.id, note, config)
        .then(
                          function(response){
                            growl.success("<b>Exito</b>, la nota ha sido actualizada", configu); 
                            $timeout(function() {
                                $window.location.reload();
                            },2000);                          
                            //growl.success("<b>Exito</b>, usuario ha sido creado", configu);
                            // success callback
                          }, 
                          function(response){
                            $scope.err=response;
                            growl.error("Error en el registro, favor verificar datos", configu);
                            // failure callback
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
        //$scope.editNote=note;
        $http.delete("http://localhost:3000/users/"+user_id+"/notes/"+id, config)
        .then(
                          function(response){
                            growl.success("<b>Exito</b>, la nota ha sido eliminada", configu); 
                            $timeout(function() {
                               $window.location.reload();
                            },2000);                          
                            //growl.success("<b>Exito</b>, usuario ha sido creado", configu);
                            // success callback
                          }, 
                          function(response){
                            $scope.err=response;
                            growl.error("Error en el registro, favor verificar datos", configu);
                            // failure callback
                          }
                        );  


        $scope.deleteNoteModal = false;
    };

    $scope.cancelDelete = function() {
        $scope.deleteNoteModal = false;
        $window.location.reload();
    };




	
	/*$scope.searchWeather = function(){
		var searchTerm = $scope.assetName;
		$http.get('http://api.openweathermap.org/data/2.5/find?q='+searchTerm+'&type=like&sort=population&cnt=30&units=metric&APPID=73136fa514890c15bc4534e7b8a1c0c4').success(function(data){
			$scope.items = data.list;
			$scope.totalCount = data.count;
		});
	};
	
    $scope.grabar = function(){
    	$localStorage.valor=$scope.num;
    }*/

});

app.config(['growlProvider', function (growlProvider) {
  growlProvider.globalTimeToLive(3000);
  growlProvider.globalReversedOrder(true);
}]);