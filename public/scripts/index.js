$(document).ready(function(){
	// Query Search Input
	$(".query__search-input").on("keyup", (event) => {
		// Grab Input 
		const chars = event.target.value.toLowerCase(); 

		// Grab All Countries Within Grid 
		$(".countries__country-info__header").each(function () {
			// Grab Name of Country 
			const countryName = $(this).text().toLowerCase();

			// Conditional to Test if Input is Equal to Country Name
			if (countryName.indexOf(chars) === -1) {
				// Hide Country Element 
				$(this).parents(".countries__country-link").css("display", "none");
			} else {
				// Show Country Element 
				$(this).parents(".countries__country-link").css("display", "block");
			}
		}); 
	});
  });