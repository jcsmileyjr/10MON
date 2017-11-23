/*service to retreive and update the cred array information @ logIn*/
app.service('Cred', function($http){
        var cred = "Happy";
		var pass = false;
   
        this.logInfo = function(username, pwd, callback){           
            var info = {"name": username, "password": pwd};
            $http.post('/cred',info).then(function (response){
                //cred = response.data;
                cred = callback(response.data);
            })
                return cred;
        }
		
        /*pushes the new player name/password into the cred database*/
        this.addCred = function(x){
            cred.push(x);
            
        }
		
		this.updateAuthenticate = function (){
			pass = true;
		}
		
		this.getAuthenticate = function(){
			return pass;
		}
		
		this.logOutAuthenticate = function(){
			pass = false;
		}
		
		
});