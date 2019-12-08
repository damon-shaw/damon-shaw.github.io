function ProgressDisplay() {
    
    this.textSize = 40;
    this.position = createVector(width/20, 39/40*height);
    this.width = (7/8)*width;
    this.height = height/40;

    this.delta = 0;
    this.currentProgress = 0;
    this.smoothProgress = 0;
    this.maxProgress = 7;

    this.transitionRemainingFrames = 60;

    this.easeInOutCubic = function(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    }

    this.draw = function() {
        fill(COLORS.evilGrey);
        rect(this.position.x, this.position.y, this.width, this.height);

        console.log(this.currentProgress);

        if(this.smoothProgress < this.currentProgress) {
            if(this.delta === 0) {
                this.delta = this.currentProgress - this.smoothProgress;
                this.transitionRemainingFrames = 60;
            }
            this.smoothProgress = 
                this.currentProgress - this.delta
                + this.delta * this.easeInOutCubic((60 - this.transitionRemainingFrames) / 60);
            
            if(this.transitionRemainingFrames > 0)
                this.transitionRemainingFrames--;
        }
        else {
            this.delta = 0;
        }
        //console.log(this.smoothProgress);

        fill(COLORS.laserGreen);
        rect(
            this.position.x + 2,
            this.position.y + 2,
            ((this.width - 4) / this.maxProgress) * this.smoothProgress,
            this.height - 4
        );
    }

    this.incrementProgress = function() {
        this.currentProgress++;
    }



}