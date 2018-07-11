app.controller('logInController', function($scope, $state, Cred, NewUser, NewArray, CurrentWeightLoss, RandomQuote){

    /*function attached to log-In page submit button. Takes as parameters the current userName variable (from logIn page) and pwd variable (from logIn page) to check against a authentication array.*/
    $scope.logIn = function(userName, pwd) {
        /*sets the userName as a global varible currentUser*/
        $scope.currentUser = userName;
        
        /*use the Cred Service to get the current Cred array that holds the user names and passcodes. This is placed into the scope variable cred.*/
        $scope.cred = Cred.logInfo();

        /*This loop searchs the cred array. A if statement compare user’s pwd and userName to cred json records. The player is sent to the weighIn page/state.*/
        for(var i=0; i<$scope.cred.length;i++){
            if(userName==$scope.cred[i].name && pwd==$scope.cred[i].password)
                {
                    /*use the NewUser service to save the userName to use as a current name varible*/
                    NewUser.save(userName);
                    
                    /*inital setting of currentUser possible weight change using currentWeightLoss varible in getWeightScale function */
                    CurrentWeightLoss.getCurrentWeightLoss(); 
                    
                    //set the authentication on the Cred service to true 
                    Cred.updateAuthenticate();
                    
        			/*tranfer user/change the app's state to the weighIn page/weighIn state*/
        			$state.go('weighIn');                    
                }

            else 
                {
                    $scope.message = "Your UserName or Password has Failed";    
                }
        }/*end of for i-loop*/ 


}/*end of for logIn Function*/
	
    /*sets the random quote variable on the weighIn page from the RandomQuote service*/
    $scope.randomQuote = RandomQuote.getQuote();	
    
});