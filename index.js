const url = 'http://api.open-notify.org/iss-now.json';
var mymap;
var circle;
var myIcon;
var issMarker;
let totalView = 2177000;

async function getData() {
    const response = await fetch(url);
    const data = await response.json();
    const { latitude, longitude } = data.iss_position;
    const position = [latitude, longitude];
    //console.log(Object.keys(data));

    document.getElementById('latitude').textContent = latitude;
    document.getElementById('longitude').textContent = longitude;

    mymap = L.map('mapid', {
        center: position,
        zoom: 2
    });

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 5,
        id: 'mapbox/light-v10',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1Ijoic2d0cnVpZG8iLCJhIjoiY2tkN2w1NDFlMGxlOTJwc2M4NHp6c3J5cyJ9.gdYLJS0K1SfZZfKEO3-MhA'
    }).addTo(mymap);

    circle = L.circle(position, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.3,
        radius: (totalView-((totalView/100)*5))
    }).addTo(mymap);

    myIcon = L.icon({
        iconUrl: 'https://static.thenounproject.com/png/192885-200.png',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [-3, -76]
    });
    issMarker = L.marker(position, {icon: myIcon}).addTo(mymap);

}

const updateMap = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const { latitude, longitude } = data.iss_position;

    document.getElementById('latitude').textContent = latitude;
    document.getElementById('longitude').textContent = longitude;

    mymap.setView([latitude, longitude], 1.5);
    circle.setLatLng([latitude, longitude]);
    issMarker.setLatLng([latitude, longitude]);
    // marker = L.circle([latitude, longitude], 10000).addTo(mymap); // traces line behind icon
}