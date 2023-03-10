

// General Notes

// 

var skillsSelect = document.getElementById("diet");
var intolleranceSelect = document.getElementById("intolerance");


var apiCall;
var currIndex;
var currentRecipe;

$(".submit_button").on("click", function(event) {
	event.preventDefault();

	var selectedTextDiet = skillsSelect.options[skillsSelect.selectedIndex].text;
	// I added code to parse through the checkbox options and add them as input
	var selectedTextIntollerance = "";

	var markedCheckbox = document.querySelectorAll('input[type="checkbox"]:checked');  

	if (markedCheckbox.length == 1) {
		for (var checkbox of markedCheckbox) {
			  
			selectedTextIntollerance += checkbox.names;
		}  
	} else if (markedCheckbox.length > 1) {
		for (var checkbox of markedCheckbox) {  
			selectedTextIntollerance += "&intolerances=";
			selectedTextIntollerance += checkbox.names + "%2C%20";
		}
	}
	
	var minCalories = $(".min-input").val();
	var maxCalories = $(".max-input").val();
	if (minCalories == "" || maxCalories == "") {
		return;
	} else if (isNaN(minCalories) || isNaN(maxCalories)) {
		return;
	} else {
		apiCall = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?diet=" + selectedTextDiet + selectedTextIntollerance + "&minCalories=" + minCalories + "&maxCalories=" + maxCalories;
		const settings = {
			"async": true,
			"crossDomain": true,
			"url": apiCall,
			"method": "GET",
			"headers": {
				"X-RapidAPI-Key": "0d7d04e9cemsh2554cf8f16e8e5bp103adejsn5ce9403882f6",
				"X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
			}
		};
		
		$.ajax(settings).done(function (response) {
			var randIdx = Math.floor(Math.random() * response.results.length);
			currIndex = response.results[randIdx].id;
			$(".results").children("img").remove();
			// var recipeImage = $("<img>").attr("src", response.results[randIdx].image);
			// $(".results").append(recipeImage);

			getRecipe(currIndex)
		});
		
		function getRecipe(id) {
			var settings2 = {
				"async": true,
				"crossDomain": true,
				"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + id + "/information",
				"method": "GET",
				"headers": {
					"X-RapidAPI-Key": "0d7d04e9cemsh2554cf8f16e8e5bp103adejsn5ce9403882f6",
					"X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
				}
			};
			
			$.ajax(settings2).done(function (response2) {
				console.log(response2);
				currentRecipe = response2;
				$(".results").children("h2").remove();
				$(".results").children("a").remove();
				$(".results").children("button").remove();


				var recipleRealLink = response2.sourceUrl;
				var recipeLink = $('<a href="'+recipleRealLink+'">'+ response2.title +'</a>').addClass("linkRecipe");

				var recipeImage = $("<img>").attr("src", response2.image);



				var favoriteButton = $("<button>").text("Favorite this Recipe").addClass("favoriteButton");
				$(".results").append(recipeLink, recipeImage, favoriteButton);
			});
		}	
	}
})

$(document).on("click", ".favoriteButton", function(event) {
	event.preventDefault();

	var recipesArray = [];

	var newFavoriteObject = [
		title = currentRecipe.title,
		link = currentRecipe.sourceUrl,
		image = currentRecipe.image
	]

	// need to code in for if someone tries to add the same recipe twice
	var holder = JSON.parse(localStorage.getItem("recipeObjects"));
    
    if (holder === null) {
        recipesArray.push(newFavoriteObject);
    } else {
        recipesArray = holder;
        recipesArray.push(newFavoriteObject);
    }


	localStorage.setItem("recipeObjects", JSON.stringify(recipesArray));
	var directLink = $('<a href="'+ currentRecipe.sourceUrl + '">'+ currentRecipe.title +'</a>').addClass("linkRecipe");
	var directObjectAdd = $("<li>").append(directLink);
	$(".favoritesList").append(directObjectAdd);


  });

  // I will need to make a div in the HTML to store the list of favorite recipes

function init() {
	var initialHolder = JSON.parse(localStorage.getItem("recipeObjects"));
	if (initialHolder === null) {
		return;
	} else {
		for (i = 0; i < initialHolder.length; i++) {
			var newLink = $('<a href="'+ initialHolder[i][1] + '">'+ initialHolder[i][0] +'</a>').addClass("linkRecipe");
			var newListObject = $("<li>").append(newLink);
			$(".favoritesList").append(newListObject);
		}
	}
}

init();
