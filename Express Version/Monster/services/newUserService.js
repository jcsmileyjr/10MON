/*Service to retrieve the log-in page or join challenge page userName and create a global varible to track the user.*/
app.service('NewUser', function(){
    /*designated holder for log-in userName*/
    var newPlayer = "";

    /*function to take log-In page userName and saved to newPlayer to share throughout app*/
    this.save = function(x){
        newPlayer = x;
    }/* end of save method*/

    /*function to return variable newPlayer to use throughout app*/
    this.list = function(){
        return newPlayer;
    }/*gets the currentUser name*/
});/*end of NewUser service for currentName*/