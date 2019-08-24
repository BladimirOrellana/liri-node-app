require("dotenv").config();
const fs = require("fs")
const axios = require("axios");
const keys = require("./keys.js");
const moment = require("moment")
const Spotify = require("node-spotify-api")
const spotify = new Spotify(keys.spotify);
var artist;


var comand = process.argv[2];
var search = process.argv[3];

//GET SPOTIFY FUNCTION
let getSpotify = (artist) => {
    
  spotify.search(
      {
          type: 'track', query: artist
      }
  ).then((result)=>{
      
      
      for(var i in result.tracks.items){
        
        
        console.log(
             `
            Song Information
----------------------------------------------
Artist : ${result.tracks.items[i].artists[0].name}
Song : ${result.tracks.items[i].name}
Preview Link : ${result.tracks.items[i].preview_url}
Album : ${result.tracks.items[i].album.name}
----------------------------------------------
`
 )
      }
      console.log(result.tracks.items[0])
  }).catch((err)=>{
      console.log(err)
  })
}


//GET MOVIE FUNCTION
let getMovie = (movie) => {
axios.get("http://www.omdbapi.com/?apikey=trilogy&t="+movie).then((result)=>{
    var getData = result.data;
  

    console.log(
        `
       Movie Information
----------------------------------------------
Name : ${getData.Title}
Released : ${getData.Released}
IMDB Rating : ${getData.imdbRating}
Ratings: ${getData.Ratings[1].Source} ${getData.Ratings[1].Value}
Country : ${getData.Country}
Language : ${getData.Language}

Plot : ${getData.Plot}

Actors : ${getData.Actors}
----------------------------------------------
`
)

}).catch((err)=>{
    console.log(err)
})

}

let getBand = (artist) => {
axios.get("https://rest.bandsintown.com/artists/"+artist+"/events?app_id=codingbootcamp")
.then(function(result){
for(var i in result.data){
    let getData = result.data[i]
    var date = moment(getData.datetime)
  
console.log(

`
               Venue Information
----------------------------------------------
Place : ${getData.venue.name}
Location : ${getData.venue.city}, ${getData.venue.country}
Date : ${date.format("MMMM Do YYYY")}
Visit site : ${getData.url}
----------------------------------------------
`
)
}



}).catch(function(err){

}).finally(function(){

})
}

let defaultResult = () =>{
    console.log(
`
Please Enter one of this comands
'concert-this'
'spotify-this-song'
'movie-this'
Follow by the name of <artist/song/movie>

For example...


node liri.js concert-this maluma

`
);
}

// fs.appendFile('logs.txt', "Hello\n", (err)=>{
//     if(err){
//         console.log(err)
//     }

//     console.log('The "data to append" was appended to file!');
// })

switch(comand){
    case 'spotify-this-song':
        getSpotify(search);
        break;
    case 'concert-this':
        getBand(search);
        break;
    case 'movie-this':
        getMovie(search);
        break;
        default:
            defaultResult()
            


}