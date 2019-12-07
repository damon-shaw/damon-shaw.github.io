function SeekerShell(xPos, yPos, xVelocity) {

    this.image = SeekerShellFrame0;
    this.width = SeekerShellFrame0.width;
    this.height = SeekerShellFrame0.height;

    this.position = createVector(xPos, yPos);
    this.velocity = createVector(xVelocity, 0);
    this.heading = 0;

    this.frame = 0;

    this.ttl = SEEKER_SHELL_FTL;

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
        rotate(this.heading);
        switch(this.frame) {
            case 0:
                image(SeekerShellFrame0, 0, 0);
            break;
            case 1:
                image(SeekerShellFrame1, 0, 0);
            break;
            case 2:
                image(SeekerShellFrame2, 0, 0);
            break;
            case 3:
                image(SeekerShellFrame3, 0, 0);
            break;
            case 4:
                image(SeekerShellFrame2, 0, 0);
            break;
            case 5:
                image(SeekerShellFrame1, 0, 0);
            break;
        }
        this.frame = (this.frame === 5) ? 0 : this.frame + 1;

        pop();
    };

    this.move = function(playerPosition) {
        let headingVec = createVector(
            playerPosition.x - this.position.x,
            playerPosition.y - this.position.y
        );
        headingVec.normalize();

        this.heading = headingVec.heading() - Math.PI;

        this.position.x += SEEKER_SHELL_STEP_SIZE*headingVec.x;
        this.position.y += SEEKER_SHELL_STEP_SIZE*headingVec.y;

        this.ttl--;
    };

    this.isDone = function() {
        return (this.ttl <= 0);
    }

    this.getBounds = function() {
        return {
            xMin: this.position.x,
            xMax: this.position.x + this.width,
            yMin: this.position.y,
            yMax: this.position.y + this.height
        }
    }
}