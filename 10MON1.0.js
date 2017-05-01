var app = angular.module('myApp', ['ui.bootstrap']);

app.controller('monsterController', function($scope, $http, $filter){
    $scope.userData = [{"name":"Mary Runner", "startWeight":200, "weightLoss":6}, {"name":"Brand Lifter", "startWeight":182, "weightLoss":2.5}, {"name":"Chad Zumba", "startWeight":243, "weightLoss":4.8}];

});