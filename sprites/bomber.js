function BomberSprite(yLine) {

    this.x = random(0, 400);
    this.y = 20*sin(0.1*this.x) + yLine;
    this.yLine = yLine;
    this.baseCopy = TankSpriteBase;
    this.wheelCopy = TankSpriteWheel;
    this.baseWidth = BomberFrame0.width;
    this.baseHeight = BomberFrame0.height;

    this.frame = "bomber0";

    this.motionAngle = 0;

    this.init = function() {
        // this.baseCopy.resize(TankSpriteBase.width * scale, TankSpriteBase.height * scale);
        // this.wheelCopy.resize(TankSpriteWheel.width * scale, TankSpriteWheel.height * scale);
    };

    /**
     * Draws the tank sprite.
     */
    this.draw = function() {

        switch(this.frame) {
            case "bomber0":
                image(BomberFrame0, this.x, this.y);
                this.frame = "bomber1";
            break;
            case "bomber1":
                image(BomberFrame1, this.x, this.y - this.baseHeight * 0.17);
                this.frame = "bomber2";
            break;
            case "bomber2":
                image(BomberFrame2, this.x, this.y - this.baseHeight * 0.42);
                this.frame = "bomber3";
            break;
            case "bomber3":
                image(BomberFrame3, this.x, this.y - this.baseHeight * 0.45);
                this.frame = "bomber4";
            break;
            case "bomber4":
                image(BomberFrame4, this.x, this.y - this.baseHeight * 0.17);
                this.frame = "bomber0";
            break;
        }

    };

    this.move = function() {
        this.x += 1;
        this.y = 20*sin(0.05*this.x) + this.yLine;

        if(this.x > 400)
            this.x = -100;
    };


}