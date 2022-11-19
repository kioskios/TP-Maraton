
const mapTrack = L.map('mapTrack').fitWorld();

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Alpuin Matias'
}).addTo(mapTrack);

//Punto UNGS
mapTrack.setView([-34.52183764208916, -58.69985179010459], 17);

//URLS
const dataTrakPosition = getTracks();

function createButtonTrackList() {
    var tagButtonStart = '<button type="button" class="list-group-item list-group-item-action" onclick="popUpRunnerPointOnMap(';
    var idNumber;
    var nombre;
    var tagButtonEnd;
    var completeTagButton = '';
    dataTrakPosition.forEach((element) => {
        idNumber = element.id;
        nombre = element.nombre;
        tagButtonEnd = idNumber + ')">' + nombre + '</button>';
        completeTagButton += tagButtonStart + tagButtonEnd;
    });

    divElement = document.createElement('div');
    divElement.innerHTML = completeTagButton;
    document.getElementById('buttonTrackList').appendChild(divElement);

}

function popUpRunnerPointOnMap(id) {
    datoJson = dataTrakPosition.filter(
        function (item) {
            return item.id == id;
        }
    );
    htmlContent = '<h5>' + datoJson[0].nombre + ' </h5><p>' + datoJson[0].direccion + '</p>';
    L.popup({
        offset: [0, -30]
    })
        .setLatLng(datoJson[0].coordenadas)
        .setContent(htmlContent)
        .openOn(mapTrack);
}

console.log(dataTrakPosition);
//createButtonTrackList();