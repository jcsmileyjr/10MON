/*service to retreive and update the userData array information.*/

const fs = require('fs');
const userDataPath =  __dirname +'/userData.json';
var userDataInfo = fs.readFileSync(userDataPath);
var userData = JSON.parse(userDataInfo);

    var players = function(){
    return  userData; 
    }
    
    /*method to update the userData array*/
    var updateUserData = function(x){
        //transform the userData json into a string
        newUserData = JSON.stringify(x);
            
        //writes the new string object to the userData.json
        fs.writeFileSync(userDataPath, newUserData, 'utf8'); 
    }
    /*method to push a new user into userData array*/
    var addUser = function(x){
        /*pushes the new player object into the userData database*/
        userData.push(x);        
    }
    
    module.exports.players = players;
    module.exports.updateUserData = updateUserData;
    module.exports.addUser = addUser;
