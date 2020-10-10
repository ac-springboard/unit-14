'use strict';

const urlBase = 'https://api.spacexdata.com';
const caps    = '/v4/capsules';
let lDiv;

document.addEventListener('DOMContentLoaded', function () {
	const fake = document.querySelector("#fake");
	console.log("lDiv", lDiv);
	// getLaunches();		// Ok
	// getXLaunches();	// Ok
	const mill = new Date().getTime();
	// console.log( 't1:', mill );
	// wait( 3000 );

	axios.get(urlBase + caps)
			 .then(result =>
				 fake.append(JSON.parse(result.data[0])));
							 // .filter(d => d.reuse_count > 1 )
							 // .forEach(d => fake.insertAdjacentHTML('afterend', d.type + ', ' + d.reuse_count + '<br />') ) );
							 // .forEach(d => lDiv.append(JSON.stringify(d))));
	// console.log( 't2: ', new Date().getTime() );
});

async function getLaunches() {
	const res  = await axios.get(urlBase + caps);
	const data = res.data;
	console.log(JSON.stringify(data, null, 2));
	data.filter(d => d.reuse_count > 1)
			.forEach(d => console.log("d:", d));
}

function getXLaunches() {
	return new Promise(() => {
		const launches = axios.get(urlBase + caps);
		launches.then(result =>
			lDiv.innerText = JSON.stringify(result, null, 2));
	});
}

function wait( millis ){
	const curr = new Date().getTime();
	while( curr + millis - new Date().getTime() > 0  ){}
}

const hs_video = "https://hack-or-snooze-v3.herokuapp.com/stories"
const hs_actual= "https://hack-or-snooze.herokuapp.com/stories"

