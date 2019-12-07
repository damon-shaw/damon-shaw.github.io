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
        ultraKill: {
            label: "ULTRA KILL!",
            count: 12,
            drawn: false,
            yOffset: 0,
            sound: UltraKillSound
        },
        monsterKill: {
            label: "MONSTER KILL!",
            count: 15,
            drawn: false,
            yOffset: 0,
            sound: MonsterKillSound
        },
        killtacular: {
            label: "KILL-TACULAR!!",
            count: 25,
            drawn: false,
            yOffset: 0,
            sound: KillatacularSound
        },
        killtastrophe: {
            label: "KILL-TASTROPHE!!",
            count: 35,
            drawn: false,
            yOffset: 0,
            sound: KilltastropheSound
        },
        killionaire: {
            label: "KILL-IONAIRE!!",
            count: 50,
            drawn: false,
            yOffset: 0,
            sound: KillionaireSound
        },
        holyShit: {
            label: "HOLY SHIT!!!",
            count: 75,
            drawn: false,
            yOffset: 0,
            sound: HolyShitSound
        }
    };

    this.draw = function() {
        let yPos = 40;
        textFont(OceanRush);
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
        textFont(LadyRadical);
        for(let descriptor of Object.values(this.descriptors)) {
            if(this.comboValue < descriptor.count) break;
            if(descriptor.yOffset > 40) continue;
            
            text(
                descriptor.label,
                width - (0.8 * this.descriptorTextSize * descriptor.label.length),
                yPos + descriptor.yOffset + 25
            );
            descriptor.yOffset += 0.5;


            if(!descriptor.drawn) {
                descriptor.sound.play();
                descriptor.drawn = true;
            }
        }
        textFont(ShareTechMono);
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

    this.getCombo = function() {
        return this.comboValue;
    }


}