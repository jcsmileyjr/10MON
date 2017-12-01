
//Sets the variable myApp as a Angular applicatation named '10MON'. The module ui-router is injected as a dependency to provide url routing. 

var app = angular.module('10MON', ['ui.router']);



// A .config function is used to provide 'state' and url routing for the app thru the stateProvider (from ui-router).

app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider, $state) {



    //If no route or link is select, the app redirects to the nav page

    $urlRouterProvider.otherwise('/logIn');


    $stateProvider

        //The logIn state redirects the user to the logIn.html template and monsterController via the /logIn url. 

        .state('logIn', {

            url:'/logIn',

            templateUrl: 'views/logIn.html',

            controller: "logInController"

        })

        //The mealBook state redirects the user to the mealBook.html template and mealBookController via the /mealBook url. 

        .state('weighIn', {

            url:'/weighIn',

            templateUrl: 'views/weighIn.html',

            controller: "weighInController"

        })

        //The button state redirects the user to the button.html template and buttonController via the /button url. 

        .state('ranking', {

            url:'/ranking',

            templateUrl: 'views/ranking.html',

            controller: "rankingController"

        })
	
}]);
/*
	app.run(function($transitions, Cred) {

		  $transitions.onStart({ to: 'weighIn'}, function(trans) {

		    var auth = trans.injector().get('Cred');

		    if (Cred.getAuthenticate()==false) {

		      // User isn't authenticated. Redirect to a new Target State

		      return trans.router.stateService.target('logIn');

		    }

		  });

		    

		  $transitions.onStart({ to: 'ranking'}, function(trans) {

		    var auth = trans.injector().get('Cred');

		    if (Cred.getAuthenticate()==false) {

		      // User isn't authenticated. Redirect to a new Target State

		      return trans.router.stateService.target('logIn');

		    }
		}); 
	})	
    */