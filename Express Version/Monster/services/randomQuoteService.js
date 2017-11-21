/*Service to pick a random quote from inspiration database each time the weighIn page is showned.*/

app.service('RandomQuote', function(){
    var inspiration = ["You are What you Eat, so don't be FAST, CHEAP, EASY, or FAKE", "My favorite exercise is a cross between a Lunge and a Crunch. I call it LUNCH", "Dream Big, Work Hard, Stay Focused, and surround yourself with Good People", "Do NOT REWARD YOURSELF WITH FOOD, YOU'RE NOT A DOG","The trouble with trouble is it starts out as fun", "Some people feel they keep trying to lose weight, but it keeps finding them.", "Life expectancy would grow by leaps and bounds if green vegetables smelled as good as bacon","Next time someone asks you how much you weigh.. Tell them One Hundred and Sexy", "I ate healthy and exercised today. I better wake up Skinny.", "RUN, like Channing Tatum is waiting for you at the the finish line", "Hello! I'm the Fitness Fairy. I just sprinkled motivation dust on you. Now go and move your ass. This shit is expensive", "Exercise, EX..ER..CISE, EX..AR..SIZE, EGGS..ARE..SIDES, ...FOR BACON... BACON"];
    
    this.getQuote = function(){
        return this.randomQuote = inspiration[Math.floor((Math.random() * inspiration.length-1 ) + 1)];
    }
});