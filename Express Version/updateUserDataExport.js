/*This service uses a for loop to search through the userData array for a name match with the currentUser variable. If there is a name match, the weight parameter is subtracted from the startWeight to create a new weightLoss for the matched array element. If the current user weightLoss is greater or equal to 10, then the current user's winner attribute is switch to true. The CurrentWeightLoss service method getWeightScale is called to determine if a positive or negative sign will be used. the current user lastUpdate attribute is updated. The UserData service method updateUserData is called to update the shared userData resource.*/

//need userData, newUser, Time, currentWeightloss

    var userInfo = require('./userDataServiceExport');
    var Time = require('./timeExport');
    
    /*gets the current userData array from the UserData service*/
    var userData = userInfo.players();
    var today = Time.todayDate();

    var returnCurrentWeightLoss = "";

    /*method to update the current user, then use UserData service to update the userData array*/
    var updateUser = function(weight, userName){
        /*gets the current user name*/
        var currentUser = userName;

            for(var i=0; i<userData.length;i++){

                    if(currentUser==userData[i].name){  /*checks each element for a match */

                    /*sets the new weightLoss attribute for the current user*/    
                    userData[i].weightLoss = userData[i].startWeight - weight;

                    /*If current user loses 10 or more pounds, then the winner attribute is switch to true.*/    
                    if(userData[i].weightLoss >=10){
                        userData[i].winner = true;
                    }

                    /*determine if currentUser new weight is positive or negative. This tell the app to place a plus or minus on the currentUser ranking page row. */ 
                    //CurrentWeightLoss.getWeightScale(userData[i].weightLoss); 

                    /*resets current user lastUpdate attribute*/    
                    userData[i].lastUpdate = today;

                    userInfo.updateUserData(userData);                        
                    //to update CurrentWeightLoss Service on Client  
                    returnCurrentWeightLoss = userData[i].weightLoss; 

                    break; /*force end of i-loop search for currentUser*/

                    }/*end of if statment*/
            }/*end of i-loop*/
        return returnCurrentWeightLoss;
    }/* End of updateUser function*/
    
    module.exports.updateUser = updateUser;
    
