function TankSprite(xPos, yPos) {

    this.x = xPos;
    this.y = yPos;
    this.baseCopy = TankSpriteBase;
    this.wheelCopy = TankSpriteWheel;
    this.baseWidth = TankSpriteBase.width;
    this.baseHeight = TankSpriteBase.height;

    this.wheelWidth = TankSpriteWheel.width;
    this.wheelHeight = TankSpriteWheel.height;

    this.inited = false;

    this.wheelAngle = 0;

    this.motionAngle = 0;

    this.init = function() {
        // this.baseCopy.resize(TankSpriteBase.width * scale, TankSpriteBase.height * scale);
        // this.wheelCopy.resize(TankSpriteWheel.width * scale, TankSpriteWheel.height * scale);
    };

    /**
     * Draws the tank sprite.
     */
    this.draw = function() {
        if(!this.inited) {
            this.init();
        }

        image(this.baseCopy, this.x, this.y - (3 * abs(sin(0.1*this.wheelAngle))));

        push()
        translate(
            this.x + (0.08 * this.baseWidth) + this.wheelWidth / 2,
            this.y + (0.58 * this.baseHeight) + this.wheelHeight / 2
        );
        rotate(this.wheelAngle);
        image(
            this.wheelCopy, -this.wheelWidth / 2, -this.wheelHeight / 2
        );
        pop();

        push()
        translate(
            this.x + (0.27 * this.baseWidth) + this.wheelWidth / 2,
            this.y + (0.58 * this.baseHeight) + this.wheelHeight / 2
        );
        rotate(this.wheelAngle);
        image(
            this.wheelCopy, -this.wheelWidth / 2, -this.wheelHeight / 2
        );
        pop();

        push()
        translate(
            this.x + (0.46 * this.baseWidth) + this.wheelWidth / 2,
            this.y + (0.58 * this.baseHeight) + this.wheelHeight / 2
        );
        rotate(this.wheelAngle);
        image(
            this.wheelCopy, -this.wheelWidth / 2, -this.wheelHeight / 2
        );
        pop();

        push()
        translate(
            this.x + (0.65 * this.baseWidth) + this.wheelWidth / 2,
            this.y + (0.58 * this.baseHeight) + this.wheelHeight / 2
        );
        rotate(this.wheelAngle);
        image(
            this.wheelCopy, -this.wheelWidth / 2, -this.wheelHeight / 2
        );
        pop();

        this.wheelAngle += 1;
    };

    this.move = function() {
        this.x = 350 + 300*sin(0.02*this.motionAngle);

        this.motionAngle += 1;
    };

    this.getBounds = function() {
        return {
            xMin: this.x,
            xMax: this.x + this.baseWidth,
            yMin: this.y,
            yMax: this.y + this.baseHeight
        };
    }

}