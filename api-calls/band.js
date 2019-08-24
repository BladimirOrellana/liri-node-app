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

    module.exports ={

     getBand: getBand
    }