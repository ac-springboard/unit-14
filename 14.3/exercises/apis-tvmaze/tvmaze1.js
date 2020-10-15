/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */

const json1 = axios.create({
	baseURL: 'http://localhost:4000/json1',
	timeout: 5000
});

const json2 = axios.create({
	baseURL: 'http://localhost:4000/json2',
	timeout: 5000
});

async function getJson1(){
	console.log( 'awaiting for j1...');
	const j1 = await json1();
	console.log( 'j1/before j2:', j1, j1.data );
	console.log( 'awaiting for j2...');
	const j2 = await json2( j1 );
	j1.data["j2"] = j2.data;
	console.log( 'j1/after j2:', j1, j1.data );
	return j1;
}

async function getJson2( json ){
	const j2Url = json.next;
	console.log( 'j2Url', j2Url );
	console.log( 'awaiting for j2 in getJson2...');
	const j2 = await json2( j2Url );
	console.log( 'j2', j2 );
	return j2;
}

function outputJson( json ){
	console.log( 'Final Json:', json );
}


// async function getImageUrl(showId) {
// 	const req = {
// 		method: 'GET',
// 		url   : `/${showId}/images`
// 	};
// 	console.log('getImageUrl/req:', req);

// return image(req).then(res => res.data[0].resolutions.medium.url) ;
// console.log('getImageUrl/img.data:', img.data);
// console.log('getImageUrl/img.data.resolutions:', img.data[0].resolutions.medium);
// // console.log( 'getImageUrl/img:', img.data.resolutions.medium);
// return ;
// }

// This works
// function getImageUrl( d ){
// 	console.log( 'd:', d );
// 	const imgUrl = d.show.image.medium;
// 	console.log( 'imgUrl:', imgUrl );
// 	return imgUrl;
// }

/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 * cs  - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
// async function searchShows(query) {
// 	// TODO: Step-3 - Make an ajax request to the searchShows api.  Remove
// 	// hard coded data.
//
// 	const req = {
// 		method: 'GET',
// 		url   : '/shows',
// 		params: {q: query}
// 	};
//
// 	function getImageUrl(showId) {
// 		const url = `http://api.tvmaze.com/shows/${showId}/images`;
// 		// console.log('getImageUrl/req:', url);
// 		const img = axios.get(url).then(img => img.data[0].resolutions.medium.url);
// 		console.log('img:', img);
// 		return img;
// 	}
//
// 	const res    = await search(req);
// 	const retArr = [];
// 	return res.data.forEach( function (d) {
// 		return getImageUrl(d.show.id).then(u =>
// 			retArr.push({
// 				id      : d.show.id,
// 				imageUrl: u,
// 				name    : d.show.name,
// 				summary : d.show.summary
// 			})
// 		).then( (res2 ) => console.log( 'res2:', res2 ) );
// 	});
// 	// console.log( 'before return/retArr:', retArr );
// 	// return ret;
// }
//
// /** Populate shows list:
//  *     - given list of shows, add shows to DOM
//  */
//
// function populateShows(shows) {
// 	console.log( 'populateShows/shows:', shows );
// 	const $showsList = $("#shows-list");
// 	$showsList.empty()
//
// 	for (let show of shows) {
// 		let $item = $(
// 			`<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
//          <div class="card" data-show-id="${show.id}">
//            <div class="card-body">
//              <h5 class="card-title">${show.name}</h5>
//              <p class="card-text">${show.summary}</p>
//              <img class="card-img-top" src="${show.imageUrl}">
//            </div>
//          </div>
//        </div>
//       `);
//
// 		$showsList.append($item);
// 	}
// }

/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch(evt) {
	evt.preventDefault();

	let query = $("#search-query").val();
	if ( !query) {
		return;
	}

	$("#episodes-area").hide();

	let j1 = await getJson1();
	// let shows = await searchShows(query);

	outputJson( j1.data );
	// populateShows(shows);
});

/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
	// TODO: get episodes from tvmaze
	//       you can get this by making GET request to
	//       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

	// TODO: return array-of-episode-info, as described in docstring above
}
