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