function TankWheelSprite(xPos, yPos) {

    this.x = xPos;
    this.y = yPos;

    this.wheelCopy = TankSpriteWheel;
    this.wheelWidth = TankSpriteWheel.width;
    this.wheelHeight = TankSpriteWheel.height;

    this.angle = 0;

    this.draw = function() {
        push()
        translate(
            this.x + this.wheelWidth / 2,
            this.y + this.wheelHeight / 2
        );
        rotate(this.angle);
        image(
            this.wheelCopy, -this.wheelWidth / 2, -this.wheelHeight / 2
        );
        pop();
    }

    this.spin = function() {
        this.angle += 1;
    }

    this.getBounds = function() {
        return {
            xMin: this.x,
            xMax: this.x + this.wheelWidth,
            yMin: this.y,
            yMax: this.y + this.wheelHeight
        }
    }

    this.isInBounds = function(x, y) {
        let myBounds = this.getBounds();
        if(x >= myBounds.xMin && x <= myBounds.xMax)
            if(y >= myBounds.yMin && y <= myBounds.yMax)
                return true;

        return false;
    }
}