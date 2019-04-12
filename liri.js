require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var request = require('request');
var moment = require('moment');

var spotify = new Spotify(keys.spotify);

// console.log(spotify.id);
// console.log(spotify.secret);

var command = process.argv[2];
var term = process.argv.slice(3).join(" ");
console.log(term);

switch (command) {
    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifyThis();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        console.log("4");
        break;

};

function spotifyThis() {
    if (term === "") {
        term = "The Sign"
    }

    console.log("------\n")
    spotify
        .search({
            type: 'track',
            query: term,
            limit: 5
        })
        .then(function (response) {
            for (var i = 0; i < response.tracks.items.length; i++) {
                console.log("Artists: " + response.tracks.items[i].artists[0].name);
                console.log("Song: " + response.tracks.items[i].name);
                console.log("Preview: " + response.tracks.items[i].preview_url);
                console.log("Album: " + response.tracks.items[i].album.name);

                console.log("\n------")
            }
        })
        .catch(function (err) {
            console.log(err);
        });

}

function concertThis() {
    console.log("------\n")
    var apiKey = ""
    var queryUrl = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=" + apiKey;

    request(queryUrl, {
        json: true
    }, (err, response, body) => {
        if (err) {
            return console.log(err);
        }
        for (var i = 0; i < response.body.length; i++) {
            console.log("Line-up: " + response.body[i].lineup)
            console.log("Venue: " + response.body[i].venue.name)
            console.log("Location: " + response.body[i].venue.city + ", " + response.body[1].venue.region + ", " + response.body[1].venue.country)
            console.log("Date: " + moment(response.body[i].datetime).format("MM/DD/YYYY"))

            console.log("\n------")
        }
    });
}

function movieThis() {
    if (term === "") {
        term = "Mr. Nobody"
    }

    console.log("------\n")
    var apiKey = ""
    var queryUrl = "http://www.omdbapi.com/?t=" + term + "&apikey=" + apiKey;

    request(queryUrl, {
        json: true
    }, (err, response, body) => {
        if (err) {
            return console.log(err);
        }
        // for (var i = 0; i < response.body.length; i++) {
        console.log("Title: " + response.body.Title);
        console.log("Released: " + response.body.Released);
        console.log(response.body.Ratings[0].Source + " Score: " + response.body.Ratings[0].Value);
        console.log(response.body.Ratings[1].Source + " Score: " + response.body.Ratings[0].Value);
        console.log("Country: " + response.body.Country);
        console.log("Languages: " + response.body.Language);
        console.log("Plot: " + response.body.Plot);
        console.log("Actors: " + response.body.Actors);


        console.log("\n------")
        // }
    });
}