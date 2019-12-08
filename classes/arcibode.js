function Arcibode(xLine) {

    this.position = createVector(xLine, 300, 100);
    this.xLine = xLine;
    this.width = ArcibodeFrame0.width;
    this.height = ArcibodeFrame0.height;

    this.frame = 0;

    /**
     * Draws the tank sprite.
     */
    this.draw = function() {
        console.log(ArcibodeFrames);

        let scale = Math.trunc((100 - this.position.z) / 5);
        imageMode(CENTER);
        //console.log(scale);
        switch(this.frame) {
            case 0:
                image(ArcibodeFrames.zero[scale], this.position.x, this.position.y);
            break;
            case 1:
                image(ArcibodeFrames.one[scale], this.position.x, this.position.y);
            break;
            case 2:
                image(ArcibodeFrames.two[scale], this.position.x, this.position.y);
            break;
            case 3:
                image(ArcibodeFrames.three[scale], this.position.x, this.position.y);
            break;
            case 4:
                image(ArcibodeFrames.four[scale], this.position.x, this.position.y);
            break;
            case 5:
                image(ArcibodeFrames.five[scale], this.position.x, this.position.y);
            break;
            case 6:
                image(ArcibodeFrames.six[scale], this.position.x, this.position.y);
            break;
            case 7:
                image(ArcibodeFrames.seven[scale], this.position.x, this.position.y);
            break;
        }
        imageMode(CORNER);

        this.frame = (frameCount % 3 === 0) ? this.frame + 1 : this.frame;

        if(this.frame >= 8)
            this.frame = 0;
    };

    this.execute = function() {

    }

    this.move = function() {
        this.position.y += 0.4;
        this.position.z -= 0.8;

        if(this.position.z <= 0) this.position.z = 1;
    };

    this.getBombs = function() {
        return this.bombs;
    }

    this.isClose = function() {
        return this.position.z < 20;
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