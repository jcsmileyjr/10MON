app.controller('weighInController', function($scope, $state, UpdateUserData, CurrentWeightLoss, NewArray, SetView, NewUser, CurrentWeek, RandomQuote){
    
    /*takes the startDate of the challenge minus today date divide by 7 to get how many weeks into the challenge
    $scope.getCurrentWeekNumber();*/
    $scope.currentWeek = CurrentWeek.getCurrentWeekNumber();
	
	/*sets the random quote variable on the weighIn page from the RandomQuote service*/
	$scope.randomQuote = RandomQuote.getQuote();
    
	/*update the local varible from the global userName*/
    $scope.currentUser = NewUser.list();
    
    $scope.$watch(
        function(){ return NewUser.list(); },

        function(newVal) {
          $scope.currentUser = newVal;
        });
	
    /*Callback function used in the weighIn function. This function gets data from the server (response.data). 
	Global (upAndDown and newArray) varibles are updated from the local variable and the view is change to the 
	ranking page*/
    $scope.returnedWeight = function(x){
        
		/*Set the data received from the server (x) into a local variable*/
        $scope.weightLoss = x;
		
		/*Use the new weightLoss amount, received from the server, in the calculating (new minus the old amount) 
		and updating the globle upAndDown variable */
        CurrentWeightLoss.getWeightScale($scope.weightLoss.weightLoss); 
        
        /*used updated userData array to update newArray array that is used on the Ranking page */
		NewArray.updateNewArray($scope.weightLoss.newArray);
        
        /*switch page view from weighIn page to ranking page*/
        /*tranfer user/change the app's state to the ranking page/ranking state*/
        $state.go('ranking');         
    }
    
    /*function attached to weighIn page submit button. Takes as parameters the current user input weigh variable 
	(from inputWeighIn text-box) and currentUser global varibile from logIn. */
    $scope.weighIn = function(weight) {
        
        /*This for loop searches through the users array of objects for a name match. If there is a name match, 
		the weight parameter is subtracted from the startWeight to create a new weightLoss for the matched array element. 
		Using the getWeightLoss method, the updated users array is placed into the myArray variable without the players weight 
		and sent to the controller to update the Player Ranking Page.*/
        UpdateUserData.updateUser(weight, NewUser.list(), $scope.returnedWeight);       

    }/*end of weighIn function*/  
    
});