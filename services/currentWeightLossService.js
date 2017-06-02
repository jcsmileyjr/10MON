/*Serice attached to log-In page submit button that gets the current user weightLoss informatoin*/

app.service('CurrentWeightLoss', function(NewArray, NewUser){
    var currentWeightLoss = 0;
    var upOrDown = 0;
    this.newArray = NewArray.weightLessArray();
    this.currentUser = NewUser.list();
    
    /*function attached to log-In page submit button that gets the current user weightLoss information. This is assign to the currentWeightLoss variable used in the getWeightScale function to determine the upOrDown shared variable.*/    
    this.getCurrentWeightLoss = function(){
        for(var i=0;i<this.newArray.length;i++){
            if(this.currentUser==this.newArray[i].name){
                currentWeightLoss = this.newArray[i].weightLoss
            }/*end of if statement*/
        }/*end of i-loop*/        
    }/* End of getCurrentWeightLoss*/
    
    /*This function is used in the weighIn function. It takes the current user new weight loss minus the old weight loss into the upOrDown global varible. This is used to determine if a plus or minus signs is shown on the ranking page for the user.  */
    this.getWeightScale = function(newWeightLoss){
        upOrDown =  newWeightLoss - currentWeightLoss;
    }/* End of getWeightScale*/
    
    /*function to returned a shared number used with ng-show weightScale to show plus or minus sign with weight change. */
    this.getUpOrDown = function(){
        return upOrDown;
    }
});