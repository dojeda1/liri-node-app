require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
var request = require('request');
var moment = require('moment');
var fs = require('fs');

var spotify = new Spotify(keys.spotify);

// console.log(spotify.id);
// console.log(spotify.secret);

// grabs input from terminal
var command = process.argv[2];
var term = process.argv.slice(3).join(" ");
console.log(term);

// decides which funtion to do based on input
function check() {
    switch (command) {
        case "concert-this":
            concertThis();
            logCommand();
            break;

        case "spotify-this-song":
            spotifyThis();
            logCommand();
            break;

        case "movie-this":
            movieThis();
            logCommand();
            break;

        case "do-what-it-says":
            doWhatItSays();
            logCommand();
            break;

    };
}

check();

// gives info based on song title
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

// gives concert info based on singer or band name
function concertThis() {
    console.log("------\n")
    var apiKey = keys.bands.id
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

// gives info based on movie title
function movieThis() {
    if (term === "") {
        term = "Mr. Nobody"
    }

    console.log("------\n")
    var apiKey = keys.omdb.id
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
};

// reads random.txt file and performs a function based on it

function doWhatItSays() {
    fs.readFile('random.txt', 'utf8', function (err, data) {

        if (err) {
            return console.log(err);
        }

        var dataArr = data.split(',');
        command = dataArr[0];
        term = dataArr[1];
        check();

        console.log(dataArr)


    });
};

function logCommand() {
    fs.appendFile("log.txt", "\n\n" + command + ", " + term, function (err) {
        if (err) throw err;
        console.log('Logged\n');
    });
};