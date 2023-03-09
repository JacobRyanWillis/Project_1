

// General Notes

// 

var skillsSelect = document.getElementById("diet");
var intolleranceSelect = document.getElementById("intolerance");


var apiCall;
var currIndex;

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
			var recipeImage = $("<img>").attr("src", response.results[randIdx].image);
			$(".results").append(recipeImage);

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
				$(".results").children("h2").remove();
				$(".results").children("a").remove();

				var recipeTitle = $("<h2>").text(response2.title);
				var recipleRealLink = response2.sourceUrl;
				var recipeLink = $('<a href="'+recipleRealLink+'">'+'link to the recipe'+'</a>');
				$(".results").append(recipeTitle, recipeLink);
			});
		}	
	}
})

