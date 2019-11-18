function ExplosionAnimation(xPos, yPos) {
    this.position = createVector(xPos, yPos);

    this.frames = [
        ExplosionFrame0, ExplosionFrame1, ExplosionFrame2,
        ExplosionFrame3, ExplosionFrame4, ExplosionFrame5,
        ExplosionFrame6, ExplosionFrame7
    ];


    this.frame = 0;

    this.draw = function() {
        if(this.isDone()) return;

        imageMode(CENTER);

        let frame = this.frames[this.frame];
        image(
            frame,
            this.position.x,
            this.position.y
        );

        imageMode(CORNER);

        if(frameCount % 5 === 0)
            this.frame++;

    }

    this.isDone = function() {
        return this.frame >= this.frames.length;
    }
}