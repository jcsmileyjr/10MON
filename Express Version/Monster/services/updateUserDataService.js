/*This service uses a for loop to search through the userData array for a name match with the currentUser variable. If there is a name match, the weight parameter is subtracted from the startWeight to create a new weightLoss for the matched array element. If the current user weightLoss is greater or equal to 10, then the current user's winner attribute is switch to true. The CurrentWeightLoss service method getWeightScale is called to determine if a positive or negative sign will be used. the current user lastUpdate attribute is updated. The UserData service method updateUserData is called to update the shared userData resource.*/

app.service('UpdateUserData', function($http){
    
    var weightLoss = "";

    /*method to update the current user, then use UserData service to update the userData array*/
    this.updateUser = function(weight, username, callback){
        var info = {"name": username, "weight": weight};
        $http.post('/weighIn',info).then(function (response)
            {
                weightLoss = callback(response.data);
               
            })        
        return weightLoss;
    }/* End of updateUser function*/
    

});/*end of UpdateUserData service*/
