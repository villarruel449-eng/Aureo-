// js/mapa.js
let map, markerDelivery;

function initMap(lat, lng) {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: lat, lng: lng },
        zoom: 15,
    });
    markerDelivery = new google.maps.Marker({ position: { lat, lng }, map, title: "Repartidor" });
}

function calcularETA(lat1, lon1, lat2, lon2, callback) {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distancia = R * c; 
    
    const velocidad = 20; // Velocidad promedio en ciudad (km/h)
    const tiempoMinutos = Math.round((distancia / velocidad) * 60);
    
    callback(tiempoMinutos, distancia.toFixed(1));
}
