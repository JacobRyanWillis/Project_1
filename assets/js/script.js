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
  var exercises = data;
  var randomIndex = Math.floor(Math.random() * exercises.length);
  return exercises[randomIndex];
}
// Displays the workout: bodyPart, Gif, and name on the screen.
function displayWorkout(workout) {
  // var bodyPart = workout.bodyPart;
  var gifUrl = workout.gifUrl;
  var name = workout.name;

  var workoutDiv = $('<div>');
  workoutDiv.addClass('workout');
  var h2 = $('<h2>')
  h2.addClass('exerciseName');
  var gifDiv = $('<div>')

$('body').append(workoutDiv);
  workoutDiv.append(h2);
  h2.text(name);
  workoutDiv.append(gifDiv);
  gifDiv.attr('src', gifUrl);

}

// Event listener for exercise buttons.
$(document).ready(function () {
  var selectedBodyParts = []; 
  $('.card-btn').click(function () {
    $('#hide-choices').hide();
    var bodyParts = $(this).data('body-part').split(',');
    selectedBodyParts.push(...bodyParts); 
    // if there is multiple body-part data select a random one from said data.
    if (selectedBodyParts.length != 1) {
      var index = Math.floor(Math.random() * selectedBodyParts.length)
      console.log(selectedBodyParts);
      var bodyPart = selectedBodyParts[index];
      getBodyPart(bodyPart);
  } else {
      getBodyPart(selectedBodyParts);
  }
  });
  selectedBodyParts = [];
});

