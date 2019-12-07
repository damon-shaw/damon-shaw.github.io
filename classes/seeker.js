function Seeker(yLine) {

    this.position = createVector(-200, yLine);
    this.velocity = createVector(2, 0);
    this.yLine = yLine;
    this.width = SeekerFrame.width;
    this.height = SeekerFrame.height;

    this.shells = [];

    this.dropShellProb = 0.005;

    /**
     * Draws the tank sprite.
     */
    this.draw = function() {
        image(SeekerFrame, this.position.x, this.position.y);
    };

    this.execute = function() {
        // Randomly decide if a shell should be dropped.
        if(random() < this.dropShellProb && !this.isOutOfFrame()) {
            console.log("Dropping a seeker shell!");
            this.shells.push(
                new SeekerShell(
                    this.position.x + this.width / 2,
                    this.position.y + this.height / 2,
                    4*this.velocity.x
                )
            );
        }
    }

    this.move = function() {
        this.position.x += this.velocity.x;
        this.position.y = 4*sin(0.05*this.position.x) + this.yLine;
    };

    this.hasNoShells = function() {
        return this.shells.length === 0;
    };

    this.isOutOfFrame = function() {
        return this.position.x > width*1.1;
    }

    this.getBounds = function() {
        return {
            xMin: this.position.x,
            xMax: this.position.x + this.width,
            yMin: this.position.y,
            yMax: this.position.y + this.height
        };
    }


}