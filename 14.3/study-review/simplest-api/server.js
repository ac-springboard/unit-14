'use strict';

//
// https://dev.to/lennythedev/quick-server-with-node-and-express-in-5-minutes-17m7
//

const express = require('express');
const server = express();

server.use(require('serve-favicon')(__dirname + '/favicon.ico'));

server.get("/json1", (req, res ) => {
	getJson1( res );
});

async function getJson1( res ){
	const ms = 2000;
	await sleep( ms );
	return res.json({
		message: "TV Maze - Test",
		waitingTime: `${ms} ms`,
		next: "http://localhost:4000/json2"
	});
}

server.get("/json2", (req, res ) => {
	getJson2( res );
});

async function getJson2( res ){
	const ms = 3000;
	await sleep( ms );
	return res.json({
		message: "This is Json2", waitingTime: `${ms} ms`
	});
}

server.get("/", (req, res ) => {
	console.log(__dirname);
	res.sendFile(__dirname + "/index.html" );
});

function sleep(ms) {
	return new Promise( resolve => setTimeout( resolve, ms ));
}

const port = 4000;
server.listen( port, () => {
	console.log(`Server listening at ${port}`);
});


