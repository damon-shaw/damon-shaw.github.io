function FuelDisplay() {
    
    this.textSize = 40;
    this.position = createVector(8*width/9, 5*height/6);
    this.fuel = 100;
    this.nextFillCost = 800;

    this.draw = function() {
        push();
        translate(this.position.x, this.position.y);

        // Draw the next fuel-up cost box
        fill(COLORS.evilGrey);
        rect(-140, 20, 140, 30);

        tint(235, 180);
        image(FuelCanFrame, -138, 21);

        // Draw the next fuel-up cost
        fill(COLORS.scarletRed);
        textSize(20);
        text("$", -115, 42);
        text(this.nextFillCost, -100, 42);

        // Draw the backing for the radial fuel gauge
        fill(COLORS.evilGrey);
        ellipse(0, 0, 100, 100);

        // Draw the fuel, full, and empty labels
        fill(COLORS.laserGreen);
        textSize(20);
        text("FUEL", -20, 40);
        textSize(15);
        text("F", 32, 22);
        text("E", -37, 22);

        // Draw the tick marks
        fill(COLORS.oliveGreen);
        for(var i = -Math.PI/2; i <= Math.PI/2; i = i + Math.PI/10) {
            push();
            rotate(i);
            rect(-1, -40, 2, 5);
            pop();
        }

        // Draw the stem cap
        fill(COLORS.evilGrey);
        stroke(COLORS.laserGreen);
        strokeWeight(1);
        ellipse(0, 0, 24, 24);

        // Draw the stem
        let fuelPercentRotate = Math.PI/2 + Math.PI*(this.fuel / PLAYER_MAX_FUEL);
        fill(COLORS.laserGreen);
        push();
        rotate(fuelPercentRotate);
        triangle(-2, 0, 2, 0, 0, 40);
        pop();


        pop();
    }

    this.isFuelEmpty = function() {
        return this.fuel === 0;
    }

    this.fillFuel = function() {
        this.fuel = 100;
        this.nextFillCost = Math.round(this.nextFillCost * 1.8);
    }

    this.deductFuel = function(amount) {
        this.fuel -= amount;
    }

    this.getNextFillupCost = function() {
        return this.nextFillCost;
    }


}