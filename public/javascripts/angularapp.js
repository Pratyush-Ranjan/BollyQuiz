var app=angular.module('bquiz',['ngRoute']);

app.config(function($routeProvider){
$routeProvider
	.when("/",{
		templateUrl:"./views/user.ejs",
		controller: "bquizcontrol",
		resolve : ['auth',
		function(auth) {
			auth.isloggedin();
		}]
	})
	.when("/ques",{
		controller: "bquizcontrol",
		resolve : ['auth',
		function(auth) {
			auth.checklogin();
			auth.scoretotal();
		}]
	})
	.when("/ques1",{
		templateUrl:"./views/ques1.ejs",
		controller: "bquizcontrol",
		resolve : ['auth',
		function(auth) {
			auth.checklogin();
		}]
	})
	.when("/ques2",{
		templateUrl:"./views/ques2.ejs",
		controller: "bquizcontrol",
		resolve : ['auth',
		function(auth) {
			auth.checklogin();
		}]
	})
	.when("/ques3",{
		templateUrl:"./views/ques3.ejs",
		controller: "bquizcontrol",
		resolve : ['auth',
		function(auth) {
			auth.checklogin();
		}]
	})
	.when("/ques4",{
		templateUrl:"./views/ques4.ejs",
		controller: "bquizcontrol",
		resolve : ['auth',
		function(auth) {
			auth.checklogin();
		}]
	})
	.when("/ques5",{
		templateUrl:"./views/ques5.ejs",
		controller: "bquizcontrol",
		resolve : ['auth',
		function(auth) {
			auth.checklogin();
		}]
	})
	.when("/ques6",{
		templateUrl:"./views/ques6.ejs",
		controller: "bquizcontrol",
		resolve : ['auth',
		function(auth) {
			auth.checklogin();
		}]
	})
	.when("/ques7",{
		templateUrl:"./views/ques7.ejs",
		controller: "bquizcontrol",
		resolve : ['auth',
		function(auth) {
			auth.checklogin();
			auth.scoretotal();
		}]
	})
	.when("/ques8",{
		templateUrl:"./views/ques8.ejs",
		controller: "bquizcontrol",
		resolve : ['auth',
		function(auth) {
			auth.checklogin();
		}]
	})
	.when("/ques9",{
		templateUrl:"./views/ques9.ejs",
		controller: "bquizcontrol",
		resolve : ['auth',
		function(auth) {
			auth.checklogin();
		}]
	})
	.when("/ques10",{
		templateUrl:"./views/ques10.ejs",
		controller: "bquizcontrol",
		resolve : ['auth',
		function(auth) {
			auth.checklogin();
		}]
	})
	.when("/scoreboard",{
		templateUrl:"./views/scoreboard.ejs",
		controller: "bquizcontrol",
		resolve : ['auth',
		function(auth) {
			auth.checklogin();
		}]
	})
	.when("/end",{
		templateUrl:"./views/end.ejs",
		controller: "bquizcontrol",
		resolve : ['auth',
		function(auth) {
			auth.checklogin();
		}]
	})
	.otherwise({
		redirectTo: "/"
	})
});
app.factory('auth', ['$http','$location', '$rootScope',
function($http, $location, $rootScope) {
	var auth = {};
auth.checklogin = function() {
	$http.get('/loggedin')
	.success(function(response)
 	{ 
 	if (response === '0') 
 	   { $location.path("/"); 
 		} 
 		});
 }; 
 auth.isloggedin = function() {
	$http.get('/loggedin')
	.success(function(response)
 	{ 
 	if (response !== '0') 
 	   {  
 	   	  $location.path("/ques"); 
 		} 
 		});
 }; 
 auth.scoretotal = function() {
 	$rootScope.n=$rootScope.currentUser.score+$rootScope.currentUser.wrongans+1;
 	if( $rootScope.n===11)
 	$location.path("/end");	
 	else
 	$location.path("/ques"+$rootScope.n);
 };
	return auth;
}]);

app.controller('bquizcontrol',['$scope','$http','$location','$rootScope',function($scope,$http,$location,$rootScope){
$scope.users=[];
$scope.user={};

$http.get('/api/users')
		.success(function(data) {
			$scope.users=data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});


	$scope.logOut = function() {
    $http.post("/logout")
      .success(function() {
        $rootScope.currentUser = null;
        $location.path("/");
      });
  };
  $scope.logIn = function() {
    $http.post('/login', $scope.user)
    .error(function(error) {
			$scope.er='Invalid credentials';
		})
      .success(function(response) {
        $rootScope.currentUser = response;
        $location.path("/ques");
      });
  };

$scope.right = function() {
	$scope.mt=({
		username: $rootScope.currentUser.username,
		score: $rootScope.currentUser.score
	});
  $http.post('/api/rightanswer', $scope.mt)
		.success(function(data) {
			$scope.posty= data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
		$http.get('/api/currentus/'+$rootScope.currentUser.username)
		.success(function(datae) {
			$rootScope.currentUser = datae;
			$rootScope.n=$rootScope.currentUser.score+$rootScope.currentUser.wrongans+1;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	$http.get('/api/users')
		.success(function(data) {
			$scope.users = data;
			$location.path("/ques");
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
};

$scope.wrong = function() {
	$scope.mt=({
		username: $rootScope.currentUser.username,
		wrongans: $rootScope.currentUser.wrongans
	});
  $http.post('/api/wronganswer', $scope.mt)
		.success(function(data) {
			$scope.posty= data;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
		$http.get('/api/currentus/'+$rootScope.currentUser.username)
		.success(function(datae) {
			$rootScope.currentUser = datae;
			$rootScope.n=$rootScope.currentUser.score+$rootScope.currentUser.wrongans+1;
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	$http.get('/api/users')
		.success(function(data) {
			$scope.users = data;
			$location.path("/ques");
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
};
}]);