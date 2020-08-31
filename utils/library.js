/*
	Input: An object containing information specific to one country. (e.g. Afghanistan)

	Output: A string of languages spoken at that country delimited by commas. (e.g. 'Pashto, Uzbek, Turkmen')
*/ 

exports.returnLanguages = obj => {
	const itemArr = [];

	for (let i = 0; i < obj.languages.length; i++) {
		itemArr.push(obj.languages[i].name);
	}

	return itemArr.join(', ');
}