
var User = {
    latitude:0.00,
    longitude:0.00
};

var geoSettings = {
    enableHighAccuracy: true,
    maximumAge        : 30000,
    timeout           : 20000
  };

const setLocationOnMap = ()=>{ 

    var UsersLatLong = { lat: (User.latitude), lng: (User.longitude)};
    
    //set avatar

    const UserIcon = {
        url: "../../assets/myicon.jpg", // url
        scaledSize: new google.maps.Size(50, 50), // scaled size
        origin: new google.maps.Point(0,0), // origin
        anchor: new google.maps.Point(0, 0) // anchor
    };

    //set map options
    var mapOptions = {
    center: UsersLatLong,
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    streetViewControl: false,
    mapTypeControl: false,
    };

    
    //create and load map
    var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

    // Create a marker with a custom icon

    const marker = new google.maps.Marker({
        position: UsersLatLong,
        map: map,
        icon:UserIcon
    });

    //load marker
    marker.icon.scaledSize = new google.maps.Size(50, 50);
    marker.icon.size = new google.maps.Size(100, 100);
    marker.setMap(map);

    //add zooming listener
    map.addListener('zoom_changed', function() {
        switch(map.zoom)
        {   
            case 0:{
                marker.icon.scaledSize = new google.maps.Size(1,1);
                marker.icon.size = new google.maps.Size(1,1);
                marker.setMap(map);
                map.zoom = 4;
                directionsDisplay.setMap(map);
            }
            case 1:{
                marker.icon.scaledSize = new google.maps.Size(1,1);
                marker.icon.size = new google.maps.Size(2,2);
                marker.setMap(map);
                map.zoom = 4;
                directionsDisplay.setMap(map);
            }
            case 2:{
                marker.icon.scaledSize = new google.maps.Size(2, 2);
                marker.icon.size = new google.maps.Size(3,3);
                marker.setMap(map);
            }
            case 3:{
                marker.icon.scaledSize = new google.maps.Size(3, 3);
                marker.icon.size = new google.maps.Size(4,4);
                marker.setMap(map);
            }
            case 4:{
                marker.icon.scaledSize = new google.maps.Size(4, 4);
                marker.icon.size = new google.maps.Size(5, 5);
                marker.setMap(map);
            }
            case 5:{
                marker.icon.scaledSize = new google.maps.Size(5, 5);
                marker.icon.size = new google.maps.Size(6, 6);
                marker.setMap(map);
            }
            case 6:{
                marker.icon.scaledSize = new google.maps.Size(6, 6);
                marker.icon.size = new google.maps.Size(7, 7);
                marker.setMap(map);
            }
            case 7:{
                marker.icon.scaledSize = new google.maps.Size(7, 7);
                marker.icon.size = new google.maps.Size(8, 8);
                marker.setMap(map);
            }
            case 8:{
                marker.icon.scaledSize = new google.maps.Size(8, 8);
                marker.icon.size = new google.maps.Size(9, 9);
                marker.setMap(map);
            }
            case 9:{
                marker.icon.scaledSize = new google.maps.Size(9, 9);
                marker.icon.size = new google.maps.Size(10, 10);
                marker.setMap(map);
            }
            case 10:{
                marker.icon.scaledSize = new google.maps.Size(10, 10);
                marker.icon.size = new google.maps.Size(20, 20);
                marker.setMap(map);
            }
            case 11:{
                marker.icon.scaledSize = new google.maps.Size(10, 10);
                marker.icon.size = new google.maps.Size(20, 20);
                marker.setMap(map);
            }
            case 12:{
                marker.icon.scaledSize = new google.maps.Size(10, 10);
                marker.icon.size = new google.maps.Size(20, 20);
                marker.setMap(map);
            }
            case 13:{
                marker.icon.scaledSize = new google.maps.Size(10, 10);
                marker.icon.size = new google.maps.Size(20, 20);
                marker.setMap(map);
            }
            case 14:{
                marker.icon.scaledSize = new google.maps.Size(10, 10);
                marker.icon.size = new google.maps.Size(20, 20);
                marker.setMap(map);
            }
            case 15:{
                marker.icon.scaledSize = new google.maps.Size(20, 20);
                marker.icon.size = new google.maps.Size(25, 25);
                marker.setMap(map);
            }
            case 16:{
                marker.icon.scaledSize = new google.maps.Size(30, 30);
                marker.icon.size = new google.maps.Size(50, 50);
                marker.setMap(map);
            }
            case 17:{
                marker.icon.scaledSize = new google.maps.Size(40, 40);
                marker.icon.size = new google.maps.Size(75, 75);
                marker.setMap(map);
            }
            case 18:{          
                marker.icon.scaledSize = new google.maps.Size(50, 50);
                marker.icon.size = new google.maps.Size(100, 100);
                marker.setMap(map);
            }
            case 19:{
                marker.icon.scaledSize = new google.maps.Size(60, 60);
                marker.icon.size = new google.maps.Size(110, 110);
                marker.setMap(map);
            }
            case 20:{
                marker.icon.scaledSize = new google.maps.Size(70, 70);
                marker.icon.size = new google.maps.Size(120, 120);
                marker.setMap(map);
            }
            case 21:{
                marker.icon.scaledSize = new google.maps.Size(80, 80);
                marker.icon.size = new google.maps.Size(130, 130);
                marker.setMap(map);
            }
            case 22:{
                marker.icon.scaledSize = new google.maps.Size(90, 90);
                marker.icon.size = new google.maps.Size(140, 140);
                marker.setMap(map);
            }
            default:{
                marker.icon.scaledSize = new google.maps.Size(50, 50);
                marker.icon.size = new google.maps.Size(100, 100);
                marker.setMap(map);
            }
            break;
        }
      });
}

const showError = (error)=>{
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
}

(function getUserLocation(){

if(navigator.geolocation)
{
    navigator.permissions.query({ name: "geolocation" }).then((result) => {

    alert(result.state);
    if (result.state === "granted") {

    const getLocationCoordinates = (position)=>{User.latitude = position.coords.latitude;User.longitude = position.coords.longitude;setLocationOnMap();}
    navigator.geolocation.watchPosition(getLocationCoordinates,showError,geoSettings)
       
    } 
    else if(result.state === "prompt")
    {  
        const getLocationCoordinates = (position)=>{User.latitude = position.coords.latitude;User.longitude = position.coords.longitude;setLocationOnMap();}
        navigator.geolocation.watchPosition(getLocationCoordinates,showError,geoSettings);

    }
    else if(result.state === "denied")
    {
        alert("You have "+result.state+" location permission which is required for this application in order to work.Please enable it manually in browser settings.");
        //repeatatively ask for permission code here
    }
    else
    {
        alert("Something went wrong!!!");
    }

    }).catch((e)=>{
        console.log("error is there: "+e);
    });


}
else
{
    alert("Geolocation is not supported by this browser.");
}

})();





// setTimeout(setInterval(getUserLocation,5000),5000);



//javascript.js





//define calcRoute function
// function calcRoute() {
//     //create request
//     var request = {
//         origin: document.getElementById("from").value,
//         destination: document.getElementById("to").value,
//         travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
//         unitSystem: google.maps.UnitSystem.IMPERIAL
//     }

//     //pass the request to the route method
//     directionsService.route(request, function (result, status) {
//         if (status == google.maps.DirectionsStatus.OK) {

//             //Get distance and time
//             const output = document.querySelector('#output');
//             output.innerHTML = "<div class='alert-info'>From: " + document.getElementById("from").value + ".<br />To: " + document.getElementById("to").value + ".<br /> Driving distance <i class='fas fa-road'></i> : " + result.routes[0].legs[0].distance.text + ".<br />Duration <i class='fas fa-hourglass-start'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";

//             //display route
//             directionsDisplay.setDirections(result);
//         } else {
//             //delete route from map
//             directionsDisplay.setDirections({ routes: [] });
//             //center map in London
//             map.setCenter(UsersLatLong);

//             //show error message
//             output.innerHTML = "<div class='alert-danger'><i class='fas fa-exclamation-triangle'></i> Could not retrieve driving distance.</div>";
//         }
//     });

// }



//create autocomplete objects for all inputs
// var options = {
//     types: ['(cities)']
// }

// var input1 = document.getElementById("from");
// var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

// var input2 = document.getElementById("to");
// var autocomplete2 = new google.maps.places.Autocomplete(input2, options);

