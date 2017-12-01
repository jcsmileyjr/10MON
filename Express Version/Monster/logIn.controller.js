app.controller('logInController', function($scope, $state, Cred, SetView, NewUser, NewArray, CurrentWeightLoss){
   
        //callback function used in the logIn function below. If the data sent from the server is successfully received, this function use it to update the newArray array and switch to the weighIn page. If the data is not received, then the user remain on the login page and received fail messages. 
        $scope.returnData = function(x){
            
            $scope.cred = x; 
            
	        /*This loop searchs the security array. A if statement compare user’s pwd and userName to cred json records. If found to be true, the newArray is return to the controller.*/
	        if($scope.cred.success === true)
	        	{
	            	/*set the global Cred varible to true using the Cred service */
	                Cred.updateAuthenticate();
	                    
        			/*tranfer user/change the app's state to the weighIn page/weighIn state*/
        			$state.go('weighIn');  

	                /*inital setting of app's newArray information used on the Ranking Page using the NewArray service*/
	                //$scope.newArray = $scope.cred.newArray;
					NewArray.updateNewArray($scope.cred.newArray);
					
		    		/*inital setting of currentUser possible weight change using currentWeightLoss varible in getWeightScale function */
		    		CurrentWeightLoss.getCurrentWeightLoss();					
	        	}

	     	else if ($scope.cred.success === false)
	            {
	                $scope.message = "Your UserName or Password has Failed";    
	            }
	            
	        else 
	            {                    
	                $scope.message = "Software Error, Please press the Submit Password Button again. "
	            }            
        };
    
	    /*function attached to log-In page submit button. Takes as parameters the current userName variable (from logIn page) and pwd variable (from logIn page) to insert into logInformation array. This array is sent to the logIn.php.*/
	    $scope.logIn = function(userName, pwd) {
	        
	        /*use the NewUser service to save the userName to use as the current global name varible*/
	        NewUser.save(userName); 
	       
	        /*use the Cred Service to get the current Cred array that holds the user names and passcodes. This is placed into the scope variable cred.*/
	        Cred.logInfo(userName, pwd, $scope.returnData);
    
		}/*end of for logIn Function*/
});