/*service to retreive and update the userData array information.*/
app.service('UserData', function(Time){
    var startDate =Time.startChallengeDate();
    
    var userData = [{"name":"Mary Runner", "startWeight":200, "weightLoss":0, "lastUpdate":startDate, "winner":false}, {"name":"Brand Lifter", "startWeight":180, "weightLoss":0, "lastUpdate":startDate, "winner":false}, {"name":"Chad Zumba", "startWeight":243, "weightLoss":4.8, "lastUpdate":startDate, "winner":false}, {"name":"Bria Zumba", "startWeight":143, "weightLoss":0.8, "lastUpdate":startDate, "winner":false}, {"name":"Dancing Monkey", "startWeight":183, "weightLoss":2.7, "lastUpdate":startDate, "winner":false}, {"name":"Swaying Elephant", "startWeight":443, "weightLoss":9.8, "lastUpdate":startDate, "winner":false}, {"name":"Flaming Flamingo", "startWeight":101, "weightLoss":0.6, "lastUpdate":startDate, "winner":false}, {"name":"Shiny Penguin", "startWeight":202, "weightLoss":0, "lastUpdate":startDate, "winner":false}, {"name":"Amazing Ant", "startWeight":3, "weightLoss":0.1, "lastUpdate":startDate, "winner":false}, {"name":"Tripping Zebra", "startWeight":306, "weightLoss":8.1, "lastUpdate":startDate, "winner":false}];    
    
    this.players = function(){
    return  userData; 
    }
    
    /*method to update the userData array*/
    this.updateUserData = function(x){
        userData = x;
    }
    /*method to push a new user into userData array*/
    this.addUser = function(x){
        /*pushes the new player object into the userData database*/
        userData.push(x);        
    }
});/*End of players service for UserData array*/