var app = angular.module('TscApp', ['ngStorage','angular-growl','ngAnimate','ui.bootstrap.modal']);

app.controller('IndexController', function($http,$scope,$window,growl,$timeout){

	$scope.items = {};
	$scope.user = {};

	$scope.notes = [];
    $scope.tag=[];
	var num=9;

	var configu = {disableCountDown: true};


	//$scope.user=$rootScope.user;
	//var storageType = localStorageService.set("num",num);
	//$scope.num=localStorageService.get("num");
	//$window.localStorage.setItem("num", num);
	//$scope.title = $rootScope.test;
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

    /*$scope.next = function(user_id,note_id) {
        $scope.idNote=note_id;
        $scope.idUser=user_id;
        $scope.assignNoteTagModal = true;
        $scope.assignModal = false;
    };*/

    $scope.okAssignNoteTag = function(assign) {
        //$scope.idUser=user_id;        
        //$scope.assign.note_id=note_id;
        //$scope.assign.tag_id=tag_id;
        $http.post("http://localhost:3000/assignation", assign, config)
        .then(
                          function(response){
                            growl.success("<b>Exito</b>, asignación creada", configu); 
                            $timeout(function() {
                                $window.location.href="../index.html";
                            },2000);                          
                            //growl.success("<b>Exito</b>, usuario ha sido creado", configu);
                            // success callback
                          }, 
                          function(response){
                            $scope.err=response;
                            growl.error("Error en la asignación, favor intentar de nuevo", configu);
                            // failure callback
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

    $scope.basicUsage = function (type) {
        var configu = {disableCountDown: true};
        switch (type) {
            case "success":
            growl.success("<b>I'm</b> a success message", configu);
            break;
            case "info":
            growl.info("I'm an info message", configu);
            break;
            case "warning":
            growl.warning("I'm the warning message", configu);
            break;
            default: 
            growl.error("Ups, error message here!", configu);
        }
    };

    $scope.showTag = function(tags) {
        $scope.tags=tags;
        $scope.showNoteTagModal = true;
    };

    $scope.cancelShowTag = function() {
        $scope.showNoteTagModal = false;
    };
    
	//$scope.$storage = $localStorage
	/*if($scope.items)$window.location.href="../views/login.html";
	else $window.location.href="../views/about.html";*/
	/*$scope.registerNote = function(id) {
		$scope.idUser=id;
  		$scope.showModal = true;
	};

	$scope.note={}

	$scope.ok = function(id) {
		$scope.note.user_id=id;
		$http.post("http://localhost:3000/users/"+id+"/notes",$scope.note, config)
		.then(
            	          function(response){
            	          	growl.success("<b>Exito</b>, una nota ha sido creada", configu); 
            	          	$timeout(function() {
    							$window.location.href="../index.html";
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
    							$window.location.href="../index.html";
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
    							$window.location.href="../index.html";
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


    $scope.registerTag = function(id) {
        $scope.idUser=id;
        $scope.registerTagModal = true;
    };

    $scope.tagUser={}

    $scope.newTag = function(id) {
        $scope.tagUser.user_id=id;
        $http.post("http://localhost:3000/users/"+id+"/tags",$scope.tagUser, config)
        .then(
                          function(response){
                            growl.success("<b>Exito</b>, una etiqueta ha sido creada", configu); 
                            $timeout(function() {
                                $window.location.href="../index.html";
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
        //$scope.editNote=note;
        $http.put("http://localhost:3000/users/"+tag.user_id+"/tags/"+tag.id, tag, config)
        .then(
                          function(response){
                            growl.success("<b>Exito</b>, la nota ha sido actualizada", configu); 
                            $timeout(function() {
                                $window.location.href="../index.html";
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
        //$scope.editNote=note;
        $http.delete("http://localhost:3000/users/"+user_id+"/tags/"+id, config)
        .then(
                          function(response){
                            growl.success("<b>Exito</b>, la etiqueta ha sido eliminada", configu); 
                            $timeout(function() {
                                $window.location.href="../index.html";
                            },2000);                          
                            //growl.success("<b>Exito</b>, usuario ha sido creado", configu);
                            // success callback
                          }, 
                          function(response){
                            $scope.err=response;
                            growl.error("Error, favor verificar", configu);
                            // failure callback
                          }
                        );  


        $scope.deleteTagModal = false;
    };

    $scope.cancelDeleteTag = function() {
        $scope.deleteTagModal = false;
        $window.location.reload();
    };*/

    

  	/*$scope.doGreeting = function(greeting) {
        $window.location.href="views/createNote.html"
   	};*/

   	/*$scope.registerNote = function(greeting) {
        $window.location.href="views/createNote.html"
    };*/






	
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
