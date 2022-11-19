const mapTrack = L.map('mapTrack').fitWorld();

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Alpuin Matias'
}).addTo(mapTrack);

//Punto UNGS
mapTrack.setView([-34.52183764208916, -58.69985179010459], 17);


//Dibujar circuito:
function drawTrack(response) {
    var htmlContent = ''
    var polyline;
    response.tracks.forEach(element => {
        htmlContent = '<h6>Pista ID ' + element.id + '</h6>';
        polyline = L.polyline(element.coordinates, { color: 'blue',weight:3}).bindPopup(htmlContent).addTo(mapTrack);
        polyline.on('popupopen', function (e) {
            var popup = e.popup;
            htmlContent = '<h6>Pista ID ' + element.id + '</h6><p>Coordenadas: ' + popup.getLatLng().lng + ', ' + popup.getLatLng().lat + '</p>';            
            popup.setContent(htmlContent);
        });
    });
}

getTracks().then(drawTrack);
//console.log(dataTrakPosition);
//createButtonTrackList();