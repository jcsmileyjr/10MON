var app = angular.module('myApp', ['ui.bootstrap']);

app.controller('monsterController', function($scope, $http, $filter){
    $scope.userData = [{"name":"Mary Runner", "startWeight":200, "weightLoss":6}, {"name":"Brand Lifter", "startWeight":182, "weightLoss":2.5}, {"name":"Chad Zumba", "startWeight":243, "weightLoss":4.8}, {"name":"Bria Zumba", "startWeight":143, "weightLoss":0.8}, {"name":"Dancing Monkey", "startWeight":183, "weightLoss":2.7}, {"name":"Swaying Elephant", "startWeight":443, "weightLoss":24.8}, {"name":"Flaming Flamingo", "startWeight":101, "weightLoss":0.6}, {"name":"Shiny Penguin", "startWeight":202, "weightLoss":14.8}, {"name":"Amazing Ant", "startWeight":3, "weightLoss":0.1}, {"name":"Tripping Zebra", "startWeight":306, "weightLoss":8.1}];
    
    $scope.cred = [{"name":"Mary Runner", "password":1}, {"name":"Brand Lifter", "password":2}, {"name":"Chad Zumba", "password":3}, {"name":"Bria Zumba", "password":4}, {"name":"Dancing Monkey", "password":5}, {"name":"Swaying Elephant", "password":6}, {"name":"Flaming Flamingo", "password":7}, {"name":"Shiny Penguin", "password":8}, {"name":"Amazing Ant", "password":9}, {"name":"Tripping Zebra", "password":10}];

    $scope.newArray = []; /*array populated with each userdata array element except the weight*/
    
    /* The userData array is placed into the newArray variable without the players weight */
    $scope.getWeightLoss = function(){
        /*loops throught the userData array*/
        for(var j=0; j<$scope.userData.length;j++){
            /*myArray variable is populated with each user array element except the weight*/
            $scope.newArray[j]= {"name":$scope.userData[j].name, "weightLoss":$scope.userData[j].weightLoss};  
        }/*end of j-loop*/     
    }
    
    /*inital setting of app's information used the Ranking Page */
    $scope.getWeightLoss();

    /*add code for disabling nav if logIn do not return true*/
    $scope.setView = function(view){
        $scope.view = view;
    }
    
    /*the starting page is set to the login page */
    $scope.setView('logInPage');
    
    /*retrieves the log-in page userName and create a global varible to track user.*/
    $scope.currentUser = "";
    
    /*                                        Weight-In Codebase               */  
    
    /*function attached to weighIn page submit button. Takes as parameters the current user input weigh variable (from inputWeighIn text-box) and currentUser global varibile from logIn. */
    $scope.weighIn = function(weight) {
        
        /*This for loop searches through the users array of objects for a name match. If there is a name match, the weight parameter is subtracted from the startWeight to create a new weightLoss for the matched array element. Using teh getWeightLoss method, the updated users array is placed into the myArray variable without the players weight and sent to the controller to update the Player Ranking Page.*/
        for(var i=0; i<$scope.userData.length;i++){
                if($scope.currentUser==$scope.userData[i].name){  /*checks each element for a match */
                    
                $scope.userData[i].weightLoss = $scope.userData[i].startWeight - weight;
                    
                break; /*force end of i-loop search for currentUser*/

                }/*end of if statment*/
        }/*end of i-loop*/
        
        $scope.getWeightLoss();

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
}/*end of for logIn Function*/ 
    /*                          End of Log-In Codebase               */    

    
});