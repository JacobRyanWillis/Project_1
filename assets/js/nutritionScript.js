

// General Notes

// 


const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch?cuisine=italian&diet=vegetarian&intolerances=gluten&minCalories=50&maxCalories=800",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "0d7d04e9cemsh2554cf8f16e8e5bp103adejsn5ce9403882f6",
		"X-RapidAPI-Host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});