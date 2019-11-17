function PreGameObj() {

    this.state = "start";
    this.inited = false;
    this.transitionToGame = false;

    this.init = function() {
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

        this.explosions = [];
    };

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
        if(random() < 0.005) {
            this.bombers.push(new BomberSprite(random(100, 250)));
        }

        this.bombers.forEach((bomber, index) => {
            if(bomber.isOutOfFrame())
                this.bombers.splice(index, 1);
            
            bomber.shells.forEach((shell, shellIdx) => {
                if(Collider.areColliding(this.myTank, shell)) {
                    this.explosions.push(new ExplosionAnimation(shell.position.x, shell.position.y));
                    bomber.shells.splice(shellIdx, 1);
                }
            })
        });

        this.explosions.forEach((explosion, index) => {
            if(explosion.isDone()) {
                this.explosions.splice(1, index);
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

        this.explosions.forEach(explosion => {
            explosion.draw();
        });
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
        text("Use the arrow keys to", 50, 100);
        text("move left and right.", 50, 130);
        text("Hit the bombs to launch", 50, 160);
        text("into the air to hit the", 50, 190);
        text("enemies and gain money", 50, 220);
        text("You'll need to fuel up", 50, 250);
        text("soon; don't run out of", 50, 280);
        text("money or get caught!", 50, 310);

        text("RETURN", 240, 350);

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