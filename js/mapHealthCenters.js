const mapHealthCenter = L.map('mapHealthCenter').fitWorld();

// const iconHealtCenter = L.icon({
//     iconUrl: '../img/iconHealthCenter.png',

//     iconSize:     [38, 38], // size of the icon
//     iconAnchor:   [0, 0], // point of the icon which will correspond to marker's location
// });

//Centros de Salud
const dataPointsHealthCenter = [
    {
        "id": 1,
        "nombre": "Hospital Polo Malvinas",
        "coordenadas": { "lat": -34.520960, "lon": -58.717114 },
        "direccion": "Av. Pres. Arturo Umberto Illia 5200"
    },
    {
        "id": 2,
        "nombre": "Hospital San Miguel",
        "coordenadas": { "lat": -34.536318, "lon": -58.720593 },
        "direccion": "Av. Pte. J. D. Perón 2313"
    },
    {
        "id": 3,
        "nombre": "Profe en Malvinas Argentinas",
        "coordenadas": { "lat": -34.50155234132343, "lon": -58.71440291423126 },
        "direccion": "Av. del Sesquicentenario 1356"
    },
    {
        "id": 4,
        "nombre": "Hosptial de Trauma Fedeerico Abete",
        "coordenadas": { "lat": -34.49475357967246, "lon": -58.70900706949554 },
        "direccion": "123, Miraflores, Pablo Nogués"
    },
    {
        "id": 5,
        "nombre": "Hospital Santa Maria",
        "coordenadas": { "lat": -34.56190267192468, "lon": -58.73784000018354 },
        "direccion": "Defensa, B1663 San Miguel, Provincia de Buenos Aires"
    },
    {
        "id": 6,
        "nombre": "Hospital Mercante J.C.Paz",
        "coordenadas": { "lat": -34.5146042860671, "lon": -58.74009504662259, },
        "direccion": "Dr. René Favaloro 4750, B1665 José C. Paz"
    },
]

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Alpuin Matias'
}).addTo(mapHealthCenter);

function createButtonHealthCenterList() {
    var tagButtonStart = '<button type="button" class="list-group-item list-group-item-action" onclick="popUpHealthCenterPointOnMap(';
    var idNumber;
    var nombre;
    var tagButtonEnd;
    var completeTagButton = '';
    dataPointsHealthCenter.forEach((element) => {
        idNumber = element.id;
        nombre = element.nombre;
        tagButtonEnd = idNumber + ')">' + nombre + '</button>';
        completeTagButton += tagButtonStart + tagButtonEnd;
    });

    divElement = document.createElement('div');
    divElement.innerHTML = completeTagButton;
    document.getElementById('buttonCenterList').appendChild(divElement);

}

function popUpHealthCenterPointOnMap(id) {
    datoJson = dataPointsHealthCenter.filter(
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
        .openOn(mapHealthCenter);
}

addPointsOnMap(dataPointsHealthCenter, mapHealthCenter);
createButtonHealthCenterList();

//Punto Inicio
mapHealthCenter.setView(dataPointsHealthCenter[0].coordenadas, 17);


