require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

console.log(spotify.id);
console.log(spotify.secret);

var command = process.argv[2];
console.log(command);

switch (command) {
    case "concert-this":
        console.log("1");
        break;

    case "spotify-this-song":
        spotifyThis();
        break;

    case "movie-this":
        console.log("3");
        break;

    case "do-what-it-says":
        console.log("4");
        break;

};

function spotifyThis() {
    spotify
        .search({
            type: 'track',
            query: 'working on the chain gang',
            limit: 1
        })
        .then(function (response) {
            console.log("Artists: " + response.tracks.items[0].artists[0].name);
            console.log("Song: " + response.tracks.items[0].name);
            console.log("Preview: " + response.tracks.items[0].preview_url);
            console.log("Album: " + response.tracks.items[0].album.name);

        })
        .catch(function (err) {
            console.log(err);
        });
}