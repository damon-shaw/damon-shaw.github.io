function PreGameObj() {

    this.state = "start";
    this.inited = false;
    this.transitionToGame = false;

    this.init = function() {
        this.transitionToGame = false;
        this.myTank = new TankSprite(50, 340);

        this.playSelector = new TankWheelSprite(220, 150, 4);
        this.howToPlaySelector = new TankWheelSprite(220, 200, 10);

        this.toStartSelector = new TankWheelSprite(190, 330);

        this.inited = true;

        this.mountains = [
            new Mountain(0.020, 105, 290, COLORS.evilGrey),
            new Mountain(0.011, 120, 290, COLORS.highPeakGrey),
            new Mountain(0.009, 135, 290, COLORS.sageGreen),
            new Mountain(0.009, 130, 310, COLORS.oliveGreen),
            new Mountain(0.009, 160, 320, COLORS.armyGreen),
            new Mountain(0.004, 305, 320, COLORS.seaweedGreen),
            new Mountain(0.004, 365, 375, COLORS.dirt)
        ];

        this.bombers = [
            new BomberSprite(40)
        ];

        this.seekers = [
            new Seeker()
        ];

        this.explosions = [
            // new ExplosionAnimation(100, 100)
        ];

        this.arcibode = new Arcibode(100);
    };

    this.reset = function() {
        this.init();
    }

    this.draw = function() {

        if(!this.inited) {
            this.init();
        }

        switch(this.state) {
            case "start":
                this.drawBackdrop();
                this.stepNPCs();
                this.drawStart();
            break;

            case "howToPlay":
                this.drawBackdrop();
                this.stepNPCs();
                this.drawHowToPlay();
            break;

            case "hiScores":
                this.drawHiScores();
            break;
        };

        
    };

    this.execute = function() {
        //this.arcibode.move();

        if(random() < 0.005) {
            this.bombers.push(new BomberSprite(random(100, 250)));
        }
        if(random() < 0.005) {
            this.seekers.push(new Seeker());
        }

        this.bombers.forEach((bomber, index) => {
            if(bomber.isOutOfFrame())
                this.bombers.splice(index, 1);
            
            bomber.shells.forEach((shell, shellIdx) => {
                if(Collider.areColliding(this.myTank, shell)) {
                    this.explosions.push(
                        new ExplosionAnimation(
                            (shell.position.x + this.myTank.x) / 2,
                            (shell.position.y + this.myTank.y) / 2
                        )
                    );
                    bomber.shells.splice(shellIdx, 1);
                }
            })
        });

        this.seekers.forEach((seeker, seekerIdx) => {

            seeker.shells.forEach((shell, index) => {
                if(Collider.areColliding(this.myTank, shell)) {
                    console.log("Player is colliding with a seeker shell!");
                    this.explosions.push(
                        new ExplosionAnimation(
                            (this.myTank.getMidpoint().x + shell.getMidpoint().x) / 2,
                            (this.myTank.getMidpoint().y + shell.getMidpoint().y) / 2
                        )
                    );
                    seeker.shells.splice(index, 1);
                }
            });


            seeker.shells.forEach((shell, index) => {
                if(shell.isDone()) {
                    this.explosions.push(
                        new ExplosionAnimation(
                            shell.position.x,
                            shell.position.y
                        )
                    );
                    seeker.shells.splice(index, 1);
                }
            });

            if(seeker.isOutOfFrame() && seeker.shells.length === 0) {
                this.seekers.splice(seekerIdx, 1);
            }

        });

        this.explosions.forEach((explosion, index) => {
            if(explosion.isDone()) {
                this.explosions.splice(index, 1);
            }
        });
        
    }

    this.stepNPCs = function() {
        //console.log("Stepping NPCs");
        this.myTank.move();
        
        this.bombers.forEach(bomber => {
            bomber.move();
            bomber.execute();

            bomber.shells.forEach(shell => shell.move());
        });

        this.seekers.forEach(seeker => {
            seeker.move();
            seeker.execute();
            seeker.shells.forEach(shell => {
                shell.move(
                    this.myTank.x + (this.myTank.baseWidth / 2),
                    this.myTank.y + (this.myTank.baseHeight / 2)
                );
            });
        });

        this.arcibode.move();

    }

    this.drawBackdrop = function() {
        
        fill(COLORS.skyBlue);
        noStroke();

        // sky
        var n1 = this.a;  
        for (var x=0; x<=400; x+=8) {
            var n2 = 0;
            for (var y=0; y<=250; y+=8) {
                var c = map(noise(n1,n2),0,1,0,255);
                fill(c, c, c+80,150);
                rect(x,y,8,8);
                n2 += 0.05; // step size in noise
            }
            n1 += 0.02; // step size in noise
        }
        this.a += 0.01;  // speed of clouds

        // Draw the mountains.
        this.mountains.forEach(mountain => {
            mountain.draw();
            mountain.move();
        });

        this.myTank.draw();
        
        this.bombers.forEach(bomber => {
            bomber.draw();
            bomber.shells.forEach(shell => shell.draw());
        });

        this.seekers.forEach(seeker => {
            seeker.draw();
            seeker.shells.forEach(shell => shell.draw());
        });

        this.explosions.forEach(explosion => {
            explosion.draw();
        });

        this.arcibode.draw();
    }

    this.drawStart = function() {

        fill(COLORS.translucentWhite);
        rect(205, 55, 460, 70);

        fill(COLORS.evilGrey);
        textSize(60);
        text("Master Smasher", 210, 110);

        fill(COLORS.translucentWhite);
        rect(275, 135, 345, 45);
        fill(COLORS.evilGrey);
        textSize(42);
        text("GET TO SMASHIN'", 280, 173);

        fill(COLORS.translucentWhite);
        rect(275, 195, 345, 45);
        fill(COLORS.evilGrey);
        textSize(42);
        text("HOW TO PLAY", 280, 232);


        // If the player is hovering over a wheel menu item selector, spin it.
        let selectors = [this.playSelector, this.howToPlaySelector];
        selectors.forEach((selector, idx) => {
            selector.draw();

            if(selector.isInBounds(mouseX, mouseY)) {
                if(mouseIsPressed)
                    switch(idx) {
                        case 0:
                            this.transitionToGame = true;
                        break;
                        case 1:
                            this.state = "howToPlay";
                        break;
                    }
                else
                    selector.spin();
            }
        });
        
    }

    this.drawHowToPlay = function() {
        fill(COLORS.translucentWhite);
        rect(30, 30, 340, 340);

        fill(COLORS.evilGrey);
        textSize(30);
        text("HOW TO PLAY", 115, 60);
        stroke(5);
        line(40, 70, 360, 70);

        noStroke();
        textSize(25);
        text("Use the W-A-D keys to", 50, 100);
        text("move sideways or jump.", 50, 130);
        text("Hit the bombs to launch", 50, 160);
        text("into the air; hit the", 50, 190);
        text("enemies to gain money", 50, 220);
        text("You'll need to fuel up", 50, 250);
        text("soon; don't run out of", 50, 280);
        text("money or get caught!", 50, 310);

        text("RETURN", 240, 350);

        fill(COLORS.translucentWhite);
        rect(400, 30, 340, 340);

        image(HowToFuel, 540, 50);
        image(HowToMoney, 410, 190);
        image(HowToCombo, 550, 270);

        fill(COLORS.evilGrey);
        textSize(15);
        text("Your fuel gauge", 410, 70);
        text("shows how much", 410, 85);
        text("fuel is left.", 410, 100);
        text("It also shows", 410, 125);
        text("the price of", 410, 140);
        text("the next fill-", 410, 155);
        text("up.", 410, 170);

        text("Your money meter shows", 530, 180);
        text("the money you currently", 530, 195);
        text("have. It also shows the", 530, 210);
        text("amount you receive for", 530, 225);
        text("each kill the amount you", 530, 240);
        text("lose for each fill-up.", 530, 255);

        text("Your combo meter", 410, 275);
        text("shows how many", 410, 290);
        text("successive kills", 410, 305);
        text("you have. Combo", 410, 320);
        text("score increases", 410, 335);
        text("the value of each", 410, 350);
        text("kill.", 410, 365);

        // If the player is hovering over a wheel menu item selector, spin it.
        let selectors = [this.toStartSelector];
        selectors.forEach((selector, idx) => {
            selector.draw();

            let bounds = selector.getBounds();
            if(mouseX > bounds.xMin && mouseX < bounds.xMax) {
                if(mouseY > bounds.yMin && mouseY < bounds.yMax) {
                    if(mouseIsPressed) {
                        if(idx === 0) {
                            this.state = "start";
                        }
                    }
                    else {
                        selector.spin();
                    }
                }
            }
        });
    }

    this.shouldTransitionToGame = function() {
        return this.transitionToGame;
    }

}