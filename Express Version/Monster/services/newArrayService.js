/* A service placed the shared resource userData array into the newArray variable without the players weight and only the current user percent weight loss. Several services is called to get shared resources userData array, current user name, today's date, and the minutes of a day. */

app.service('NewArray', function(){
    
    var newArray = [];
    
    this.getNewArray = function(){
     	return newArray;    
    }/* end of getWeightLoss function*/  
	
	/*function use on Log-In page to use the newArray sent from server to update the service newArray data*/
	this.updateNewArray = function(x){
		newArray = x;
	}/*end of updateNewArray function*/
});