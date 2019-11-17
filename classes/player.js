function Player(xPos, yPos) {

    this.baseCopy = TankSpriteBase;
    this.wheelCopy = TankSpriteWheel;
    this.baseWidth = TankSpriteBase.width;
    this.baseHeight = TankSpriteBase.height;

    this.wheelWidth = TankSpriteWheel.width;
    this.wheelHeight = TankSpriteWheel.height;

    this.inited = false;

    this.wheelAngle = 0;

    this.motionAngle = 0;

    this.acceleration = createVector(0, 1);
    this.velocity = createVector(0, 0);
    this.position = createVector(xPos, yPos);

    this.launched = false;

    this.init = function() {
        this.movementSpeed = 1;
        this.forwardMovementVector = createVector(this.movementSpeed, 0);
        this.backwardMovementVector = createVector(-this.movementSpeed, 0);
        this.gravityVector = createVector(0, 0.5);
        this.acceleration.set(this.gravityVector);
        this.grounded = true;
    };

    this.move = function() {
        if(this.position.y < MAX_PLAYER_Y_POS)
            this.grounded = false;

        if(keyIsDown(A_KEY)) { // If the A key is pressed
            // if(this.acceleration.x > 0) {
            //     this.acceleration.add(this.backwardMovementVector.x * 3, 0);
            //     this.acceleration.limit(0.4, 0.2);
            // }
            // else
                this.acceleration.add(this.backwardMovementVector.x, 0)
        }
        if(keyIsDown(D_KEY)) // If the D key is pressed
            this.acceleration.add(this.forwardMovementVector);
        if((keyIsDown(W_KEY) && this.grounded) || this.launched) {
            if(this.grounded) this.grounded = false;
            else if(this.launched) this.launched = false;

            this.velocity.y = -20;            
        }
        if(!keyIsDown(A_KEY) && !keyIsDown(D_KEY)) // No movement keys are pressed.
            this.acceleration.x = -0.08*this.velocity.x;

        this.acceleration.limit(1, 5);

        this.velocity.add(this.acceleration);
        if(!this.grounded)
            this.velocity.add(this.gravityVector);
        this.position.add(this.velocity);

        if(this.position.y > MAX_PLAYER_Y_POS) {
            this.position.y = MAX_PLAYER_Y_POS;
            this.grounded = true;
            if(this.velocity.y > 0) {
                this.velocity.y = -0.5*this.velocity.y;
            }
        }

        if(this.position.x > width - this.baseWidth) {
            this.position.x = width - this.baseWidth;
            this.velocity.x = 0;
        }

        if(this.position.x < 0) {
            this.position.x = 0;
            this.velocity.x = 0;
        }
    };

    /**
     * Draws the tank sprite.
     */
    this.draw = function() {
        if(!this.inited) {
            this.init();
            this.inited = true;
        }

        // push();
        // translate(0, -this.position.y);

        push();
        translate(this.position.x + this.baseWidth/2, this.position.y + this.baseHeight/2);
        rotate(-PLAYER_VEL_ROT_RATIO * this.velocity.x);
        imageMode(CENTER);
        image(
            this.baseCopy,
            0, 0
            // this.position.x,
            // this.position.y - (3 * abs(sin(0.1*this.wheelAngle)))
        );
        pop();

        push()
        translate(
            this.position.x + (0.08 * this.baseWidth) + this.wheelWidth / 2,
            this.position.y + (0.58 * this.baseHeight) + this.wheelHeight / 2
        );
        rotate(this.wheelAngle);
        image(
            this.wheelCopy, -this.wheelWidth / 2, -this.wheelHeight / 2
        );
        pop();

        push()
        translate(
            this.position.x + (0.27 * this.baseWidth) + this.wheelWidth / 2,
            this.position.y + (0.58 * this.baseHeight) + this.wheelHeight / 2
        );
        rotate(this.wheelAngle);
        image(
            this.wheelCopy, -this.wheelWidth / 2, -this.wheelHeight / 2
        );
        pop();

        push()
        translate(
            this.position.x + (0.46 * this.baseWidth) + this.wheelWidth / 2,
            this.position.y + (0.58 * this.baseHeight) + this.wheelHeight / 2
        );
        rotate(this.wheelAngle);
        image(
            this.wheelCopy, -this.wheelWidth / 2, -this.wheelHeight / 2
        );
        pop();

        push()
        translate(
            this.position.x + (0.65 * this.baseWidth) + this.wheelWidth / 2,
            this.position.y + (0.58 * this.baseHeight) + this.wheelHeight / 2
        );
        rotate(this.wheelAngle);
        image(
            this.wheelCopy, -this.wheelWidth / 2, -this.wheelHeight / 2
        );
        pop();

        // pop();

        this.wheelAngle += 1;
    };

    /**
     * Returns the bounds of the player character.
     */
    this.getBounds = function() {
        return {
            xMin: this.position.x,
            xMax: this.position.x + this.baseWidth,
            yMin: this.position.y,
            yMax: this.position.y + this.baseHeight
        };
    }

    this.launch = function() {
        this.launched = true;
    }
}