app.controller('rankingController', function($scope, $state, CurrentWeek, NewArray, CurrentWeightLoss, NewUser){
    
    /*inital setting of Ranking page percentage or pounds checkbox */
    $scope.percentOrPounds = false;
    
    /*gets the currentUser name*/
    $scope.currentUser = NewUser.list();    
    
    /*takes the startDate of the challenge minus today date divide by 7 to get how many weeks into the challenge*/
    $scope.currentWeek = CurrentWeek.getCurrentWeekNumber(); 
    
    /*Use the CurrentWeightLoss service to set the global upOrDown varible used on the ranking page to show either positive or negative signs with the weightLoss variable.*/
    $scope.upOrDown = CurrentWeightLoss.getUpOrDown();
        
    /*used updated userData array to update newArray array that is used on the Ranking page */
    $scope.newArray = NewArray.weightLessArray();    

});