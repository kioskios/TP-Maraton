const mapTrack = L.map('mapTrack').fitWorld();

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Alpuin Matias'
}).addTo(mapTrack);

//Punto UNGS
mapTrack.setView([-34.52183764208916, -58.69985179010459], 17);

var Track;
//Dibujar circuito:
function drawTrack(response) {
    var htmlContent = ''
    var polyline;
    Track = response.tracks;
    response.tracks.forEach(element => {
        htmlContent = '<h6>Pista ID ' + element.id + '</h6>';
        polyline = L.polyline(element.coordinates, { color: 'blue', weight: 3 }).bindPopup(htmlContent).addTo(mapTrack);
        polyline.on('popupopen', function (e) {
            var popup = e.popup;
            htmlContent = '<h6>Pista ID ' + element.id + '</h6><p>Coordenadas: ' + popup.getLatLng().lng + ', ' + popup.getLatLng().lat + '</p>';
            popup.setContent(htmlContent);
        });
    });
}

//Armar lista de circuitos
function createButtonTrackList(response) {
    var tagButtonStart = '<button type="button" class="list-group-item list-group-item-action" onclick="popUpTrackPointOnMap(';
    var idNumber;
    var tagButtonEnd;
    var completeTagButton = '';
    response.tracks.forEach((element) => {
        idNumber = element.id;
        coordenada = element.coordinates[0].lat + ',' + element.coordinates[0].lon;
        tagButtonEnd = idNumber + ',' + coordenada + ')">ID' + idNumber + '</button>';
        completeTagButton += tagButtonStart + tagButtonEnd;
    });

    divElement = document.createElement('div');
    divElement.innerHTML = completeTagButton;
    document.getElementById('buttonTrackList').appendChild(divElement);

}

function popUpTrackPointOnMap(id, lat, lon) {
    htmlContent = '<h6> Pista </h6><p>ID: ' + id + '</p>';
    L.popup()
        .setLatLng({ "lat": lat, "lon": lon })
        .setContent(htmlContent)
        .openOn(mapTrack);
}

getTracks().then(drawTrack);
//createButtonTrackList(Track);
getTracks().then(createButtonTrackList);
//console.log(dataTrakPosition);
//createButtonTrackList();