function ExplosionAnimation(xPos, yPos) {
    this.position = createVector(xPos, yPos);

    this.frame0 = ExplosionFrame0;

    this.frame = 0;

    this.draw = function() {
        switch(this.frame) {
            case 0:
                image(this.frame0, this.position.x, this.position.y);
            break;
            case 1:
                // Do nothing.
            break;
            case 2:
                image(this.frame0, this.position.x, this.position.y);
            break;
            case 3:
                // Do nothing.
            break;
            case 4:
                image(this.frame0, this.position.x, this.position.y);
            break;
            case 5:
                // Do nothing.
            break;
            default:
                // Draw nothing.
            break;
        }

        this.frame++;
    }

    this.isDone = function() {
        return this.frame >= 6;
    }
}