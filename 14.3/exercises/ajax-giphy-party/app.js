'use strict';

console.log("Let's get this party started!");

const form = $('#search_form');
// const butt = $('#search_butt');
const expr = $('#search_expr');
const ltnr = form.on('submit', (e) => {
	e.preventDefault();
	const val = expr.val();
	if ( !val ){
		console.log('Nothing to search...');
		return;
	}
	processSearch(val).then(r => console.log( r ));
});

async function processSearch( val ){
	const search_url = "http://api.giphy.com/v1/gifs/search"
	const search_par = {
		params: { q: val, api_key: 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym' }
	}
	const result = await axios.get( search_url, search_par );
	return result;
}
