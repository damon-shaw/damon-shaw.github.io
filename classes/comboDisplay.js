function ComboDisplay() {
    
    this.textSize = 30
    this.position = createVector(width - this.textSize * 10, 40);
    this.comboValue = 0;

    this.draw = function(yPos) {
        fill(COLORS.bloodRed);
        text(
            `${this.comboValue} COMBO`,
            width - (this.textSize * 
                (`${this.comboValue}`.length + 6)) + 
                ((this.comboValue / 8) * cos(frameCount * Math.PI)),
            yPos
        );
    }

    this.incrementCombo = function() {
        this.comboValue++;
    }

    this.resetCombo = function() {
        this.comboValue = 0;
    }


}