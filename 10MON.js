var app = angular.module('myApp', ['ui.bootstrap']);

/*Service to return the following shared resources: today's date, total milliseconds in a day, and challenge start Date*/
app.service('Time', function(){
    /*returns today's date*/
    this.todayDate = function(){
    return this.UpdateDate = new Date();
    }
    /* returns hours*minutes*seconds*milliseconds, total miliseconds in a day */
    this.minutesInADay = function(){
        return this.oneDay = 24*60*60*1000; 
    }
    /*returns the start date of the current challenge*/
    this.startChallengeDate = function(){
        return this.startDate = new Date("5/8/2017");
    }
});

/* Service to allow sharing of enableNav and join variables by returning and updating them. The setView method returns a page name to the scope.view variable to change pages if the enableNav variable is true. If it is false, then user can only view the log-in page.*/
app.service('SetView', function(){
    this.enableNav = false;
    this.join = "join";
    
    this.setEnableNav = function(x){
        this.enableNav = x;
    }
    
    this.getEnableNav = function(){
        return this.enableNav;
    }
    
    this.getJoin = function(){
        return this.join;
    }
    
    this.setJoin = function(x){
        this.join = x;
    }
    
    this.setView = function(x){
        if(this.enableNav==true){
            /*the varible view is set to the ng-show in each view*/        
            return x;
            
        }/*end of if statment*/  
        else{
            return "logInPage";
        }/*end of else statment*/        
    }
});
            
/*service to get the current week of the challenge since the start Date (startDate variable minus the current Date) using the Time service. This amount is placed in numberOfDays variable then divide by 7 to get currentWeek. The solution to the problem was found at http://stackoverflow.com/questions/2627473/how-to-calculate-the-number-of-days-between-two-dates-using-javascript  */
app.service('CurrentWeek', function(Time){
    this.getCurrentWeekNumber = function(){
    /*get current date of log-In from the Time service*/
    this.currentDate = Time.todayDate();
        
    /*get the start date of the challenge from the Time service*/
    this.startDate= Time.startChallengeDate();
    
    /*get the minutes in a day from the Time service*/
    this.oneDay = Time.minutesInADay();
        
    /*Used the date.getTime() to get and subtract the milliseconds of startDate and currentDate. This is divided by the oneDay variable and rounded (Math.round) to the nearest Interger turned positive (Math.abs)*/
    this.numberOfDays = Math.round(Math.abs((this.currentDate.getTime() - this.startDate.getTime())/(this.oneDay)));
    if(this.numberOfDays <= 7)
        return this.currentWeek = 1; /*If challenge just started, it will output 1 instead of 0*/
    else
        return this.currentWeek = Math.round(this.numberOfDays/7);/*round to nearest Interger the number of Days divided by 7*/
    }
});/*End of CurrentWeek service*/


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

/*service to retreive and update the cred array information @ logIn*/
app.service('Cred', function(){
        var cred = [{"name":"Mary Runner", "password":1}, {"name":"Brand Lifter", "password":2}, {"name":"Chad Zumba", "password":3}, {"name":"Bria Zumba", "password":4}, {"name":"Dancing Monkey", "password":5}, {"name":"Swaying Elephant", "password":6}, {"name":"Flaming Flamingo", "password":7}, {"name":"Shiny Penguin", "password":8}, {"name":"Amazing Ant", "password":9}, {"name":"Tripping Zebra", "password":10}];
    
        this.logInfo = function(){
            return cred;
        }
        
        /*pushes the new player name/password into the cred database*/
        this.addCred = function(x){
            cred.push(x);
            
        }
});

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


/*Service to pick a random quote from inspiration database each time the weighIn page is showned.*/
app.service('RandomQuote', function(){
    var inspiration = ["You are What you Eat, so don't be FAST, CHEAP, EASY, or FAKE", "My favorite exercise is a cross between a Lunge and a Crunch. I call it LUNCH", "Dream Big, Work Hard, Stay Focused, and surround yourself with Good People", "Do NOT REWARD YOURSELF WITH FOOD, YOU'RE NOT A DOG","The trouble with trouble is it starts out as fun", "Some people feel they keep trying to lose weight, but it keeps finding them.", "Life expectancy would grow by leaps and bounds if green vegetables smelled as good as bacon","Next time someone asks you how much you weigh.. Tell them One Hundred and Sexy", "I ate healthy and exercised today. I better wake up Skinny.", "RUN, like Channing Tatum is waiting for you at the the finish line", "Hello! I'm the Fitness Fairy. I just sprinkled motivation dust on you. Now go and move your ass. This shit is expensive", "Exercise, EX..ER..CISE, EX..AR..SIZE, EGGS..ARE..SIDES, ...FOR BACON... BACON"];
    
    this.getQuote = function(){
        return this.randomQuote = inspiration[Math.floor((Math.random() * inspiration.length-1 ) + 1)];
    }
});

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

/*Serice attached to log-In page submit button that gets the current user weightLoss informatoin*/
app.service('CurrentWeightLoss', function(NewArray, NewUser){
    var currentWeightLoss = 0;
    var upOrDown = 0;
    this.newArray = NewArray.weightLessArray();
    this.currentUser = NewUser.list();
    
    /*function attached to log-In page submit button that gets the current user weightLoss information. This is assign to the currentWeightLoss variable used in the getWeightScale function to determine the upOrDown shared variable.*/    
    this.getCurrentWeightLoss = function(){
        for(var i=0;i<this.newArray.length;i++){
            if(this.currentUser==this.newArray[i].name){
                currentWeightLoss = this.newArray[i].weightLoss
            }/*end of if statement*/
        }/*end of i-loop*/        
    }/* End of getCurrentWeightLoss*/
    
    /*This function is used in the weighIn function. It takes the current user new weight loss minus the old weight loss into the upOrDown global varible. This is used to determine if a plus or minus signs is shown on the ranking page for the user.  */
    this.getWeightScale = function(newWeightLoss){
        upOrDown =  newWeightLoss - currentWeightLoss;
    }/* End of getWeightScale*/
    
    /*function to returned a shared number used with ng-show weightScale to show plus or minus sign with weight change. */
    this.getUpOrDown = function(){
        return upOrDown;
    }
});







/*Start of main app*/
app.controller('monsterController', function($scope, $http, $filter, NewUser, Cred, Time, UserData, NewArray, RandomQuote, CurrentWeightLoss, UpdateUserData, CurrentWeek, SetView){
    
    /*                      INITAL SETTING OF SHARDED DATA    */  
    
    /*inital setting of current user old weightLoss used the Ranking Page */    
    $scope.currentWeightLoss = 0;
    
    /*inital setting of current Week into the challenge used the Ranking Page */ 
    $scope.currentWeek = 0;
    
    /*disable the nav links when the app starts. Forces user to use the login page*/
    $scope.enableNav = SetView.getEnableNav();
    
    /*function to toggle the Weigh-In, Ranking, and Log-In pages using the view scope variable. The nav links run the navigation method that use the SetView service. This service check to see if enableNav is true and then match the page with the same ng-show variable on the pages.*/
    $scope.navigation = function(x){
        $scope.view = SetView.setView(x);
    }
    
    /*Used on the weighIn nav link to set the random quote variable on the weighIn page from the RandomQuote service*/
    $scope.getRandomQuote = function(){
        $scope.randomQuote = RandomQuote.getQuote();
    }
    
    /*the starting page is set to the login page */
    $scope.view = SetView.setView('logInPage')
        
    /*retrieves the log-in page userName and create a global varible to track user.*/
    $scope.currentUser = "";
    
    /*inital setting of Ranking page percentage or pounds checkbox */
    $scope.percentOrPounds = false;
    
    /*                              Join Challenge Codebase                    */

    /*function attached to SetUp page submit button. Takes as parameters the inputted name, password, and start weight variables (from inputName, inputSetupPwd, and inputStartWeight text-box) */    
    $scope.newPlayer = function(name, setUpPwd, setUpWeight){
        /*get today's date*/
        $scope.newUpdateDate = Time.todayDate();
    
        /*creates a player object that takes the function's parameters*/
        $scope.player = {"name":name, "startWeight":setUpWeight, "weightLoss":0, "lastUpdate":$scope.newUpdateDate, "winner":false};

        
        /*pushes the new player object into the userData database*/
        UserData.addUser($scope.player);
        
        /*creates a new player log-in name and pwd object*/
        $scope.playerCred = {"name":name, "password":setUpPwd};
        
        /*Use the Cred service addCred function to pushe the new player log-in object into the cred database*/
        Cred.addCred($scope.playerCred);
      
        /*Used the NewArray service to update the newArray array with the an updated userData array that is used on the Ranking page*/
        $scope.newArray = NewArray.weightLessArray();        

        /*Use a SetView function set the shared variable enableNav to true to unlock the navigation links.*/
        SetView.setEnableNav(true);        
        
        /*Use a SetView function to set the variable used to switch on the setUpPage ng-show directive*/
        $scope.join = SetView.getJoin();
        
        /*takes the startDate of the challenge minus today date divide by 7 to get how many weeks into the challenge*/
        $scope.currentWeek = CurrentWeek.getCurrentWeekNumber();
        
        /*sets the userName as a global varible currentUser
        $scope.currentUser = $scope.name;*/

        /*use the NewUser service to save the userName to use as a current name varible*/
        NewUser.save(name);
        
        /*gets the current user name from the NewUser service to display on the weighIn page*/
        $scope.currentUser = NewUser.list();        
        
        /*switch page view from Join Challenge to Ranking page*/
        $scope.view = SetView.setView('rankingPage')
        
        
    }/*                         End of Join Challenge Codebase*/
    

    
    /*                                 Weigh-In Codebase               */ 
    
    
    /*creates a number variable determine by the currentUser weightLoss and the weightLoss after weigh-In. This is used with ng-show weightScale to show plus or minus sign with weight change. */
    $scope.upOrDown = 0;
    
    /*function attached to weighIn page submit button. Takes as parameters the current user input weigh variable (from inputWeighIn text-box) and currentUser global varibile from logIn. */
    $scope.weighIn = function(weight) {
        
        /*This for loop searches through the users array of objects for a name match. If there is a name match, the weight parameter is subtracted from the startWeight to create a new weightLoss for the matched array element. Using the getWeightLoss method, the updated users array is placed into the myArray variable without the players weight and sent to the controller to update the Player Ranking Page.*/
        UpdateUserData.updateUser(weight);
        
        /*Use the CurrentWeightLoss service to set the global upOrDown varible used on the ranking page to show either positive or negative signs with the weightLoss variable.*/
        $scope.upOrDown = CurrentWeightLoss.getUpOrDown();
        
        /*used updated userData array to update newArray array that is used on the Ranking page */
        $scope.newArray = NewArray.weightLessArray();
        
        /*switch page view from weighIn page to ranking page*/
        $scope.view = SetView.setView('rankingPage');
    }/*end of weighIn function*/
    /*                          End of Weigh-In Codebase               */    

    /*                                        Log-In Codebase               */
    

    /*function attached to log-In page submit button. Takes as parameters the current userName variable (from logIn page) and pwd variable (from logIn page) to insert into logInformation array. This array is sent to the logIn.php.*/
    $scope.logIn = function(userName, pwd) {
        /*sets the userName as a global varible currentUser*/
        $scope.currentUser = userName;
        
        /*use the NewUser service to save the userName to use as a current name varible*/
        NewUser.save(userName);          
        
        /*use the Cred Service to get the current Cred array that holds the user names and passcodes. This is placed into the scope variable cred.*/
        $scope.cred = Cred.logInfo();

        /*This loop searchs the security array. A if statement compare user’s pwd and userName to cred json records. If found to be true, the newArray is return to the controller.*/
        for(var i=0; i<$scope.cred.length;i++){
            if(userName==$scope.cred[i].name && pwd==$scope.cred[i].password)
                {
                    /*set the shared enableNav varible to true using SetView service */
                    SetView.setEnableNav(true);
                    
                    /*Use the SetView service to switch page view from log-in page to weigh-in page*/
                    $scope.view = SetView.setView('weighInPage')
                    
                    /*sets the random quote variable on the weighIn page from the RandomQuote service*/
                    $scope.randomQuote = RandomQuote.getQuote();

                    /*inital setting of app's userData information used on the Ranking Page using the NewArray service*/
                    $scope.newArray = NewArray.weightLessArray();
                }

            else 
                {
                    $scope.message = "Your UserName or Password has Failed";    
                }
        }/*end of for i-loop*/ 

    /*inital setting of currentUser possible weight change using currentWeightLoss varible in getWeightScale function */
    /* $scope.getCurrentWeightLoss(); */
    CurrentWeightLoss.getCurrentWeightLoss();
    
    /*takes the startDate of the challenge minus today date divide by 7 to get how many weeks into the challenge
    $scope.getCurrentWeekNumber();*/
    $scope.currentWeek = CurrentWeek.getCurrentWeekNumber();
    

}/*end of for logIn Function*/
    
    $scope.joinChallenge = function(join){
        $scope.join = join; 
        $scope.view = join;
    }    
    /*                          End of Log-In Codebase               */    

    /*                      Log-out Codebase                */
    
    $scope.logOut = function(){
        /*clear the currentUser global variable*/
        $scope.currentUser = "";
        
        /*use the NewUser service to save the userName to use as a current name varible*/
        NewUser.save("");    
        
        /*clear the logIn page password global variable*/
        $scope.userPwd = "";
        /*clear the logIn page userName global variable*/
        $scope.userName = "";
        /*clear the client side main data array*/
        $scope.newArray=[];
        
        $scope.weight = 0;
        
        /*lock down the navigation*/
        /*$scope.enableNav = true; */
        SetView.setEnableNav(false);
        
        /*tranfer user to the logInPage*/
        $scope.view = SetView.setView('logInPage');        
        
    }
    
}); /* End of Main controller*/

