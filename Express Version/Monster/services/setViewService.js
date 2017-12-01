
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