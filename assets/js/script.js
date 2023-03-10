var fitnessBtn = $('#fitnessBtn');
var nutritionBtn = $('#nutritionBtn');
var exercises = [];

$(document).ready(function () {
  fitnessBtn.click(function () {
    location.href = 'fitness.html';
  });
});

$(document).ready(function () {
  nutritionBtn.click(function () {
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
      "X-RapidAPI-Key": "ce8561e5b7msha69af3c83bd16d4p1db145jsnae91a16a2331",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
    }
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    var workout = randomWorkout(response);
    displayWorkout(workout);
  });
}
// Generates a random workout based on the data array passed to it.
function randomWorkout(data) {
  var exercises = data.results;
  var randomIndex = Math.floor(Math.random() * exercises.length);
  return exercises[randomIndex];
}
// Displays the workout: bodyPart, Gif, and name on the screen.
function displayWorkout(workout) {
  var bodyPart = workout.bodyPart;
  var gifUrl = workout.gifUrl;
  var name = workout.name;

  // Update the HTML with the workout information
  var bodyPartElem = $('#bodyPart');
  var gifElem = $('#gif');
  var nameElem = $('#name');

  bodyPartElem.text(bodyPart);
  gifElem.attr('src', gifUrl);
  nameElem.text(name);
}


// this will be an event listener
$(document).ready(function () {
  var selectedBodyParts = []; // initialize an empty array to store selected body parts
  $('.body-part-btn').click(function () {
    // Get the body part value from the data attribute
    var bodyPart = $(this).data('body-part').split(' ');
    selectedBodyParts.push(bodyPart); // add selected body part to the array
    if (selectedBodyParts.length >= 2) { // if two or more body parts are selected
      // Call getBodyPart with each selected body part value
      selectedBodyParts.forEach(function (part) {
        getBodyPart(part);
      });
      selectedBodyParts = []; // reset the array for next selection
    }
  });
});

