'use strict';

console.log("Let's get this party started!");

const form = $('#search_form');
const expr = $('#search_expr');
const gifs = document.getElementById('gifs');
const imgs = document.getElementById('imgs');
const ltnr = form.on('submit', (e) => {
	e.preventDefault();
	e.stopPropagation();
	const val = expr.val();
	if ( !val) {
		console.log('Nothing to search...');
		return;
	}
	// console.log( e. );
	if (e.originalEvent.submitter.id === 'removeAll') {
		removeAll();
		return;
	}
	processSearch(val)
		.then(r => {
			const data = r.data.data;
			const l    = data.length;
			const arr  = [ rInt(l), rInt(l), rInt(l)];
			console.log(data, l, arr );
			data
				.filter((r, index) => arr.includes( index ) )
				// .forEach(r => console.log(r));
				.forEach(r => insertGif(r.images.original.url));
		});
});

async function processSearch(val) {
	const search_url = "https://api.giphy.com/v1/gifs/search";
	const search_par = {
		params: {q: val, api_key: 'MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym'}
	};
	const result     = await axios.get(search_url, search_par);
	return result;
}

function insertGif(url) {
	const img = buildImg(url);
	imgs.insertAdjacentHTML('afterend', img);
}

function buildImg(url) {
	return `<img src="${url}" height="200" alt=""/>`;
}

function removeAll() {
	gifs.querySelectorAll('img').forEach(img => img.remove());
}

function rInt(max) {
	return (Math.random() * max | 0);
}
