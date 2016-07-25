//red light game parts...
// three main objects: the car, the road, the game logic...

var RLG = RLG || {}; 

RLG.car = function(name, topSpeed, acceleration) {
    this.name = name;
    this.topSpeed = topSpeed;
    this.acceleration = acceleration; 

    this.currentSpeed = null;
    this.isAccelerating = false;
    var clock = 0;

    this.preload = function(game) {

    }

    this.startAcceleration = function(time) {
        clock = time;
        this.isAccelerating = true;
    }

    this.continueAcceleration = function(time) {
        if(this.isAccelerating) {
            var change = time - clock;
            this.currentSpeed = Math.round(change * this.acceleration);
            this.currentSpeed = this.currentSpeed > this.topSpeed ? this.topSpeed : this.currentSpeed;
        }
    }

    this.endAcceleration = function(time) {
        this.isAccelerating = false;
        clock = 0;
    }
}


RLG.signal = function(redTime, yellowTime, greenTime) {
    this.currentSignal = "green";

    this.signalTimes = {
        red: redTime,      // time red stays active
        yellow: yellowTime,   // time yellow stays active
        green: greenTime    // time green stays active
    }
    var clock = 0;

    this.activateSignal = function(time) {
        clock += time;
    }
}

RLG.road = function(length, speedLimit, times) {
    this.length = length;
    this.speedLimit = speedLimit;
    this.signal = new RLG.signal(times.red, times.yellow, times.green);
    this.name = "Road";
}

// game mechanics
RLG.mechanics = {
    cars: [],
    roads: [],

    defintionFiles: {
        cars: "Content/Definitions/CarTypes.json",
        roads: "Content/Definitions/RoadLevels.json"
    },
    
    preload: function(game, context) {
        game.load.json('cars', this.defintionFiles.cars);
        game.load.json('roads', this.defintionFiles.roads);
        game.load.atlas('assets', 'Content/assets.png', 'Content/assets.json');
    },

    initialize: function(game, context) {
        this.initializeTouch(game, context);
        var JSON = game.cache.getJSON('cars');

        for(var c = 0; c < JSON.Cars.length; ++c) {
            var temp = JSON.Cars[c];
            this.cars.push(new RLG.car(temp.name, temp.topSpeed, temp.acceleration));
        }

        JSON = game.cache.getJSON('roads');
        for(var c = 0; c < JSON.Roads.length; ++c) {
            var temp = JSON.Roads[c];
            this.roads.push(new RLG.road(temp.length, temp.speedLimit, temp.times));
        }

        var test = game.add.sprite(64, 64, 'assets');
        test.frameName = this.roads[0].name;
    },

    initializeTouch: function(game, context) {
        game.input.onDown.add(this.onDown, context);
    },

    onDown: function(pointer) {
        debugger;
    },

    onUp: function(pointer) {
        debugger;
    },
    
    update: function(game, context) {

    }
}

window.RLG = RLG;