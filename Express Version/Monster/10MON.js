var app = angular.module('myApp', ['ui.bootstrap']);

/*Start of main app*/
app.controller('monsterController', ['$scope', '$http', '$filter', 'NewUser', 'Cred', 'Time', 'UserData', 'NewArray', 'RandomQuote', 'CurrentWeightLoss', 'UpdateUserData', 'CurrentWeek', 'SetView', function($scope, $http, $filter, NewUser, Cred, Time, UserData, NewArray, RandomQuote, CurrentWeightLoss, UpdateUserData, CurrentWeek, SetView){
    
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
    
    $scope.returnedWeight = function(x){
        
        $scope.weightLoss = x;
        CurrentWeightLoss.getWeightScale($scope.weightLoss.weightLoss); 
        
        /*Use the CurrentWeightLoss service to set the global upOrDown varible used on the ranking page to show either positive or negative signs with the weightLoss variable.*/
        $scope.upOrDown = CurrentWeightLoss.getUpOrDown();
        
        /*used updated userData array to update newArray array that is used on the Ranking page */
        $scope.newArray = $scope.weightLoss.newArray;
        
        /*switch page view from weighIn page to ranking page*/
        $scope.view = SetView.setView('rankingPage');        
    }
    
    /*function attached to weighIn page submit button. Takes as parameters the current user input weigh variable (from inputWeighIn text-box) and currentUser global varibile from logIn. */
    $scope.weighIn = function(weight) {
        
        /*This for loop searches through the users array of objects for a name match. If there is a name match, the weight parameter is subtracted from the startWeight to create a new weightLoss for the matched array element. Using the getWeightLoss method, the updated users array is placed into the myArray variable without the players weight and sent to the controller to update the Player Ranking Page.*/
        UpdateUserData.updateUser(weight, NewUser.list(), $scope.returnedWeight);       

    }/*end of weighIn function*/
    /*                          End of Weigh-In Codebase               */    

    /*                          Log-In Codebase               */
        //callback function used in the logIn function below. If the data sent from the server is successfully received, this function use it to update the newArray array and switch to the weighIn page. If the data is not received, then the user remain on the login page and received fail messages. 
        $scope.returnData = function(x){
            
            $scope.cred = x;
console.log("cred attempt " + $scope.cred.success);            
            //return $scope.cred;
            
        /*This loop searchs the security array. A if statement compare user’s pwd and userName to cred json records. If found to be true, the newArray is return to the controller.*/
        if($scope.cred.success === true)
                {
                    /*set the shared enableNav varible to true using SetView service */
                    SetView.setEnableNav(true);
                    
                    /*Use the SetView service to switch page view from log-in page to weigh-in page*/
                    $scope.view = SetView.setView('weighInPage')
                    
                    /*sets the random quote variable on the weighIn page from the RandomQuote service*/
                    $scope.randomQuote = RandomQuote.getQuote();

                    /*inital setting of app's userData information used on the Ranking Page using the NewArray service*/
                    $scope.newArray = $scope.cred.newArray;
                }

            else if ($scope.cred.success === false)
                {
                    $scope.message = "Your UserName or Password has Failed";    
                }
            
            else 
                {                    
                    $scope.message = "Software Error, Please press the Submit Password Button again. "
                }            
        };
    
    /*function attached to log-In page submit button. Takes as parameters the current userName variable (from logIn page) and pwd variable (from logIn page) to insert into logInformation array. This array is sent to the logIn.php.*/
    $scope.logIn = function(userName, pwd) {
        /*sets the userName as a global varible currentUser*/
        $scope.currentUser = userName;
        
        /*use the NewUser service to save the userName to use as a current name varible*/
        NewUser.save(userName);          
        
       
        /*use the Cred Service to get the current Cred array that holds the user names and passcodes. This is placed into the scope variable cred.*/
        Cred.logInfo(userName, pwd, $scope.returnData);
//console.log("cred success " + $scope.cred.success);  
        

        

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
    /*                      End of Log-In Codebase               */    

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
    
}]); /* End of Main controller*/

