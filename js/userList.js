var userStatusJson;

//Armar lista de camaras por id de pista
function createUserList(response) {
    //consoleP(response);
    var tagButtonStart = '<button type="button" class="list-group-item list-group-item-action" onclick="popUpCameraPointOnMap(';
    var tagButtonEnd;
    var completeTagButton = '';
    var htmlContent = '';
    var numReg = 0;
    response.data.forEach((element) => {
        numReg++;
        userName = element.participant.name;
        userLastName = element.participant.lastname;
        userDNI = element.participant.dni;
        userAge = element.participant.age;
        userPhoneNumber = element.participant.phoneNumber;
        userEmail = element.participant.email;

        userStatus = getFilteredByKey(userStatusJson, 'description', element.status);
        consoleP(userStatus);

        userCreation = element.creation;
        userUpdate = element.lastUpdate;

        tagButtonEnd = ')">BottonTest</button>';
        completeTagButton = tagButtonStart + tagButtonEnd;
        htmlContent += '<tr><th scope="row">' + numReg + '</th><td>' + userName + '</td><td>' + userLastName + '</td><td>' + userDNI + '</td><td>' + userAge + '</td><td>' + userPhoneNumber + '</td><td>' + userEmail + '</td><td>' + 'sts' + '</td><td>' + userCreation + '</td><td>' + userUpdate + '</td><td>' + completeTagButton + '</td></tr>'
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

