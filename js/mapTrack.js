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
        polyline = L.polyline(element.coordinates, { color: 'blue', weight: 3 }).bindPopup(htmlContent).addTo(mapTrack);
        polyline.on('popupopen', function (e) {
            var popup = e.popup;
            htmlContent = '<h6>Pista ID ' + element.id + '</h6><p>Coordenadas: ' + popup.getLatLng().lng + ', ' + popup.getLatLng().lat + '</p>';
            popup.setContent(htmlContent);
        });
    });
    createButtonTrackList(response);
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
//popup nombre circuito
function popUpTrackPointOnMap(id, lat, lon) {
    htmlContent = '<h6> Pista </h6><p>ID: ' + id + '</p>';
    L.popup()
        .setLatLng({ "lat": lat, "lon": lon })
        .setContent(htmlContent)
        .openOn(mapTrack);
    getRunnersByTracksID(id).then(createButtonRunnerList);
    getCameraByTrackID(id).then(drawCamerasByTrackID);
}

//Armar lista de corredores por id de pista
function createButtonRunnerList(response) {
    //consoleP(response);
    var tagButtonStart = '<button type="button" class="list-group-item list-group-item-action" onclick="popUpTrackPointOnMap(';
    var tagButtonEnd;
    var completeTagButton = '';
    response.runners.forEach((element) => {
        idNumber = element.id;
        nombre = element.name;
        sponsor = element.sponsor.name;
        tagButtonEnd = idNumber + ')">' + idNumber + ' - ' + nombre + ' - ' + sponsor + '</button>';
        completeTagButton += tagButtonStart + tagButtonEnd;
    });

    divElement = document.createElement('div');
    divElement.innerHTML = completeTagButton;
    const list = document.getElementById('buttonRunnerList');
    list.removeChild(list.firstElementChild);
    list.appendChild(divElement);

}

//Dibujar camaras en circuito:
// function drawCamerasByTrackID(response) {
//     var htmlContent = ''
//     var polyline;
//     response.webcams.forEach(element => {
//         htmlContent = '<h6>Pista ID ' + element.id + '</h6>';
//         polyline = L.polyline(element.coordinates, { color: 'blue', weight: 3 }).bindPopup(htmlContent).addTo(mapTrack);
//         polyline.on('popupopen', function (e) {
//             var popup = e.popup;
//             htmlContent = '<h6>Pista ID ' + element.id + '</h6><p>Coordenadas: ' + popup.getLatLng().lng + ', ' + popup.getLatLng().lat + '</p>';
//             popup.setContent(htmlContent);
//         });
//     });
//     createButtonCameraList(response);
// }

//Dibujar camaras en circuito:
function drawCamerasByTrackID(response) {
    response.webcams.forEach((element) => {
        htmlContent = '<p>Camera ID:' + element.id + ' </p><p> Frecuencia:' + element.frecuency + '</p>';
        L.marker(element.coordinate).addTo(mapTrack).bindPopup(htmlContent);
    });
    createButtonCameraList(response);
}


//Armar lista de camaras por id de pista
function createButtonCameraList(response) {
    //consoleP(response);
    var tagButtonStart = '<button type="button" class="list-group-item list-group-item-action" onclick="popUpCameraPointOnMap(';
    var tagButtonEnd;
    var completeTagButton = '';
    response.webcams.forEach((element) => {
        idNumber = element.id;
        frecuency = element.frecuency;
        coordenada = element.coordinate.lat + ',' + element.coordinate.lon;
        tagButtonEnd = idNumber + ',' + coordenada + ')">ID: ' + idNumber + ' - Frecuencia:' + frecuency + '</button>';
        completeTagButton += tagButtonStart + tagButtonEnd;
    });

    divElement = document.createElement('div');
    divElement.innerHTML = completeTagButton;
    const list = document.getElementById('buttonCameraList');
    list.removeChild(list.firstElementChild);
    list.appendChild(divElement);

}

//popup nombre circuito
function popUpCameraPointOnMap(id, lat, lon) {
    htmlContent = '<h6> Camera ID: </h6><p>ID: ' + id + '</p>';
    L.popup()
        .setLatLng({ "lat": lat, "lon": lon })
        .setContent(htmlContent)
        .openOn(mapTrack);
}

getTracks().then(drawTrack);