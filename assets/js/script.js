var fitnessBtn = $('#fitnessBtn');
var nutritionBtn = $('#nutritionBtn');
var exercises = [];
var favorites = JSON.parse(localStorage.getItem('favorites')) || [];

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
  $(".card-content").empty();
  var gifUrl = workout.gifUrl;
  var name = workout.name;
  var h2 = $('<h2>')
  var gifImg = $('<img>');
  var youTubeLink = $('<a>');
  var workoutDiv = $("<div>").addClass("workout");
  var cardDiv = $("<div>").addClass("card has-background-primary-light card-2");
  var contentsDiv = $("<div>").addClass("card-contents");
  var titleParagraph = $("<p>").addClass("title");
  contentsDiv.append(titleParagraph);
  var imageDiv = $("<div>").addClass("card-image");
  var contentDiv = $("<div>").addClass("card-content");
  var footerDiv = $("<footer>").addClass("card-footer");
  var buttonContainer = $("<p>").addClass("card-footer-item");
  var button1 = $("<button>").attr("id", "fitnessBtn1").addClass("card-btn card-btn2");
  var button2 = $("<button>").attr("id", "fitnessBtn2").addClass("card-btn card-btn2");
  var favoriteBttn = button1.text('Favorite this exercise');
  var nextBttn = button2.text("Next Exercise!");

  // Appends elements
  buttonContainer.append(button1, button2);
  footerDiv.append(buttonContainer);
  cardDiv.append(contentsDiv, imageDiv, contentDiv, footerDiv);
  workoutDiv.append(cardDiv);
  $("#workoutDiv").removeClass('is-hidden').append(workoutDiv);
  $(".title").append(h2);
  h2.text(name);
  $(".card-image").append(gifImg);
  gifImg.attr('src', gifUrl);
  youTubeLink.text('Click me to watch a video of the exercise.');
  youTubeLink.attr('href', `https://www.youtube.com/results?search_query=${name}`);
  youTubeLink.attr('target', '_blank');
  youTubeLink.css('font-size', '20px');
  youTubeLink.css('margin', '2rem');
  $(".card-content").append(youTubeLink);

  // Takes user back to choose another exercise
  nextBttn.on('click', function() {
    location.href = 'fitness.html';
  })
  // Stores exercise into local storage if they favorite the exercise.
  favoriteBttn.on('click', function() {
    var isFavorite = favorites.some(function(favorite) {
      return favorite.name === workout.name;
    });
    if (isFavorite) {
      alert('Exercise is already in favorites!');
    } else {
      favorites.push(workout);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      alert('Exercise added to favorites!');
    }
  })
}


// Event listener for exercise buttons.
$(document).ready(function () {
  var selectedBodyParts = [];
  $('.exerciseBttns').click(function () {
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

// Event listener for favorites.
$(document).ready(function () { 
  $('.favoritesBttn').on('click', function() {
    $('#hide-choices').hide();
    favorites.forEach(function(favorite) {
      displayWorkout(favorite);
    });
  })  

});