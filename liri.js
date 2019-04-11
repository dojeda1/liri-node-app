require("dotenv").config();
var keys = require("./keys.js");
var spotify = keys.spotify;

// console.log(spotify.id);
// console.log(spotify.secret);

var command = process.argv[2];
console.log(command);

switch (command) {
    case "concert-this":
        console.log("1");
        break;

    case "spotify-this-song":
        console.log("2");
        break;

    case "movie-this":
        console.log("3");
        break;

    case "do-what-it-says":
        console.log("4");
        break;

}