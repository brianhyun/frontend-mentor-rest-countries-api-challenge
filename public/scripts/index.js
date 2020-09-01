$(document).ready(function(){
	// Query Search Input
	$(".query__search-input").on("keyup", (event) => {
		// Grab Input 
		const chars = event.target.value.toLowerCase(); 

		displayOnMatch(".countries__country-info__header", chars);
	})

	// Toggle Menu on Click 
	$("#query__filter-button").on("click", () => {
		$("#query__filter-menu").toggle("hide");
	})

	// Filter Page on Menu-Item Click
	$(".query__filter-item").on("click", (event) => {
		const region = event.target.innerText.toLowerCase();

		displayOnMatch(".country__info-region", region);
	})
});

/*
	Input: 
		(a) element
			This is a class name (e.g. ".countries__country-info__header", ".country__info-region"). 
		(b) filterCategory
			This is a string (e.g. "India", "Europe").
	
	Output: 
		Hides elements that don't satisfy the filter category. 

	This function is used in two instances: 
		(1) when a user types in the search bar and 
			In the case of the search bar, the function will look through all of the country divs and compare the name of the country to the user's search input. 
			If the the country name doesn't match the user's search input, then the country will be hidden. Otherwise, it'll be shown. 
		(2) when the user filters based on region. 
			In the case of filtering by region, the function will look through all of the country divs and compare the region in which they are located to the user selected region. 
			If the country's region doesn't match the user's selected region, then the country will be hidden. Otherwise, it'll be shown. 
*/

function displayOnMatch(element, filterCategory) {
	// Grab All Countries Within Grid 
	$(element).each(function () {
		// Grab Name of Country 
		const nameRegion = $(this).text().toLowerCase();

		// Conditional to Test if Input is Equal to Country Name
		if (nameRegion.indexOf(filterCategory) === -1) {
			// Hide Country Element 
			$(this).parents(".countries__country-link").hide();
		} else {
			// Show Country Element 
			$(this).parents(".countries__country-link").show();
		}
	}); 

	if ($(".countries-container").children(":visible").length === 0) {
		$("#no-matches").removeClass("hide");
	} else {
		$("#no-matches").addClass("hide");
	}
}