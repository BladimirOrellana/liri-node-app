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
module.exports = {
    getSpotify: getSpotify
}  