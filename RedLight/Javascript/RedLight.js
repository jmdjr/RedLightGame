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
    this._assets = [];

    this.initialize = function(game, context) {
        // adding first road chunck, 
        var $this = this;
        var addRoad = function(assets) {
            var index = $this._assets.length;
            var road = game.add.sprite(0, 0, 'assets');
            $this._assets.push(road);

            road.frameName = $this.name;
            road.x = game.width / 2 - road.width / 2;
            road.y = road.height * index;
        }

        addRoad(this._assets);
        addRoad(this._assets);
        addRoad(this._assets);
        addRoad(this._assets);
        addRoad(this._assets);
        var roadHalfWidth = this._assets[0].width / 2;
        var sign = game.add.sprite(game.width / 2 + roadHalfWidth + 30, game.height / 3, 'assets');
        sign.frameName = "LimitSign";
        sign.scale.x = 2;
        sign.scale.y = 2;
        this._assets.push(sign);
        var style = {font: "42px Arial", fill: "#404040", align: "center"};
        var text = game.add.text(sign.x + sign.width / 2, sign.y + sign.height / 2 + 65, this.speedLimit, style);
        text.anchor.set(0.52, 0.5);
        text.scale.x = 2, text.scale.y = 2;
    }
}

// game mechanics
RLG.mechanics = {
    cars: [],
    roads: [],
    
    _aci: 0,    // active car index
    _ari: 0,    // active road index
    
    chooseCar: function(index) {
        
        this._aci = index < 0 || index >= this.cars.length ? 0 : index;
        
        if(index < 0 || index >= this.cars.length) {
            console.error("RLG index out of range exception <RLG.mechancs.chooseCar>");
        }
    },
    
    activeCar: function(){
        return this.cars[this._aci];
    },
    
    chooseRoad: function(index) {

        this._ari = index < 0 || index >= this.roads.length ? 0 : index;
        
        if(index < 0 || index >= this.roads.length) {
            console.error("RLG index out of range exception <RLG.mechancs.chooseCar>");
        }
    },
    
    activeRoad: function(){
        return this.roads[this._ari];
    },
    
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
        this.initialize_JSONFiles(game);
        this.activeRoad().initialize(game);
    },

    initialize_JSONFiles: function(game){
        var JSON = game.cache.getJSON('cars');
        var temp = null;
        for(var c = 0; c < JSON.Cars.length; ++c) {
            temp = JSON.Cars[c];
            this.cars.push(new RLG.car(temp.name, temp.topSpeed, temp.acceleration));
        }

        JSON = game.cache.getJSON('roads');
        for(var c = 0; c < JSON.Roads.length; ++c) {
            temp = JSON.Roads[c]
            this.roads.push(new RLG.road(temp.length, temp.speedLimit, temp.times));
        }
    },

    initializeTouch: function(game, context) {
        game.input.onDown.add(this.onDown, context);
    },

    onDown: function(pointer) {
    },

    onUp: function(pointer) {
        debugger;
    },
    
    update: function(game, context) {

    }
}

window.RLG = RLG;