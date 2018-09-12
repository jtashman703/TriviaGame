$(document).ready(function() {
	
	var question1 = {
		text: "What is your Name?", 
		answer: "Arthur, King of the Britons.",
		wrong: ["Sir Galahad of Camelot.", "Sir Lancelot of Camelot.", "Sir Robin of Camelot."],
		correct: false,
	}

	var question2 = {
		text: "What is your Quest?", 
		answer: "To seek the Holy Grail.",
		wrong: ["To seek the Holey Grail.", "To seek the Whole Grail.", "To eat cheese and be merry."],
		correct: false,
	}

	var question4 = {
		text: "What is your favorite color?", 
		answer: "Blue",
		wrong: ["Red", "Green", "Yellow."],
		correct: false,
	}

	var question3 = {
		text: "What is the average air speed velocity of an unladen swallow?", 
		answer: "Is that an African or European Swallow?",
		wrong: ["46 mph", "10 mph", "Lightspeed"],
		correct: false,
	}

	var questionBank = [question1, question2, question3, question4];
	var bankLength = questionBank.length;
	var count = 0;
	var intervalID; 
	var time = 5;


$("#start").click(function() {

	createQuestions(questionBank[count]);
	$("#splashScreen").css('display', 'none');
	$("#questions").css('display', 'inherit');

});



function createQuestions(array) {

	intervalID = setInterval(timer, 1000);
	$("#snarf").css('background', '#FFF');
	$("#text").html("<div><h4>" + array.text);
	$("#answers").html("<div class='text-center btn btn-info btn-block' data-correct='true'>" + array.answer);

	for (var i = 0; i < array.wrong.length; i++) {
		$("#answers").append("<div class='text-center btn btn-info btn-block' data-correct='false'>" + array.wrong[i]);
	};

	correct();
}


function nextQuestion() {
	createQuestions(questionBank[count]);
}


function correct() {
	$("#answers div").click(function() {

		var questCorrect = $(this).data("correct");

		if (questCorrect === true) {
			$(this).css('background', '#5CB85C');
			questionBank[count].correct = "Right. Off you go. [crosses the Bridge]";
			count++;
			clearInterval(intervalID);
			time = 5;
			setTimeout(function() {
				checkGameEnd();		
			}, 300);

		} else {
			$(this).css('background', '#D9534F');
			questionBank[count].correct = "AAAAAAAAGHHHHH![is cast into the gorge by an invisible force]";
			count++;
			clearInterval(intervalID);
			time = 5;
			setTimeout(function() {
				checkGameEnd();		
			}, 300);	
		}

	});
}


function checkGameEnd() {
	if (count === questionBank.length) {
	$("#questions").css('display', 'none');	
	createResults();
	$("#gameOver").css('display', 'inherit');

	} else {
		nextQuestion();
	}
}


function createResults() {

	for (var i = 0; i < bankLength; i++) {

		$("#results").append("<div>Question #"+[i+1]+': ' + questionBank[i].correct + "</div>");
	}
}


$("#restart").click(function() {

	count = 0;
	$("#results").empty();	

	for (var i = 0; i < bankLength; i++) {
		questionBank[i].correct = false;
	}

	$("#gameOver").css('display', 'none');
	$("#splashScreen").css('display', 'inherit');

});


function timer() {
	$("#timer h1").html("00:0"+time);
	$("#timer").css('visibility', 'inherit');

	if (time === 0) {

		$("#snarf").css('background', '#D9534F');
		clearInterval(intervalID);
		time = 5;
		questionBank[count].correct = "AAAAAAAAGHHHHH! [is cast into the gorge by an invisible force]";
		count++;
		setTimeout(function() {
			checkGameEnd();		
		}, 600);
	}
	time--;
};





});