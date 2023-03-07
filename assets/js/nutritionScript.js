

// General Notes

// 

var skillsSelect = document.getElementById("speed");
var selectedTextDiet = skillsSelect.options[skillsSelect.selectedIndex].text;


var intolleranceSelect = document.getElementById("files");
var selectedTextIntollerance = intolleranceSelect.options[intolleranceSelect.selectedIndex].text;

// var minCalories = $(".search-input").val();
var minCalories = 200;
// var maxCalories = $(".search-input2").val();
var maxCalories = 900;
console.log(minCalories);

console.log(selectedTextIntollerance)

//"https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?diet=vegetarian&intolerances=gluten&minCalories=50&maxCalories=800"

var spooge = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?diet=" + selectedTextDiet + "&intolerances=" + selectedTextIntollerance + "&minCalories=" + minCalories + "&maxCalories=" + maxCalories;


const settings = {
	"async": true,
	"crossDomain": true,
	"url": spooge,
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "0d7d04e9cemsh2554cf8f16e8e5bp103adejsn5ce9403882f6",
		"X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	var currIndex = response.results[0].id;
	console.log(currIndex);
});

const settings2 = {
	"async": true,
	"crossDomain": true,
	"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/479101/information",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "0d7d04e9cemsh2554cf8f16e8e5bp103adejsn5ce9403882f6",
		"X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
	}
};

$.ajax(settings2).done(function (response2) {
	console.log(response2);
});