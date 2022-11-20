//Funcion de la pagina de registro muestra y esconde elementos
function showSponsorOption() {
    var doc = document.getElementById("sponsor-select").value;
    var ownSponsor = document.getElementById('ownSponsor');
    var sponsor = document.getElementById('sponsor');
    var payMetod = document.getElementById('payMetod');

    switch (doc) {
        case 'propio': {
            ownSponsor.style.position = 'static';
            ownSponsor.style.visibility = 'visible';
            payMetod.style.position = 'static';
            payMetod.style.visibility = 'visible';
            sponsor.style.position = 'fixed';
            sponsor.style.visibility = 'hidden';
            break;
        }
        case 'patrocinado': {
            sponsor.style.position = 'static';
            sponsor.style.visibility = 'visible';
            ownSponsor.style.position = 'fixed';
            ownSponsor.style.visibility = 'hidden';
            payMetod.style.position = 'fixed';
            payMetod.style.visibility = 'hidden';
            break;
        }
    }
}

// function downloadJsonFromApi(url) {
//     const http = new XMLHttpRequest();
//     http.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             //console.log(this.responseText);
//             return this.responseText.value;
//         }
//     }

//     http.open("GET", url);
//     http.send();
// }

function checkCompletField() {

}

function success() {
    alert('Registro exitoso!');
}



function popUpPointOnMap(id, map) {
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
        .openOn(map);
}


function consoleP(text) {
    console.log(text);
}




