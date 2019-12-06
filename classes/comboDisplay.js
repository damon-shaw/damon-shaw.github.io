function ComboDisplay() {
    
    this.textSize = 30
    this.position = createVector(width - this.textSize * 10, 40);
    this.comboValue = 0;

    this.draw = function() {
        //fill(COLORS.bloodRed);
        text(`${this.comboValue} COMBO`, width - this.textSize*10, 40);
        //textFont(ShareTechMono);
    }

    this.incrementCombo = function() {
        this.comboValue++;
    }

    this.resetCombo = function() {
        this.comboValue = 0;
    }


}