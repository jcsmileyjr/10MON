app.controller('rankingController', function($scope, CurrentWeightLoss, NewArray, NewUser, CurrentWeek){
    
	
	/*takes the startDate of the challenge minus today date divide by 7 to get how many weeks into the challenge*/
    $scope.currentWeek = CurrentWeek.getCurrentWeekNumber();
	
    /*Use the CurrentWeightLoss service to set the global upOrDown varible used on the ranking page to show either positive or negative signs with the weightLoss variable.*/
    $scope.upOrDown = CurrentWeightLoss.getUpOrDown();
	
	$scope.newArray = NewArray.getNewArray();
    
    $scope.currentUser = NewUser.list();
	
    /*inital setting of Ranking page percentage or pounds checkbox */
    $scope.percentOrPounds = false;	
    
    $scope.$watch(
        function(){ return NewUser.list(); },

        function(newVal) {
          $scope.currentUser = newVal;
        });  
    
});