require("dotenv").config();
const fs = require("fs")
const axios = require("axios");
const keys = require("./keys.js");
const moment = require("moment")
const Spotify = require("node-spotify-api")
const spotify = new Spotify(keys.spotify);
var artist;
let save;


var comand = process.argv[2];
var search = process.argv[3];
//SAVE HISTORY
let history = (saveSearch) =>{
    fs.appendFile('logs.txt', saveSearch+"\n", (err)=>{
        if(err){
            console.log(err)
        }
    
        console.log('The "data to append" was appended to file!');
    })
}

//GET SPOTIFY FUNCTION
let getSpotify = (artist) => {
    
  spotify.search(
      {
          type: 'track', query: artist
      }
  ).then((result)=>{
      
      
    
        for(var i in result.tracks.items){
        
        

save = `
            Song Information
----------------------------------------------
Artist : ${result.tracks.items[i].artists[0].name}
Song : ${result.tracks.items[i].name}
Preview Link : ${result.tracks.items[i].preview_url}
Album : ${result.tracks.items[i].album.name}
----------------------------------------------
    `
     
          }

          history(save)
          console.log(save)
     
  }).catch((err)=>{
      console.log(err)
  })
}


//GET MOVIE FUNCTION
let getMovie = (movie) => {
axios.get("http://www.omdbapi.com/?apikey=trilogy&t="+movie).then((result)=>{
    var getData = result.data;
  

    
 save =  `
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

history(save)
console.log(save)
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
  


save = `
               Venue Information
----------------------------------------------
Place : ${getData.venue.name}
Location : ${getData.venue.city}, ${getData.venue.country}
Date : ${date.format("MMMM Do YYYY")}
Visit site : ${getData.url}
----------------------------------------------
`
history(save)
console.log(save)
history(save)
}



}).catch(function(err){

}).finally(function(){

})
}
//DO WHAT IT SAY FUNCTION
let doWhatItSays = () =>{


fs.readFile('random.txt','utf8', (err,data)=>{

    if(err){
        console.log(err);
    }
var splitText = data.split(',')

    spotify.search(
        {
            type: 'track', query: splitText[1], limit: 1
        }
        
        
        ).then((result) => {
            for(var i in result.tracks.items){
        
        
                
                 save =       `
         Song Information
----------------------------------------------
Artist : ${result.tracks.items[i].artists[0].name}
Song : ${result.tracks.items[i].name}
Preview Link : ${result.tracks.items[i].preview_url}
Album : ${result.tracks.items[i].album.name}
----------------------------------------------
 `
         
console.log(save)
         history(save)
              }
            
          
        }).catch((err)=>{
            console.log(err)
        })
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



switch(comand){
    case 'spotify-this-song':
            if(search === undefined){
                search = "The Sign";
                getSpotify(search);
            }else{
                getSpotify(search);
            }
        break;
    case 'concert-this':
        getBand(search);
        break;
    case 'movie-this':
            if(search === undefined){
                search = "Mr. Nobody";
                getMovie(search);
            }else{
                getMovie(search);
            }
        break;
    case 'do-what-it-says':
        doWhatItSays();
        break;
        default:
            defaultResult()
            


}


