/*Start of main app*/
app.controller('monsterController', ['$scope', '$state','Cred', function($scope, $state, Cred){
    
      
    $scope.logOut = function(){
        
        /*lock down the navigation*/
	    /*set the global Cred varible to false using the Cred service */
	    Cred.logOutAuthenticate();
		
        
        /*tranfer user/change the app's state to the logInPage/logIn state*/
        $state.go('logIn');  
        
    }
	
	$scope.home = function(){
		$state.go('logIn');
	}
    
}]); /* End of Main controller*/

