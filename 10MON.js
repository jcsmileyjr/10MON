var app = angular.module('myApp', ['ui.bootstrap']);

app.controller('monsterController', function($scope, $http, $filter){
    
    /*                       Arrays & Database codeBase                                */
    
    $scope.userData = [{"name":"Mary Runner", "startWeight":200, "weightLoss":0}, {"name":"Brand Lifter", "startWeight":182, "weightLoss":2.5}, {"name":"Chad Zumba", "startWeight":243, "weightLoss":4.8}, {"name":"Bria Zumba", "startWeight":143, "weightLoss":0.8}, {"name":"Dancing Monkey", "startWeight":183, "weightLoss":2.7}, {"name":"Swaying Elephant", "startWeight":443, "weightLoss":24.8}, {"name":"Flaming Flamingo", "startWeight":101, "weightLoss":0.6}, {"name":"Shiny Penguin", "startWeight":202, "weightLoss":14.8}, {"name":"Amazing Ant", "startWeight":3, "weightLoss":0.1}, {"name":"Tripping Zebra", "startWeight":306, "weightLoss":8.1}];
    
    $scope.cred = [{"name":"Mary Runner", "password":1}, {"name":"Brand Lifter", "password":2}, {"name":"Chad Zumba", "password":3}, {"name":"Bria Zumba", "password":4}, {"name":"Dancing Monkey", "password":5}, {"name":"Swaying Elephant", "password":6}, {"name":"Flaming Flamingo", "password":7}, {"name":"Shiny Penguin", "password":8}, {"name":"Amazing Ant", "password":9}, {"name":"Tripping Zebra", "password":10}];
    
    $scope.inspiration = ["You are What you Eat, so don't be FAST, CHEAP,EASY, or FAKE", "My favorite exercise is a cross between a Lunge aND a Crunch. I call it LUNCH", "Dream Big, Work Hard, Stay Focused, and surround yourself with Good People", "Do NOT REWARD YOURSELF WITH FOOD, YOU'RE NOT A DOG","The trouble with trouble is it starts out as fun", "Some people feel they keep trying to lose weight, but it keeps finding them.", "Life expectancy would grow by leaps and bounds if green vegetables smelled as good as bacon","Next time someone asks you how much you weigh.. Tell them One Hundred and Sexy", "I ate healthy and exercised today. I better wake up Skinny.", "RUN, like Channing Tatum is waiting for you at the the finish line", "Hello! I'm the Fitness Fairy. I just sprinkled motivation dust on you. Now go and move your ass. This shit is expensive", "Exercise, EX..ER..CISE, EX..AR..SIZE, EGGS..ARE..SIDES, ...FOR BACON... BACON"     ];

    $scope.newArray = []; /*array populated with each userdata array element except the weight*/
    
    /*                      INITAL SETTING OF SHARDED DATA    */
    
    /* The userData array is placed into the newArray variable without the players weight */
    $scope.getWeightLoss = function(){
        /*loops throught the userData array*/
        for(var j=0; j<$scope.userData.length;j++){
            /*myArray variable is populated with each user array element except the weight*/
            $scope.newArray[j]= {"name":$scope.userData[j].name, "weightLoss":$scope.userData[j].weightLoss};  
        }/*end of j-loop*/     
    }
    
    /*inital setting of app's userData information used the Ranking Page */
    $scope.getWeightLoss();
    
    /*inital setting of current user old weightLoss used the Ranking Page */    
    $scope.currentWeightLoss = 0;
    
    /*inital setting of current Week into the challenge used the Ranking Page */ 
    $scope.currentWeek = 0;

    /*add code for disabling nav if logIn do not return true*/
    $scope.setView = function(view){
        $scope.view = view;
    }
    
    /*the starting page is set to the login page */
    $scope.setView('logInPage');
    
    /*retrieves the log-in page userName and create a global varible to track user.*/
    $scope.currentUser = "";
    
    /*start date of the challenge*/
    $scope.startDate = new Date("4/29/2017");
    
    /*function to pick a random quote from inspiration databas each time the weighIn page is showned.  return Math.floor(Math.random()*(max-min+1)+min). Math.floor((Math.random() * 10) + 1);;*/
    $scope.getRandomQuote = function(){
        $scope.randomQuote = $scope.inspiration[Math.floor((Math.random() * $scope.inspiration.length-1 ) + 1)];
    }
  /*                                        Weight-In Codebase               */      
    
    
    /*creates a number variable determine by the currentUser weightLoss and the weightLoss after weigh-In. This is used with ng-show weightScale to show plus or minus sign with weight change. */
    $scope.upOrDown = 0;
    
    /*This function is used in the weighIn function. It takes the current user new weight loss minus the old weight loss into the upOrDown global varible. This is used to determine if a plus or minus signs is shown on the ranking page for the user.  */
    $scope.getWeightScale = function(x){
        $scope.upOrDown = x - $scope.currentWeightLoss
    }/*end of getWeightScale function*/
    
    /*function attached to weighIn page submit button. Takes as parameters the current user input weigh variable (from inputWeighIn text-box) and currentUser global varibile from logIn. */
    $scope.weighIn = function(weight) {
        
        /*This for loop searches through the users array of objects for a name match. If there is a name match, the weight parameter is subtracted from the startWeight to create a new weightLoss for the matched array element. Using teh getWeightLoss method, the updated users array is placed into the myArray variable without the players weight and sent to the controller to update the Player Ranking Page.*/
        for(var i=0; i<$scope.userData.length;i++){
                if($scope.currentUser==$scope.userData[i].name){  /*checks each element for a match */
                    
                $scope.userData[i].weightLoss = $scope.userData[i].startWeight - weight;
                
                /*determine if currentUser new weight is positive or negative. This tell the app to place a plus or minus on the currentUser ranking page row. */    
                $scope.getWeightScale($scope.userData[i].weightLoss);
                        
                break; /*force end of i-loop search for currentUser*/

                }/*end of if statment*/
        }/*end of i-loop*/
        
        /*used updated userData array to update newArray array that is used on the Ranking page*/
        $scope.getWeightLoss();
        
        /*updates teh currentWeightLoss varible in case user updates again*/
        $scope.getCurrentWeightLoss();
        
        /*switch page view from weighIn page to ranking page*/
        $scope.setView('rankingPage');
        

    }/*end of weighIn function*/
    /*                          End of Weigh-In Codebase               */    

    /*                                        Log-In Codebase               */
    
    /*function attached to log-In page submit button. Takes as parameters the current userName variable (from logIn page) and pwd variable (from logIn page) to insert into logInformation array. This array is sent to the logIn.php.*/
    $scope.logIn = function(userName, pwd) {
        /*sets teh userName as a global varible currentUser*/
        $scope.currentUser = userName;

        /*This loop searchs the security array. A if statement compare user’s pwd and userName to cred json records. If found to be true, the newArray is return to the controller.*/
        for(var i=0; i<$scope.cred.length;i++){
            if(userName==$scope.cred[i].name && pwd==$scope.cred[i].password)
                {
                    $scope.setView('rankingPage');
                                
                }

            else 
                {
                    $scope.message = "Your UserName or Password has Failed";    
                }
        }/*end of for i-loop*/ 

    /*function attached to log-In page submit button that gets the current user weightLoss informatoin*/
    $scope.getCurrentWeightLoss = function(){
        for(var i=0;i<$scope.newArray.length;i++){
            if($scope.currentUser==$scope.newArray[i].name){
                $scope.currentWeightLoss = $scope.newArray[i].weightLoss
            }/*end of if statement*/
        }/*end of i-loop*/
    }/*end of getCurrentWeightLoss function*/
    
    /*inital setting of currentUser possible weight change using currentWeightLoss varible in getWeightScale function */
    $scope.getCurrentWeightLoss();
        
    /*get current date of log-In*/
    $scope.currentDate = new Date();
        
    /*function to get the current week into the challenge since the start Date, set with startDate variable, minus the current Date. This amount is placed in numberOfDays variable then divide by 7 to get currentWeek. The solution to the problem was found at http://stackoverflow.com/questions/2627473/how-to-calculate-the-number-of-days-between-two-dates-using-javascript  */
    $scope.getCurrentWeekNumber = function(){
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds, total miliseconds in a day
        /*Used the date.getTime() to get and subtract the milliseconds of startDate and currentDate. This is divided by the oneDay variable and rounded (Math.round) to the nearest Interger turned positive (Math.abs)*/
        $scope.numberOfDays = Math.round(Math.abs(($scope.currentDate.getTime() - $scope.startDate.getTime())/(oneDay)));
        if($scope.numberOfDays <= 7)
            $scope.currentWeek = 1; /*If challenge just started, it will output 1 instead of 0*/
        else
            $scope.currentWeek = Math.round($scope.numberOfDays/7);/*round to nearest Interger the number of Days divided by 7*/
    } /*End of getCurrentWeekNumber function*/
    
    $scope.getCurrentWeekNumber();
        
}/*end of for logIn Function*/ 
    /*                          End of Log-In Codebase               */    

    
});