var app = angular.module('myApp', ['ui.bootstrap']);

app.controller('monsterController', function($scope, $http, $filter){
    $scope.userData = [{"name":"Mary Runner", "startWeight":200, "weightLoss":6}, {"name":"Brand Lifter", "startWeight":182, "weightLoss":2.5}, {"name":"Chad Zumba", "startWeight":243, "weightLoss":4.8}];
    

    /*add code for disabling nav is logIn do not return true*/
    $scope.setView = function(view){
        $scope.view = view;
    }
    
    /*the starting page is set to the login page */
    $scope.setView('logInPage');
});