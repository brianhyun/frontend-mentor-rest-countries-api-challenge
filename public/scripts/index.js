$(document).ready(function(){
	// Filter Page on Query Search
	$(".query__search-input").on("keyup", (event) => {
		// Grab Search Query
		const chars = event.target.value.toLowerCase(); 

		displayOnMatch(".countries__country-info__header", chars);
	})

	// Toggle Menu Visibility on Click 
	$("#query__filter-button").on("click", () => {
		$("#query__filter-menu").toggle("hide");
	})

	// Filter Page on Menu-Item Click
	$(".query__filter-item").on("click", function(event) {
		// Add Bold Class to Selected Region
		$(".query__filter-item").removeClass("selected");
		$(this).addClass("selected");

		// Grab User-Selected Region
		const region = event.target.innerText.toLowerCase();

		if (region === 'all regions') {
			$(".countries__country-link").show();
		} else {
			displayOnMatch(".country__info-region", region);
		}

		$("#query__filter-menu").hide();
	})

	// Hide To-Top Button on Individual Country Pages 
	if (window.location.pathname !== '/') {
		$("#to-top-btn-link").hide();
	} else {
		$("#to-top-btn-link").show();
	}
});

/*
	Used in two instances: 
		(1) when a user types in the search bar and 
			Looks through all of the elements with class name "countries__country-info__header," which holds the country name.
			Extract the country name and compare to the user's search input. 
			If the the country name doesn't match the user's search input, then the country will be hidden. Otherwise, it'll be shown. 
		(2) when the user filters based on region. 
			Looks through all of the elements with class name "country__info-region," which holds the country region.
			Extract the country region to the user's selected region. 
			If the country's region doesn't match the user's selected region, then the country will be hidden. Otherwise, it'll be shown. 
*/

function displayOnMatch(element, filterCategory) {
	$(element).each(function () {
		const nameRegion = $(this).text().toLowerCase();

		// If (query input, region name) substring doesn't exist in (country name, region) string, 
		// then hide country element. Otherwise, display. 
		if (nameRegion.indexOf(filterCategory) === -1) {
			$(this).parents(".countries__country-link").hide();
		} else {
			$(this).parents(".countries__country-link").show();
		}
	}); 

	// If no countries are matched with user's search query or filter, then display "No Matches" div.
	if ($(".countries-container").children(":visible").length === 0) {
		$("#no-matches").removeClass("hide");
	} else {
		$("#no-matches").addClass("hide");
	}
}