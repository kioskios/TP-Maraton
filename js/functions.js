//Funcion de la pagina de registro
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

function checkCompletField(){

}

function success(){
    alert('Registro exitoso!');
}
