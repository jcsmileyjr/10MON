app.controller('weighInController', function($scope, $state, CurrentWeek, NewUser, UpdateUserData, CurrentWeightLoss, NewArray, RandomQuote){
    
    /*creates a number variable determine by the currentUser weightLoss and the weightLoss after weigh-In. This is used with ng-show weightScale to show plus or minus sign with weight change. */
    $scope.upOrDown = 0;
    
    /*takes the startDate of the challenge minus today date divide by 7 to get how many weeks into the challenge*/
    $scope.currentWeek = CurrentWeek.getCurrentWeekNumber();
    
    /*gets the currentUser name*/
    $scope.currentUser = NewUser.list(); 
    
    /*sets the random quote variable on the weighIn page from the RandomQuote service*/
    $scope.randomQuote = RandomQuote.getQuote();
    
    /*function attached to weighIn page submit button. Takes as parameters the current user input weigh variable (from inputWeighIn text-box) and currentUser global varibile from logIn. */
    $scope.weighIn = function(weight) {
        
        /*This for loop searches through the users array of objects for a name match. If there is a name match, the weight parameter is subtracted from the startWeight to create a new weightLoss for the matched array element. Using the getWeightLoss method, the updated users array is placed into the myArray variable without the players weight and sent to the controller to update the Player Ranking Page.*/
        UpdateUserData.updateUser(weight);
        
        /*tranfer user/change the app's state to the ranking page/ranking state*/
        $state.go('ranking');
    }/*end of weighIn function*/    

});