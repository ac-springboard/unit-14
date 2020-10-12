'use strict';

// PROMISES, ASYNC & AWAIT

//
// EXCELLENT! https://medium.com/everythingatonce/es6-for-beginners-promises-async-await-operations-dc07494362b9
//

// const ApiCall = new Promise(function (resolve, reject) {
//
// 	const request = new XMLHttpRequest();
// 	request.open('GET', 'https://api.github.com/users/prabhur24a');
// 	request.onload = function () {
// 		if (request.status == 200) {
//
// 			resolve(request.response);
// 		} else {
// 			reject(Error(request.statusText));
// 		}
// 	};
// 	request.send();
// });
//
// ApiCall
// 	.then(function (x) {
// 		document.getElementById('response').innerHTML = x;
// 	})
// 	.catch(function (x) {
// 		document.getElementById('response').innerHTML = ":::::ERROR:::::<br />" + x;
// 	});

axios.get('https://api.github.com/users/prabhur24')
		 .then((response) => console.log(response))
		 .catch((error) => console.log(error.toJSON().message))
		 .then(() => console.log("I'm done here"));

// Check error handling out at https://github.com/axios/axios#handling-errors

async function hello() {
	let response = await fetch('https://api.github.com/');
	// above line fetches the response from the given API endpoint.
	return response;
}

hello()
	.then(function (x) {
		console.log('awaited response:', x);
	});
