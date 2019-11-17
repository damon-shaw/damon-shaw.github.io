function Mountain(xInc, yMin, yMax, color) {

    this.xinc = xInc;
    this.ymin = yMin;
    this.ymax = yMax;
    this.color = color;
    this.points = [];
    this.xstart = random(0, 5);

    this.generatePoints = function() {
        this.points = [];

        let xoff = this.xstart;
        for (let x = 0; x < width + 1; x++) {
            this.points[x] = map(noise(xoff), 0, 1, this.ymin, this.ymax);
            xoff += this.xinc;
        }
    }

    this.move = function() {
        this.xstart += 0.02;
    }

    this.draw = function() {
        this.generatePoints();

        fill(this.color);
        beginShape();
        for (let x = 0; x < width + 1; x++){
            vertex(x, this.points[x]);
        }
        vertex(width, height);
        vertex(0, height);

        endShape(CLOSE);
        //fill('white');
    }
}