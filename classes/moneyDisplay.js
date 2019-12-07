function MoneyDisplay() {
    
    this.textSize = 40;
    this.position = createVector(width/20, (7*height/8)+3);
    this.money = 0;

    this.notifiers = [];

    this.draw = function() {
        push();
        translate(this.position.x, this.position.y);

        fill(COLORS.evilGrey);
        rect(0, 0, 80, 30);

        fill(COLORS.laserGreen);
        textSize(20);
        text("$", 5, 22);

        text(this.money, 18, 22);

        this.notifiers.forEach((notifier, index) => {
            fill(notifier.fill + (255 - 255*(notifier.yOffset/40)).toHexString());
            text(
                ((notifier.amount > 0) ? "+" : "-") + "$" + notifier.amount,
                5+cos(notifier.yOffset),
                -notifier.yOffset
            );
            notifier.yOffset += 0.7;

            if(notifier.yOffset > 40)
                this.notifiers.splice(index, 1);
        });


        pop();
    }

    this.addMoney = function(amount) {
        this.money += amount;
        this.notifiers.push({
            amount: amount, 
            yOffset: 0,
            amp: random(0, 10),
            fill: COLORS.laserGreen
        });
    }

    this.deductMoney = function(amount) {
        this.money -= amount;
        this.notifiers.push({
            amount: amount, 
            yOffset: 0,
            amp: random(0, 10),
            fill: COLORS.scarletRed
        });
    }

    this.hasAtleast = function(amount) {
        return this.money >= amount;
    }


}