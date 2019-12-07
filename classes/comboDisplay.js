function ComboDisplay() {
    
    this.textSize = 40;
    this.position = createVector(width - this.textSize * 10, 40);
    this.comboValue = 0;
    this.descriptors = [];
    this.descriptorTextSize = 30;

    this.descriptors = {
        doubleKill: {
            label: "double kill",
            count: 2,
            drawn: false,
            yOffset: 0,
            sound: DoubleKillSound
        },
        quadraKill: {
            label: "quadra kill",
            count: 4,
            drawn: false,
            yOffset: 0,
            sound: QuadraKillSound
        },
        superKill: {
            label: "super kill!",
            count: 8,
            drawn: false,
            yOffset: 0,
            sound: SuperKillSound
        },
        killtacular: {
            label: "KILL-TACULAR!",
            count: 10,
            drawn: false,
            yOffset: 0,
            sound: KillatacularSound
        },
        ultraKill: {
            label: "ULTRA KILL!!",
            count: 15,
            drawn: false,
            yOffset: 0,
            sound: UltraKillSound
        },
        holyShit: {
            label: "HOLY SHIT!!!",
            count: 20,
            drawn: false,
            yOffset: 0,
            sound: HolyShitSound
        }
    };

    this.draw = function(yPos) {
        fill(COLORS.bloodRed);
        textSize(this.textSize);
        text(
            `${this.comboValue} combo_`,
            width 
                - (0.8 * this.textSize * (`${this.comboValue}`.length + 6))
                + (this.comboValue * COMBO_X_SHAKE) * cos(frameCount * COMBO_X_FREQ)
            ,
            yPos + (this.comboValue * COMBO_Y_SHAKE) * sin(frameCount * COMBO_Y_FREQ)
        );

        textSize(this.descriptorTextSize);
        for(let descriptor of Object.values(this.descriptors)) {
            if(this.comboValue < descriptor.count) break;
            if(descriptor.yOffset > 40) continue;
            
            textFont(LadyRadical);
            text(
                descriptor.label,
                width - (0.8 * this.descriptorTextSize * descriptor.label.length),
                yPos + descriptor.yOffset + 25
            );
            descriptor.yOffset += 0.5;
            textFont(OceanRush);

            if(!descriptor.drawn) {
                descriptor.sound.play();
                descriptor.drawn = true;
            }
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