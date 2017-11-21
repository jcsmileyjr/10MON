/*Service to return the following shared resources: today's date, total milliseconds in a day, and challenge start Date*/

    /*returns today's date*/
    var todayDate = function(){
        var UpdateDate = new Date();
        return UpdateDate;
    }
    /* returns hours*minutes*seconds*milliseconds, total miliseconds in a day */
    var minutesInADay = function(){
        var oneDay = 24*60*60*1000; 
        return oneDay;
    }
    /*returns the start date of the current challenge*/
    var startChallengeDate = function(){
        var startDate = new Date("11/1/2017");
        return startDate;
    }
    
    module.exports.todayDate = todayDate;
    module.exports.minutesInADay = minutesInADay;
    module.exports.startChallengeDate = startChallengeDate;
