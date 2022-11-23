class Checkpoint {
    constructor(runner_id, coordinate, timestamp) {
        this.runner_id = runner_id;
        this.coordinate = coordinate;
        this.timestamp = timestamp;
    }
}

class Coordinate {
    constructor(lat, lon) {
        this.lat = lat;
        this.lon = lon;
    }
}

class Record {
    constructor(runner_id, checkpoints) {
        this.runner_id = runner_id;
        this.checkpoint = checkpoint;
    }
}

class Position {
    constructor(track_id, records) {
        this.track_id = track_id;
        this.records = records;
    }
}

class Runner {
    constructor(id, name, sponsor) {
        this.id = id;
        this.name = name;
        this.sponsor = sponsor;
    }
}