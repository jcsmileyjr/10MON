/* A service placed the shared resource userData array into the newArray variable without the players weight and only the current user percent weight loss. Several services is called to get shared resources userData array, current user name, today's date, and the minutes of a day. */

app.service('NewArray', function(UserData, Time, NewUser){
    this.userData = UserData.players();
    var newArray = [];
    this.UpdateDate = Time.todayDate();
    this.oneDay = Time.minutesInADay();
    
    this.weightLessArray = function(){
    /*get the current user name at the time the method is called*/
    this.currentUser = NewUser.list();        
    
    /*loops throught the userData array*/
    for(var j=0; j<this.userData.length;j++){
        /*gets the last day since update number for each user*/
        this.daysSinceLastUpdate = Math.round(Math.abs((this.UpdateDate.getTime() - this.userData[j].lastUpdate.getTime())/(this.oneDay))); 
            
        /*newArray variable is populated with each user array element plus percent loss and except the weight*/
        newArray[j]= {"name":this.userData[j].name, "weightLoss":this.userData[j].weightLoss, "lastUpdate": this.daysSinceLastUpdate, "winner":this.userData[j].winner};

        /*search the userData array for the element containg the currentUser*/
        if(this.currentUser==this.userData[j].name){  /*checks each element for a match */
            /*divides current userData array elment weightloss by the startWeight to get percentage lost*/
            this.currentPercentLoss = this.userData[j].weightLoss / this.userData[j].startWeight;
                
            /*Gives only the currentUser the percentLoss variable*/
            newArray[j].percentLoss = this.currentPercentLoss;                
            }            
        }/*end of j-loop*/
    return newArray;    
    }/* end of getWeightLoss function*/    
});