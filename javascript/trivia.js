window.onload = function() {
  $(".button-choice").on("click", game.initGame); 
  $("#choice-picker").on("click", function (event){

    	userAnswer = event.target.id;
    	console.log("userAnswer = "+userAnswer);
        // Compare id to target id
        if (questionsRepository[game.questionNumber][userAnswer] === questionsRepository[game.questionNumber][5]) {
          //alert("You win!");
          wins++;
          game.stopRunningQuestion();
          game.clear();
          $("#timeInfo").text("Correct! The right choice was "+questionsRepository[game.questionNumber][5]);

          //$("#timeInfo").append("Correct! The right choice was "+questionsRepository[game.questionNumber][5]);
          game.showResults();
        }
        else {
          losses++;
          game.stopRunningQuestion();
          game.clear();
          $("#timeInfo").text("Wrong! The right choice was "+questionsRepository[game.questionNumber][5]);
          game.showResults();
          
        }
   
  	});
};




//  Step 3:
//  Fill in the blanks to these functions.



//  Variable that will hold our setInterval that runs the stopwatch
var totalNumberOfGames=7;
var wins=0;
var losses=0;
var intervalId;
var maxTime=5;
var maxShowTime=3;
//prevents the clock from being sped up unnecessarily
var clockRunning = false;
var clockRunningResults = false;

var questionsRepository;

// Our game object
var game = {
	
	questionNumber: 0,
	timeLeft: maxTime,
	timeResults:maxShowTime,
	initGame: function() {
		questionsRepository= [["In the year 1900 in the U.S. what were the most popular first names given to boy and girl babies?", "A. William and Elizabeth", "B. Joseph and Catherine", "C. John and Mary","D. George and Anne","C. John and Mary"],
		["When did the Liberty Bell get its name?", "A. when it was made, in 1701", "B. when it rang on July 4, 1776", "C. in the 19th century, when it became a symbol of the abolition of slavery","D. none of the above","C. in the 19th century, when it became a symbol of the abolition of slavery"],
		["In the Roy Rogers -Dale Evans Museum, you will find Roy and Dales stuffed horses. Roy's horse was named Trigger, which was Dales horse?", "A. Buttermilk", "B. Daisy", "C. Scout","D. Tulip","A. Buttermilk"],
		["The Daniel Boon museum at the home where he died can best be described how?", "A. a log cabin in Kentucky", "B. a two-story clapboard house in Tennessee", "C. a four-story Georgian-style home in Missouri","D. a three story brick house in Arkansas","C. a four-story Georgian-style home in Missouri"],
		["Which of the following items was owned by the fewest U.S. homes in 1990?", "A. home computer", "B. compact disk player", "C. cordless phone","D. dishwasher","B. compact disk player"],
		["In 1990, in what percentage of U.S. married couples did the wife earn more money than the husband?", "A. 8", "B. 18", "C. 38","D. 58","B. 18"],
		["The Brownie Box Camera introduced by Eastman Kodak in 1900 had a retail price of what?", "A. $1", "B. $5", "C.$10","D.$20","A. $1"]];

		$(".button-choice").hide();
		totalNumberOfGames=7;
		wins=0;
		losses=0;
		clockRunning=false;
		clockRunningResults=false;
		maxTime=5;
	    //shuffle the questions
	    questionsRepository.sort(function() {
          return 0.5 - Math.random();
        });

		game.startQuestion();
	},

  	stopRunningQuestion: function() {
    	// DONE: Use clearInterval to stop the count here and set the clock to not be running.
    	clearInterval(intervalId);
    	clockRunning = false;
    	game.timeLeft=maxTime;
  	},
  	
  	startQuestion: function() {
  		var letter;
  		$("#timeInfo").text("Time Remaining: "+game.timeLeft);
  		$("#question").text(questionsRepository[game.questionNumber][0]);
  		for (var i = 1; i <= 4; i++) {

          // Create element to hold word
          var holder = document.createElement("li");
          $("#choice-picker").append(holder);

          
          $(holder).attr("id", i).text(questionsRepository[game.questionNumber][i]);

          console.log("li "+i+" = "+questionsRepository[game.questionNumber][i])
        }
  		if (!clockRunning) {
	        intervalId = setInterval(game.countdown, 1000);
	        clockRunning = true;
	    }
	    console.log("li "+i+" = "+questionsRepository[game.questionNumber][5])
  	},
  	nextQuestion: function(){
  		game.stopRunningQuestion();
  		game.clear();
  		game.questionNumber++;
  		if (game.questionNumber===7){
  			game.stopRunningQuestion();
  		}else{
  			game.startQuestion();

  		}
  	},

  	clear: function() {
  		//$("#timeInfo").empty();
        $("#question").empty();
        $("#choice-picker").empty();
    },

  	countdown: function() {
  		if (game.timeLeft==0){

  			game.stopRunningQuestion();
  			losses++;
  			game.clear();
          	
          	game.showResults();
          	

  		} else {
  			game.timeLeft--;
  			$("#timeInfo").text("Time Remaining: "+game.timeLeft);
  		}
  	},
	showResults: function() {
		console.log("Wins: "+wins);
		console.log("Losses: "+losses);
		if (losses===4){
			$("#timeInfo").text("Wrong! The right choice was "+questionsRepository[game.questionNumber][5]);
          	$("#timeInfo").append("<h2>You lost</h2>");
          	$("#timeInfo").append("<h2>Score:</h2>");
          	$("#timeInfo").append("<h2>Wins: "+wins+"</h2>");
          	$("#timeInfo").append("<h2>Losses: "+losses+"</h2>");
        	$(".button-choice").show();
		} else if (wins===4){
			$("#timeInfo").text("Correct! The right choice was "+questionsRepository[game.questionNumber][5]);
          	$("#timeInfo").append("<h2>You Won</h2>");
          	$("#timeInfo").append("<h2>Score:</h2>");
          	$("#timeInfo").append("<h2>Wins: "+wins+"</h2>");
          	$("#timeInfo").append("<h2>Losses: "+losses+"</h2>");
        	$(".button-choice").show();
		} else{ 
			if (!clockRunningResults) {
				intervalId = setInterval(game.countdownResults, 1000);
			    clockRunningResults = true;
			}
		}
	},

  	countdownResults: function() {

	  	if (game.timeResults==0){
	  		clearInterval(intervalId);
    		clockRunningResults = false;
	  		game.timeResults=maxShowTime;
	  		game.clear();
  			game.nextQuestion();
  		} else {
  			game.timeResults--;
  			
  		}
		
	  
	}


  	
};