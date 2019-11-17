function Bomber(yLine) {

    this.position = createVector(-200, yLine);
    this.velocity = createVector(2, 0);
    this.yLine = yLine;
    this.width = BomberFrame0.width;
    this.height = BomberFrame0.height;

    this.frame = "bomber0";

    this.shells = [];

    this.dropShellProb = 0.005;

    /**
     * Draws the tank sprite.
     */
    this.draw = function() {

        switch(this.frame) {
            case "bomber0":
                image(BomberFrame0, this.position.x, this.position.y);
                this.frame = "bomber1";
            break;
            case "bomber1":
                image(BomberFrame1, this.position.x, this.position.y - this.height * 0.17);
                this.frame = "bomber2";
            break;
            case "bomber2":
                image(BomberFrame2, this.position.x, this.position.y - this.height * 0.42);
                this.frame = "bomber3";
            break;
            case "bomber3":
                image(BomberFrame3, this.position.x, this.position.y - this.height * 0.45);
                this.frame = "bomber4";
            break;
            case "bomber4":
                image(BomberFrame4, this.position.x, this.position.y - this.height * 0.17);
                this.frame = "bomber0";
            break;
        }

    };

    this.execute = function() {
        // Randomly decide if a shell should be dropped.
        if(random() < this.dropShellProb) {
            console.log("Dropping a shell!");
            this.shells.push(
                new BomberShell(
                    this.position.x + this.width / 2,
                    this.position.y + this.height / 2,
                    4*this.velocity.x
                )
            );
        }
    }

    this.move = function() {
        this.position.x += this.velocity.x;
        this.position.y = 20*sin(0.05*this.position.x) + this.yLine;
    };

    this.getBombs = function() {
        return this.bombs;
    }

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