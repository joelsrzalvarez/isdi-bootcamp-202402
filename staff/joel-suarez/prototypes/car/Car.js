function Car(brand, model, year, color, doors, fuelType, transmission, gears) {
    this.brand = brand;
    this.model = model;
    this.status = 'off';
    this.deposit = 0;
    this.year = year;
    this.color = color;
    this.doors = doors;
    this.fuelType = fuelType;
    this.transmission = transmission;
    this.gears = gears;
    this.gear = 0;
    this.speed = 0;
    this.acceleration = 0;
    this.direction = '';
    this.steering = 0;

    this.fuel = function (amount) {
        this.deposit = amount;
    };

    this.start = function () {
        this.status = 'on';
    };

    this.stop = function () {
        this.status = 'off';
    };

    this.changeGear = function (gear) {
        if (gear > this.gears || gear < -1) {
            throw new RangeError('gear greater than ' + this.gears);
        }
        this.gear = gear;
    };

    this.speedUp = function (acceleration) {
        this.acceleration = acceleration;
        if (this.gear === 1) {
            this.direction = 'forward';
        }
        else if (this.gear === -1) {
            this.direction = 'backward';
        }
    };

    this.changeSteering = function (angle) {
        this.steering = angle;
        if (this.acceleration > 0 && this.gear === 1) {
            this.direction = 'forward-right';
        }
        else if (this.acceleration > 0 && this.gear === -1) {
            this.direction = 'backward-left';
        }
    };
}

module.exports = Car;
