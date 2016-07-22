//red light game parts...
// three main objects: the car, the road, the game logic...

var RLG = RLG || {}; 

RLG.car = function(finalspeed, direction, acceleration) {
    this.finalSpeed = finalspeed;
    this.direction = direction;
    this.acceleration = acceleration;
}

RLG.road = function() {
    this.length = null;
    this.speedLimit = null;
    
    this.currentSignal = "red";

    this.signalTimes = {
        red: null,      // time red stays active
        yellow: null,   // time yellow stays active
        green: null    // time green stays active
    }

    this.activateSignal = function() {
        
    }
}

// game mechanics
RLG.mechanics = {
}