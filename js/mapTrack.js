var mapTrack;

function intialiceMap() {
    mapTrack = L.map('mapTrack').fitWorld();

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: 'Alpuin Matias'
    }).addTo(mapTrack);

    //Punto UNGS
    mapTrack.setView([-34.52183764208916, -58.69985179010459], 17);
}



var constPolilyne = [];
//Dibujar circuito:
function drawTrack(response) {
    var htmlContent = ''
    var polyline;
    response.tracks.forEach(element => {
        htmlContent = '<h6>Pista ID ' + element.id + '</h6>';
        polyline = L.polyline(element.coordinates, { color: 'blue', weight: 3 }).bindPopup(htmlContent).addTo(mapTrack);
        constPolilyne.push(new PolyLineT(element.id, polyline));
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
var trackIDSelected;
function popUpTrackPointOnMap(id, lat, lon) {
    htmlContent = '<h6> Pista </h6><p>ID: ' + id + '</p>';
    trackIDSelected = id;
    L.popup({
        offset: [-30, -90]
    })
        .setLatLng({ "lat": lat, "lon": lon })
        .setContent(htmlContent)
        .openOn(mapTrack);

    getRunnersByTracksID(id)
        .then(createButtonRunnerList)
    getCameraByTrackID(id).
        then(drawCamerasByTrackID);
}

////Iconos corredores
var iconRunner = L.icon({
    iconUrl: '../img/iconRunner.png',

    iconSize: [38, 38], // size of the icon
    iconAnchor: [22, 22], // point of the icon which will correspond to marker's location
});

//Armar lista de corredores por id de pista
runnerList = [];
function createButtonRunnerList(response) {
    consoleP(trackIDSelected);
    var tagButtonStart = '<button type="button" class="list-group-item list-group-item-action" onclick="popUpRunnerOnMap(';
    var tagButtonEnd;
    var completeTagButton = '';
    response.runners.forEach((element) => {
        idNumber = element.id;
        nombre = element.name;
        sponsor = element.sponsor.name;
        tagButtonEnd = idNumber + ')">' + idNumber + ' - ' + nombre + ' - ' + sponsor + '</button>';
        completeTagButton += tagButtonStart + tagButtonEnd;
        runnerList.push(new Runner(idNumber, nombre, sponsor));
    });

    divElement = document.createElement('div');
    divElement.innerHTML = completeTagButton;
    const list = document.getElementById('buttonRunnerList');
    list.removeChild(list.firstElementChild);
    list.appendChild(divElement);
}

var line;
var htmlRunnerContent = '';
function popUpRunnerOnMap(runner_id) {
    constPolilyne.forEach(element => {
        if (element.id_track == trackIDSelected) {
            line = element.polyline;
            return
        }
    });
    htmlRunnerContent += '<p>Corredor ID:' + runner_id + '</p>';
    getReplayByTrackIDByRunnerID(trackIDSelected, runner_id)
        .then(drawRunnerOnMap);
}

function popUpAllRunnersOnMap() {
    constPolilyne.forEach(element => {
        if (element.id_track == trackIDSelected) {
            line = element.polyline;
            return
        }
    });
    runnerList.forEach(element => {
        getReplayByTrackIDByRunnerID(trackIDSelected, element.id)
            .then(drawRunnerOnMap);
    });
}

function drawRunnerOnMap(response) {
    checkpoints = response.positions.checkpoints
    drawCheckpointsOnMap(checkpoints);
}

function drawCheckpointsOnMap(checkpoints) {
    var timeIni = null;
    var timeLast = null;
    var nroRg = 0;
    var timeTotal;
    //checkpoints = ordenarAsc(checkpoints,'timeStamp');
    consoleP(checkpoints);
    checkpoints.forEach(element => {
        nroRg++;
        if (timeIni == null) {
            timeIni = new Date(element.timeStamp);
            timeTotal = timeIni;
            htmlRunnerContent += '<p>Checkpoint' + nroRg + ' ' + timeIni.getHours() + ':' + timeIni.getMinutes().toString().padStart(2, 0) + '</p>';
        } else {
            timeLast = new Date(element.timeStamp);
            htmlRunnerContent += '<p>Checkpoint' + nroRg + ' ' + timeLast.getHours() + ':' + timeLast.getMinutes().toString().padStart(2, 0) + '</p>';

            intervalo = (timeLast - timeIni);
            animatedMoveMarket(intervalo);

            timeIni = timeLast;
        }
    });

    //htmlRunnerContent += '<p>Tiempo total:' + nroRg + ' ' + (timeTotal) + '</p>';
    animatedMoveMarket(intervalo);
    htmlRunnerContent = '';
}

//Iconos camaras
var cameraIcon = L.icon({
    iconUrl: '../img/camera.png',

    iconSize: [38, 38], // size of the icon
    iconAnchor: [22, 22], // point of the icon which will correspond to marker's location
});

//Dibujar camaras en circuito:
function drawCamerasByTrackID(response) {
    response.webcams.forEach((element) => {
        htmlContent = '<p>Camera ID:' + element.id + '</hp> Frecuencia:' + element.frecuency + '</p>';
        L.marker(element.coordinate, { icon: cameraIcon }).addTo(mapTrack).bindPopup(htmlContent);
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
    htmlContent = '<p> Camera ID: ' + id + '</p>';
    L.popup({
        offset: [0, -10]
    })
        .setLatLng({ "lat": lat, "lon": lon })
        .setContent(htmlContent)
        .openOn(mapTrack);
}

var animatedMarkerR = [];
function animatedMoveMarket(intervalo) {
    animatedMarker = L.animatedMarker(line.getLatLngs(), {
        autoStart: true,
        icon: iconRunner,
        onEnd: function () {
            mapTrack.removeLayer(this);
        }
    });

    L.popup({
        offset: [-0, -100]
    })
        .setLatLng(animatedMarker.getLatLng())
        .setContent(htmlRunnerContent)
        .openOn(mapTrack);

    mapTrack.addLayer(animatedMarker);

    animatedMarker = L.animatedMarker(line.getLatLngs(), {
        distance: 200,  // meters
        interval: intervalo, // milliseconds
    });
}

intialiceMap();
getTracks().then(drawTrack);