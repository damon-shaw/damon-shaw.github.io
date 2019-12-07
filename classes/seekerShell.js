function SeekerShell(xPos, yPos) {

    this.image = SeekerShellFrame0;
    this.width = SeekerShellFrame0.width;
    this.height = SeekerShellFrame0.height;

    this.position = createVector(xPos, yPos);
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
        imageMode(CORNER);
        switch(this.frame) {
            case 0:
                image(SeekerShellFrame0, -0.5*this.width, -0.5*this.height);
            break;
            case 1:
                image(SeekerShellFrame1, -0.5*this.width, -0.5*this.height);
            break;
            case 2:
                image(SeekerShellFrame2, -0.5*this.width, -0.51*this.height);
            break;
            case 3:
                image(SeekerShellFrame3, -0.58*this.width, -0.552*this.height);
            break;
            case 4:
                image(SeekerShellFrame2, -0.5*this.width, -0.51*this.height);
            break;
            case 5:
                image(SeekerShellFrame1, -0.5*this.width, -0.5*this.height);
            break;
        }
        this.frame = (this.frame === 5) ? 0 : this.frame + 1;

        pop();
    };

    this.move = function(xPlayer, yPlayer) {
        let headingVec = createVector(
            xPlayer - this.position.x,
            yPlayer - this.position.y
        );
        headingVec.normalize();

        this.heading = headingVec.heading() - Math.PI / 2;

        this.position.x += SEEKER_SHELL_STEP_SIZE*headingVec.x;
        this.position.y += SEEKER_SHELL_STEP_SIZE*headingVec.y;

        this.ttl--;
    };

    this.isDone = function() {
        return (this.ttl <= 0);
    }

    this.getMidpoint = function() {
        return createVector(
            this.position.x + (this.width / 2),
            this.position.y + (this.height / 2)
        );
    }

    this.getBounds = function() {

        let boundingWidth = (this.width) * (1 + abs(sin(this.heading)));
        let boundingHeight = (this.height) * (abs(cos(this.heading)));

        return {
            xMin: this.position.x - boundingWidth / 2,
            xMax: this.position.x + boundingWidth / 2,
            yMin: this.position.y - boundingHeight / 2,
            yMax: this.position.y + boundingHeight / 2
        };
    }
}