const fs = require('fs');

// Create a path to the cred.json file into the cred variable. Use the file system provide by node.js to read the cred.json json file into a security variable. The security variable is parse from a string into a json format object and placed in the security variable. 
const cred =  __dirname +'/cred.json';
var security = fs.readFileSync(cred);
var logData = JSON.parse(security);

var logIn = function(userName, pwd){
    var success = false;
    
    /*This loop searchs the security array. A if statement compare user’s pwd and userName to cred json records. If found to be true, the newArray is return to the controller.*/
    for(var i=0; i<logData.length;i++){
        if(userName==logData[i].name && pwd==logData[i].password){ 
            success = true;           
        }
    } 
    return success;
    
}

module.exports.logIn = logIn;