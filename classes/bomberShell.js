function BomberShell(xPos, yPos, xVelocity) {

    this.image = BomberShellBase;
    this.width = BomberFrame0.width;
    this.height = BomberFrame0.height;

    this.position = createVector(xPos, yPos);
    this.velocity = createVector(xVelocity, 0);

    this.init = function() {

    };

    /**
     * Draws the tank sprite.
     */
    this.draw = function() {
        push();
        translate(
            this.position.x,
            this.position.y
        );
        rotate(-0.2 * this.velocity.x);
        image(
            this.image, 0, 0
        );
        pop();
    };

    this.move = function() {
        this.velocity.add(SLOW_GRAVITY_VECTOR);
        this.position.add(this.velocity);

        this.velocity.x = BOMBER_SHELL_VELOCITY_RETENTION*this.velocity.x;
    };

    this.getBounds = function() {
        return {
            xMin: this.position.x,
            xMax: this.position.x + this.width,
            yMin: this.position.y,
            yMax: this.position.y + this.height
        }
    }
}