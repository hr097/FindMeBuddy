var User = {
    latitude:0.00,
    longitude:0.00
};

var geoSettings = {
    enableHighAccuracy: true,
    maximumAge        : 0
};


InitiateLeafMap = () =>{
    navigator.geolocation.watchPosition(
        (position)=>{User.latitude = position.coords.latitude;User.longitude = position.coords.longitude;InitiateLeafMap();},
        (error)=>{
            switch(error.code) {
              case error.PERMISSION_DENIED:
                "You have denied location permission which is required for this application in order to work.Please enable it manually in browser settings."
                break;
              case error.POSITION_UNAVAILABLE:
               alert("Location information is unavailable.")
                break;
              case error.TIMEOUT:
               alert("The request to get user location timed out.")
                break;
              case error.UNKNOWN_ERROR:
               alert("An unknown error occurred.")
                break;
            }
        },
        geoSettings);
console.log(User.latitude,User.longitude);

var marker = L.marker([User.latitude,User.longitude]).addTo(map);
var circle = L.circle([User.latitude,User.longitude], {
    color: 'green',
    fillColor: 'transparent',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

marker.bindPopup("<b>Hey There!</b>").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");


var popup = L.popup()
    .setLatLng([User.latitude,User.longitude])
    .setContent("I am here!")
    .openOn(map);

// var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);
    
}

(()=>{

    if(navigator.geolocation)
    {
        navigator.permissions.query({ name: "geolocation" }).then((result) => {

        if (result.state === "granted") {
            InitiateLeafMap();
        } 
        else if(result.state === "prompt")
        {   
            InitiateLeafMap();
        }
        else if(result.state === "denied")
        {
            alert("You have "+result.state+" location permission which is required for this application in order to work.Please enable it manually in browser settings.");
            //repeatatively ask for permission code here
            window.location.reload();
        }
        else
        {
            alert("Something went wrong!!!");
            window.location.reload();
        }

        }).catch((e)=>{
            console.log("Error Details: "+e);
        });


    }
    else
    {
        alert("Geolocation is not supported by this browser.");
    }

})();