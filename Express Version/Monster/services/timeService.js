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
        return this.startDate = new Date("11/1/2017");
    }
});