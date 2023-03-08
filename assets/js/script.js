var fitnessBtn = $('#fitnessBtn');
var nutritionBtn = $('#nutritionBtn');
var exercises = [];

$(document).ready(function() {
    fitnessBtn.click(function() {
      location.href = 'fitness.html';
    });
  });
  
$(document).ready(function() {
    nutritionBtn.click(function() {
      location.href = 'nutrition.html';
    });
  });

// Gets exercise based on body part passed into the parameter.
function getBodyPart(bodyPart) {
    var settings = {
	    "async": true,
	    "crossDomain": true,
	    "url": `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
	    "method": "GET",
	    "headers": {
		    "X-RapidAPI-Key": "76a8bdcc04msh00f4ce71a4dea24p18fcdfjsn0413a75078c6",
		    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
	    }
};

$.ajax(settings).done(function (response) {
	console.log(response);
});
}

getBodyPart("chest");

