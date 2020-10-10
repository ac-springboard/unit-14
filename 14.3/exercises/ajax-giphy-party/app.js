'use strict';

console.log("Let's get this party started!");

const form = $('#search_form');
const expr = $('#search_expr');
const imgs = document.getElementById('imgs');
const ltnr = form.on('submit', (e) => {
	e.preventDefault();
	const val = expr.val();
	if ( !val) {
		console.log('Nothing to search...');
		return;
	}
	processSearch(val)
		.then(r => r.data.data.filter((r, index) => index < 3)
								.forEach(r => insertGif( r.images.original.url) ));
});

async function processSearch(val) {
	const search_url = "https://api.giphy.com/v1/gifs/search";
	const search_par = {
		params: {q: val, api_key: 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym'}
	};
	const result     = await axios.get(search_url, search_par);
	return result;
}

function insertGif( url ){
	const img = buildImg( url );
	imgs.insertAdjacentHTML('afterend', img );
}
function buildImg( url ){
	return `<img src=${url} height=200 alt=''/>`;
}
