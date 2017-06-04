/*This service uses a for loop to search through the userData array for a name match with the currentUser variable. If there is a name match, the weight parameter is subtracted from the startWeight to create a new weightLoss for the matched array element. If the current user weightLoss is greater or equal to 10, then the current user's winner attribute is switch to true. The CurrentWeightLoss service method getWeightScale is called to determine if a positive or negative sign will be used. the current user lastUpdate attribute is updated. The UserData service method updateUserData is called to update the shared userData resource.*/

app.service('UpdateUserData', function(UserData, NewUser, Time,CurrentWeightLoss){
    
    /*gets the current userData array from the UserData service*/
    this.userData = UserData.players();

    /*method to update the current user, then use UserData service to update the userData array*/
    this.updateUser = function(weight){
    
    /*gets the current user name*/
    this.currentUser = NewUser.list();
           
        for(var i=0; i<this.userData.length;i++){

                if(this.currentUser==this.userData[i].name){  /*checks each element for a match */
                
                /*sets the new weightLoss attribute for the current user*/    
                this.userData[i].weightLoss = this.userData[i].startWeight - weight;
                
                /*If current user loses 10 or more pounds, then the winner attribute is switch to true.*/    
                if(this.userData[i].weightLoss >=10){
                    this.userData[i].winner = true;
                }
                
                /*determine if currentUser new weight is positive or negative. This tell the app to place a plus or minus on the currentUser ranking page row. */ 
                CurrentWeightLoss.getWeightScale(this.userData[i].weightLoss); 
                    
                /*resets current user lastUpdate attribute*/    
                this.userData[i].lastUpdate = Time.todayDate();
                    
                UserData.updateUserData(this.userData);
                        
                break; /*force end of i-loop search for currentUser*/

                }/*end of if statment*/
        }/*end of i-loop*/
        
    }/* End of updateUser function*/
    

});/*end of UpdateUserData service*/
