function ComboDisplay() {
    
    this.textSize = 40;
    this.position = createVector(width - this.textSize * 10, 40);
    this.comboValue = 0;
    this.descriptors = [];
    this.descriptorTextSize = 20;

    this.descriptors = {
        doubleKill: {
            label: "DOUBLE KILL",
            count: 2,
            drawn: false,
            yOffset: 0
        },
        quadraKill: {
            label: "QUADRA KILL",
            count: 4,
            drawn: false,
            yOffset: 0
        },
        superKill: {
            label: "SUPER KILL!",
            count: 8,
            drawn: false,
            yOffset: 0
        },
        killtacular: {
            label: "KILL-TACULAR!",
            count: 10,
            drawn: false,
            yOffset: 0
        },
        ultraKill: {
            label: "ULTRA KILL!!",
            count: 15,
            drawn: false,
            yOffset: 0
        },
        holyShit: {
            label: "HOLY SHIT!!!",
            count: 20,
            drawn: false,
            yOffset: 0
        }
    };

    this.draw = function(yPos) {
        fill(COLORS.bloodRed);
        textSize(this.textSize);
        text(
            `${this.comboValue} COMBO`,
            width - (0.8 * this.textSize * 
                (`${this.comboValue}`.length + 6)) + 
                ((this.comboValue / 8) * cos(frameCount * Math.PI)),
            yPos
        );

        textSize(this.descriptorTextSize);
        for(let descriptor of Object.values(this.descriptors)) {
            if(this.comboValue < descriptor.count) break;
            if(descriptor.yOffset > 40) continue;

            text(
                descriptor.label,
                width - (this.descriptorTextSize * descriptor.label.length),
                yPos + descriptor.yOffset + 10
            );
            descriptor.yOffset += 0.5;
        }
    }

    this.incrementCombo = function() {
        this.comboValue++;
    }

    this.resetCombo = function() {
        this.comboValue = 0;
        Object.keys(this.descriptors).forEach(descriptor => {
            this.descriptors[descriptor].drawn = false;
            this.descriptors[descriptor].yOffset = 0;
        });
    }


}