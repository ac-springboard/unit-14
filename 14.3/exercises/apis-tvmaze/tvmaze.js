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

const FALLBACK_IMAGE_URL = 'https://tinyurl.com/tv-missing';

/**
 * This is an experiment with 'axios' to learn how to use its 'create' method.
 */
const search = axios.create({
	baseURL: 'http://api.tvmaze.com/search',
	timeout: 5000
});

/**
 * This function is responsible for searching the shows and return a structured list of shows that match
 * the search criteria (query)
 * @param query	String to be searched
 * @returns {Promise<[]>}	Promise that (in this project) is fulfilled in the function 'handleSearch'
 */
async function searchShows(query) {

	/**
	 * Initial variables
	 */
	const searchRes = await (search.get('/shows', {params: {q: query}}));
	const resData   = searchRes.data;
	let shows       = [];
	let image;

	/**
	 * Generates a structured show list form the raw list obtained directly for the api
	 * NOTE:	this method checks not only if the image url exists but also if it's valid, in case it exists.
	 * @param rawShowList
	 * @returns {Promise<[]>}
	 */
	const makeStructuredList = async function (rawShowList) {
		for (let rawShowItem in rawShowList) {
			await updateShowsImages(resData[rawShowItem]);
		}
		return shows;
	};

	const updateShowsImages = async function (meta) {

		/**
		 * Checks if a url is valid (it exists and is available).
		 * Note:	this method is generic, but (in this project) is used only in its parent function (this).
		 * 				That's why it's nested here.
		 * @param imageUrl
		 * @returns {Promise<T|boolean>}	Ultimately, return true (the url exists and is available) or false.
		 */
		const checkOneUrl = async function (imageUrl) {
			return await axios
				.get(imageUrl)
				.then(() => true)
				.catch(() => false);
		};

		/**
		 * Generates the right image (url): the actual one or the fallback.
		 * @type {string|string}
		 */
		image = meta.show.image;
		if ( !image || !image.medium) {
			image = FALLBACK_IMAGE_URL;
		} else {
			await checkOneUrl(image.medium).then(isValidUrl => {
				if ( !isValidUrl) {
					image = FALLBACK_IMAGE_URL;
				} else {
					image = image.medium;
				}
			});
		}
		/**
		 * Updates the structured show list with the right image utl
		 */
		shows.push({id: meta.show.id, name: meta.show.name, summary: meta.show.summary, image});
	};

	return makeStructuredList(resData);
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
         <img class="card-img-top" src="${show.image}">
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

	/**
	 * If the there's not data to be searched for, just return.
	 * @type {jQuery}
	 */
	let query = $("#search-query").val();
	if ( !query) {
		return;
	}

	$("#episodes-area").hide();

	/**
	 * Generates a structured show list as required by the function 'populateShows',
	 * by searching for the query provided by the user.
	 * @type {*[]}	Search expression (query) provided by ths user
	 */
	let shows = await searchShows(query);

	/**
	 * Updated the DOM based on the list provided by the the 'searchShows' function.
	 */
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
