async function downloadJsonFromApi(url) {
    let response = await
        fetch(url);
    let data = await response.json()
    return data;
}

//URLS
const url = 'https://fasterthanall.herokuapp.com/api';

//descripción: 'Obtiene las posiciones de los corredores en la carrera :track_id', ejemplo: '/api/replays/42'
async function getReplayByTrackID(trackID) {
    console.log(url + '/replays/' + trackID)
    return downloadJsonFromApi(url + '/replays/' + trackID);
}

//descripción: 'Obtiene las posiciones del corredor :runner_id en la carrera :track_id', ejemplo: '/api/replays/42/runner/780'
async function getReplayByTrackIDByRunnerID(trackID, runnerID) {     
    console.log(url + '/replays/' + trackID + '/runner/' + runnerID)
    return downloadJsonFromApi(url + '/replays/' + trackID + '/runner/' + runnerID);
}

//descripción: 'descripción: 'Lista los circuitos de carrera.', ejemplo: '/api/tracks/'
async function getTracks() {
    console.log(url + '/tracks/');
    return downloadJsonFromApi(url + '/tracks/');
}

//descripción: 'Obtiene el circuito con id :track_id', ejemplo: '/api/tracks/42'
async function getTracksByTracksID(trackID) {
    return downloadJsonFromApi(url + '/trackID/' + trackID);
}

//descripción: 'Lista los corredores de la carrera.', ejemplo: '/api/tracks/42/runners/'
async function getRunnersByTracksID(trackID) {
    return downloadJsonFromApi(url + '/trackID/' + trackID + '/runners/');
}

//descripción: 'Obtiene el corredor con id :runner_id', ejemplo: '/api/tracks/42/runners/780'
async function getRunnersByTruckIDByRunnerID(trackID, runnerID) {
    return downloadJsonFromApi(url + '/trackID/' + TrackID + '/runners/' + runnerID);
}

//descripción: 'Lista las cámaras del circuito con id :track_id.', ejemplo: '/api/webcams/42'
async function getCameraByTrackID(trackID) {
    return downloadJsonFromApi(url + '/webcams/' + trackID);
}

//descripción: 'Obtiene la cámara con id :webcam_id del circuito con id :track_id', ejemplo: '/api/webcams/42/86'
async function getCameraByTrackIDByCameraID(trackID, cameraID) {
    return downloadJsonFromApi(url + '/webcams/' + trackID + '/runners/' + cameraID);
}
