
/*Start of main app*/
app.controller('monsterController', function($scope, $state, Cred){
    /*                      Log-out Codebase                */
    
    $scope.logOut = function(){
        
        /*Set authentication in the Cred service to false*/
        Cred.logOutAuthenticate();
        
        /*tranfer user/change the app's state to the ranking page/ranking state*/
        $state.go('logIn');      
        
    }
    
}); /* End of Main controller*/

