// async function downloadJsonFromApi(url) {
//     let response = await
//         fetch(url);
//     let data = await response.json()
//     return data;
// }

function downloadJsonFromApi(url) {
    return $.ajax(
        {
            url: url, type: "GET"
        });
}

//URLS
const url = 'https://fasterthanall.herokuapp.com/api';

var apiList = [];

//descripción: 'Obtiene las posiciones de los corredores en la carrera :track_id', ejemplo: '/api/replays/42'
function getReplayByTrackID(trackID) {
    urltmp = url + '/replays/' + trackID;
    apiList.push(urltmp);
    consoleP(urltmp);
    return downloadJsonFromApi(urltmp);
}

//descripción: 'Obtiene las posiciones del corredor :runner_id en la carrera :track_id', ejemplo: '/api/replays/42/runner/780'
function getReplayByTrackIDByRunnerID(trackID, runnerID) {
    urltmp = url + '/replays/' + trackID + '/runner/' + runnerID;
    apiList.push(urltmp);
    consoleP(urltmp);
    return downloadJsonFromApi(urltmp);
}

//descripción: 'descripción: 'Lista los circuitos de carrera.', ejemplo: '/api/tracks/'
function getTracks() {
    urltmp = url + '/tracks/';
    apiList.push(urltmp);
    consoleP(urltmp);
    return downloadJsonFromApi(urltmp);
}

//descripción: 'Obtiene el circuito con id :track_id', ejemplo: '/api/tracks/42'
function getTracksByTracksID(trackID) {
    urltmp = url + '/trackID/' + trackID;
    apiList.push(urltmp);
    consoleP(urltmp);
    return downloadJsonFromApi(urltmp);
}

//descripción: 'Lista los corredores de la carrera.', ejemplo: '/api/tracks/42/runners/'
function getRunnersByTracksID(trackID) {
    urltmp = url + '/tracks/' + trackID + '/runners/';
    apiList.push(urltmp);
    consoleP(urltmp);
    return downloadJsonFromApi(urltmp);
}

//descripción: 'Obtiene el corredor con id :runner_id', ejemplo: '/api/tracks/42/runners/780'
function getRunnersByTruckIDByRunnerID(trackID, runnerID) {
    urltmp = url + '/tracks/' + TrackID + '/runners/' + runnerID;
    apiList.push(urltmp);
    consoleP(urltmp);
    return downloadJsonFromApi(urltmp);
}

//descripción: 'Lista las cámaras del circuito con id :track_id.', ejemplo: '/api/webcams/42'
function getCameraByTrackID(trackID) {
    urltmp = url + '/webcams/' + trackID;
    apiList.push(urltmp);
    consoleP(urltmp);
    return downloadJsonFromApi(urltmp);
}

//descripción: 'Obtiene la cámara con id :webcam_id del circuito con id :track_id', ejemplo: '/api/webcams/42/86'
function getCameraByTrackIDByCameraID(trackID, cameraID) {
    urltmp = url + '/webcams/' + trackID + '/runners/' + cameraID;
    apiList.push(urltmp);
    consoleP(urltmp);
    return downloadJsonFromApi(urltmp);
}

//descripción: 'recuperar inscripciones'
function getInscriptedUsers() {
    urltmp = url + '/inscriptions/';
    apiList.push(urltmp);
    consoleP(urltmp);
    return downloadJsonFromApi(urltmp);
}

//descripción: 'recuperar estado de inscripciones'
function getInscriptedUsersStatus() {
    urltmp = url + '/inscriptions/status/';
    apiList.push(urltmp);
    consoleP(urltmp);
    return downloadJsonFromApi(urltmp);
}
