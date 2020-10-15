/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */

/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */

const search = axios.create({
	baseURL: 'http://api.tvmaze.com/search',
	timeout: 5000
});

// const images = axios.create({
// 	url: 'http://api.tvmaze.com/shows',
// 	timeout: 2000
// });

async function searchShows(query) {
	// TODO: Make an ajax request to the searchShows api.  Remove
	// hard coded data.

	const searchRes = await (search.get('/shows', {params: {q: query}}));
	console.log('searchRes:', searchRes);
	const resData = searchRes.data;
	// console.log('resData/before:', resData);
	// resData.forEach(res => console.log(res.show.image.medium));
	// console.log('resData/after:', resData);
	let shows = [];
	let imgUrl;
	let img;
	// async function checkImage (shows ) {
	// 	const shois = shows.clone();
	// 	shows.forEach( show => {
	//
	//
	//
	// 	});
	// };

	const checkOneUrl = async function (imgUrl) {
		return await axios
			.get(imgUrl)
			.then(() => true)
			.catch(() => false);
	};

	// console.log( 'before')
	// console.log( 'checkOneImage', await
	// checkOneImage('http://static.tvmaze.com/uploads/images/medium_portrait/160/401704.jpgx') ); console.log( 'after'
	// );

	const updateShows = async function (meta) {
		console.log('updateShows 1/meta:', meta);
		imgUrl = meta.show.image;
		if ( !imgUrl || !imgUrl.medium) {
			imgUrl = 'https://tinyurl.com/tv-missing';
		} else {
			await checkOneUrl(imgUrl.medium).then(isValidUrl => {
				console.log('isValidUrl', isValidUrl);
				if ( !isValidUrl) {
					imgUrl = 'https://tinyurl.com/tv-missing';
				} else {
					imgUrl = imgUrl.medium;
				}
			});
		}
		console.log('imgUrl:', imgUrl);
		console.log('updateShows 2', shows);
		shows.push({id: meta.show.id, name: meta.show.name, summary: meta.show.summary, imgUrl});
	}

	const foritch = async function (resD) {
		for (let meta in resD) {
			await updateShows(resData[meta]);
		}
		return shows;
	};
	console.log('before the foreach');
	return foritch(resData);
	// shows = await checkImage ( shows );
	// console.log('shows:', shows);
	// return shows;
}

/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
	const $showsList = $("#shows-list");
	$showsList.empty();

	for (let show of shows) {
		let $item = $(
			`<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
         <img class="card-img-top" src="${show.imgUrl}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
           </div>
         </div>
       </div>
      `);

		$showsList.append($item);
	}
}

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

	let shows = await searchShows(query);

	populateShows(shows);
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
