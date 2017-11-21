const express = require('express');
const app = express();
const fs = require('fs');

//send the entire Monster folder to the client
app.use(express.static(__dirname + '/Monster'));

//configure express to use bodyparser as a middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
                     
//
var cred = require('./credExport');
var newArray = require('./newArrayServiceExport');

app.post('/cred', function(req, res){
    
    //get the username and password sent from the client
    var userName = req.body.name;
    var pwd = req.body.password;
    
    //Create an object (info) to send back to the client. Check if the username and password is authentic. If so, a true or false is sent back as the success attribute of the info object
    var info = {};
    info.success = cred.logIn(userName, pwd);
    
    if(info.success===true)
        {
            info.newArray = newArray.weightLessArray(userName);
        }
    
    //send the info object to the client
    res.send(info);    
    res.end();
});

var updateUser = require('./updateUserDataExport');
app.post('/weighIn', function (req, res){
    
    //get the username and new weight
    var userName = req.body.name;
    var weight = req.body.weight;
    var info = {};
 
    info.weightLoss = updateUser.updateUser(weight, userName);
    info.newArray = newArray.weightLessArray(userName);
    res.send(info);
})
app.listen(3000);