var userStatusJson;

//Armar lista de camaras por id de pista
function createUserList(response) {
    //consoleP(response);
    var tagButtonStart = '<button type="button" class="list-group-item list-group-item-action" onclick="popUpCameraPointOnMap(';
    var tagButtonEnd;
    var completeTagButton = '';
    var htmlContent = '';
    var numReg = 0;
    var userStatus;
    var selectButton = '';
    //'<select class="form-select form-select-lg mb-3" aria-label=".form-select-lg"><option selected>' + opc1 + '</option><option>' + opc2 + '</option><option>' + opc3 + '</option></select>';
    response.data.forEach((element) => {
        var opc = [];
        numReg++;
        userName = element.participant.name;
        userLastName = element.participant.lastname;
        userDNI = element.participant.dni;
        userAge = element.participant.age;
        userPhoneNumber = element.participant.phoneNumber;
        userEmail = element.participant.email;

        userStatusJson.data.forEach((status) => {
            if (status.id == element.status) {
                userStatus = status.description;
                opc.push('<option selected>' + status.description + '</option>');
            } else {
                opc.push('<option>' + status.description + '</option>');
            }
        })

        selectButton = '<select class="form-select" aria-label=".form-select-lg example">' + opc[0] + opc[1] + opc[2] + '</select>';

        time = new Date(element.creation);
        userCreation = time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear();
        time = new Date(element.lastUpdate);
        userUpdate = time.getDate() + '/' + (time.getMonth() + 1) + '/' + time.getFullYear();

        tagButtonEnd = ')">BottonTest</button>';
        completeTagButton = tagButtonStart + tagButtonEnd;
        htmlContent += '<tr><th scope="row">' + numReg + '</th><td>' + userName + '</td><td>' + userLastName + '</td><td>' + userDNI + '</td><td>' + userAge + '</td><td>' + userPhoneNumber + '</td><td>' + userEmail + '</td><td>' + selectButton + '</td><td>' + userCreation + '</td><td>' + userUpdate + '</td><td>';
    });

    tbodyElement = document.createElement('tbody');
    tbodyElement.innerHTML = htmlContent;
    const list = document.getElementById('regUserList');
    list.removeChild(list.lastElementChild);
    list.appendChild(tbodyElement);
}

function getUsterStatus(response) {
    userStatusJson = response;
    getInscriptedUsers().then(createUserList);
}

function getFilteredByKey(array, key, value) {
    return array.filter(function (e) {
        return e[key] == value;
    });
}

getInscriptedUsersStatus().then(getUsterStatus);

