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