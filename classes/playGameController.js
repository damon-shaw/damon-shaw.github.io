function PlayGameControllerObj() {

    this.state = "play";
    this.inited = false;
    this.transitionToStart = false;

    this.explosionSounds = [Explosion1, Explosion2, Explosion3];

    this.init = function() {
        // Set the initial parameter values.
        this.state = "play";
        this.inited = false;
        this.transitionToStart = false;

        // Create the player and NPC containers.
        this.player = new Player(200, 350);
        this.bombers = [];
        this.seekers = [];

        this.explosions = [];
        this.gameOverExplosions = [];

        this.comboDisplay = new ComboDisplay();
        this.fuelDisplay = new FuelDisplay();
        this.moneyDisplay = new MoneyDisplay();
        this.progressDisplay = new ProgressDisplay();

        this.gameShop = new GameShop();

        this.mountains = [
            new Mountain(0.020, 105, 290, COLORS.evilGrey),
            new Mountain(0.011, 120, 290, COLORS.highPeakGrey),
            new Mountain(0.009, 135, 290, COLORS.sageGreen),
            new Mountain(0.009, 130, 310, COLORS.oliveGreen),
            new Mountain(0.009, 160, 320, COLORS.armyGreen),
            new Mountain(0.004, 305, 320, COLORS.seaweedGreen),
            new Mountain(0.004, 365, 375, COLORS.dirt)
        ]; 
    }

    this.reset = function() {
        this.init();
    }

    this.drawGame = function() {

        // Draw the backdrop.
        noStroke();

        if(this.player.position.y < 100) {
            push();
            translate(0, -this.player.position.y + 100);
        }

        // Draw the height meter.
        stroke(COLORS.fadedBlack);
        strokeWeight(3);
        line(10, -HEIGHT_METER_LENGTH-height, 10, height);

        // Draw the height meter tick marks.
        for(var i = 0; i >= -HEIGHT_METER_LENGTH; i = i - HEIGHT_METER_INTERVAL) {
            line(10, i+height, 30, i+height);
        }

        noStroke();
        fill(COLORS.fadedBlack);
        // Draw the labels for each height meter tick mark.
        for(var i = 0; i >= -HEIGHT_METER_LENGTH; i = i - HEIGHT_METER_INTERVAL) {
            text((-i).toString(), 20, i+height-5);
        }

        fill(COLORS.skyBlue);

        // Draw the mountains.
        this.mountains.forEach(mountain => {
            mountain.draw();
            mountain.move();
        });

        this.player.draw();

        // Draw all of the Bomber NPCs and their shells.
        this.bombers.forEach(bomber => {
            bomber.draw();
            bomber.shells.forEach(shell => shell.draw());
        });

        // Draw all of the Seeker NPCs and their shells.
        this.seekers.forEach(seeker => {
            seeker.draw();
            seeker.shells.forEach(shell => shell.draw());
        });

        // Draw all of the explosions.
        this.explosions.forEach(explosion => {
            explosion.draw();
        });

        if(this.player.position.y < 100) {
            pop();
        }

        this.comboDisplay.draw();
        this.fuelDisplay.draw();
        this.moneyDisplay.draw();
        this.progressDisplay.draw();
        
    }

    this.drawGameOver = function() {
        // Draw all of the player explosions.
        this.gameOverExplosions.forEach(explosion => {
            explosion.draw();
        });

        if(this.player.position.x < -this.player.baseWidth - 10) {
            fill(0, 0, 0);
            rect(0, 0, width, height);

            imageMode(CENTER);
            image(SkullFrame, width/2, height/2);
            imageMode(CORNER);

            textSize(60);
            fill(COLORS.bloodRed);
            textFont(RoyalFighter);
            text("You have died!", width/4, 70);

            textFont(ShareTechMono);
            textSize(30);
            text("Click the skull to try again.", width/5, 340);
        }
    }

    this.drawGameWin = function() {
        if(this.player.position.x > width + this.player.baseWidth + 10) {
            textSize(60);
            fill(COLORS.laserGreen);
            textFont(RoyalFighter);
            text("You have escaped!", width/5, 125);

            textSize(30);
            fill(COLORS.scarletRed);
            textFont(ShareTechMono);
            text("You outran the military and made it to Mexico!", width/23, 200);
            
            imageMode(CENTER);
            image(MargaritaFrame, width/2, 4*height/5);
            imageMode(CORNER);

            text("Click the margarita to play again!", width/6, 240);


        }
    }

    this.draw = function() {
        // console.log("Drawing game!");
        switch(this.state) {
            case "play":
                this.drawGame();
            break;
            case "shop":
                this.drawShopScreen();
            break;
            case "lose":
                this.drawGame();
                this.drawGameOver();
            break;
            case "win":
                this.drawGame();
                this.drawGameWin();
            break;
        }
    }

    this.executeGame = function() {
        /*
         * MOVEMENT/DECISION
         */
        // Move the player based on their inputs.
        this.player.move();
        // Move the bombers and all of their shells.
        // Allow the Bomber units to decide if they want to drop
        // a shell.
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
                    this.player.position.x + (this.player.baseWidth / 2),
                    this.player.position.y + (this.player.baseHeight / 2)
                );
            });
        });
        ///////////////////////////////////////////////

        /*
         * COLLISION DETECTION
         */
        // Check if any of the Bombers are out of frame.
        // If so, remove it.
        this.bombers.forEach((bomber, index) => {
            if(bomber.isOutOfFrame())
                this.bombers.splice(index, 1);
        });
        // Check if any of the Seekers are out of frame.
        // If so, remove it.
        this.seekers.forEach((seeker, index) => {
            if(seeker.isOutOfFrame() && seeker.hasNoShells())
                this.seekers.splice(index, 1);
        });
        
        // Check if any of the Bomber NPCs, or their shells, are colliding with
        // the player.
        this.bombers.forEach((bomber, bIndex) => {
            if(Collider.areColliding(this.player, bomber)) {
                console.log("Player is colliding with a Bomber.");
                this.explosions.push(
                    new ExplosionAnimation(
                        (bomber.position.x + bomber.width / 2),
                        (bomber.position.y + bomber.height / 2)
                    )
                );

                console.log(COMBO_MODIFIER(this.comboDisplay.getCombo()));
                this.comboDisplay.incrementCombo();
                this.moneyDisplay.addMoney(
                    Math.trunc(VALUE_BOMBER * COMBO_MODIFIER(this.comboDisplay.getCombo()))
                );

                this.player.launch();
                this.playRandomExplosion();
                this.bombers.splice(bIndex, 1);
            }

            bomber.shells.forEach((shell, index) => {
                if(Collider.areColliding(this.player, shell)) {
                    console.log("Player is colliding with a shell!");
                    this.explosions.push(
                        new ExplosionAnimation(
                            (this.player.position.x + shell.position.x) / 2,
                            (this.player.position.y + shell.position.y) / 2
                        )
                    );
                    bomber.shells.splice(index, 1);
                    this.player.launch();
                    this.playRandomExplosion();
                }
            });
        });

        // Check if any of the Seeker NPCs, or their shells, are colliding with
        // the player.
        // Check if any of the Seeker NPC shells have reached their end of life.
        this.seekers.forEach((seeker) => {

            if(Collider.areColliding(this.player, seeker)) {
                console.log("Player is colliding with a seeker.");
                this.explosions.push(
                    new ExplosionAnimation(
                        (seeker.position.x + seeker.width / 2),
                        (seeker.position.y + seeker.height / 2)
                    )
                );
                this.comboDisplay.incrementCombo();
                this.moneyDisplay.addMoney(
                    Math.trunc(VALUE_SEEKER * COMBO_MODIFIER(this.comboDisplay.getCombo()))
                );
                this.player.launch();
                this.playRandomExplosion();
                seeker.position.x = width * 1.1;
            }

            seeker.shells.forEach((shell, index) => {
                if(Collider.areColliding(this.player, shell)) {
                    console.log("Player is colliding with a seeker shell!");
                    this.explosions.push(
                        new ExplosionAnimation(
                            (this.player.getMidpoint().x + shell.getMidpoint().x) / 2,
                            (this.player.getMidpoint().y + shell.getMidpoint().y) / 2
                        )
                    );
                    seeker.shells.splice(index, 1);
                    this.player.launch();
                    this.playRandomExplosion();
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
        });

        /*
         * NPC GENERATION
         */
        let createBomber = random();
        if(createBomber < this.gameShop.createBomberProb) {
            console.log("Creating a new bomber!");
            this.bombers.push(new Bomber(random(-200, 200)));
        }

        let createSeeker = random();
        if(createSeeker < this.gameShop.createSeekerProb) {
            console.log("Creating a new seeker!");
            this.seekers.push(new Seeker(random(-500, -300)));
        }

        /*
         * DEAD ENTITIES
         */
        this.explosions.forEach((explosion, index) => {
            if(explosion.isDone())
                this.explosions.splice(index, 1);
        });

        if(this.player.isGrounded()) {
            this.comboDisplay.resetCombo();
        }

        /*
         * Driving force actions
         */
        if(frameCount % 30 === 0)
            this.fuelDisplay.deductFuel(1);

        if(this.fuelDisplay.isFuelEmpty()) {
            if(this.moneyDisplay.hasAtleast(this.fuelDisplay.getNextFillupCost())) {
                this.moneyDisplay.deductMoney(this.fuelDisplay.getNextFillupCost());
                this.fuelDisplay.fillFuel();
                this.progressDisplay.incrementProgress();
                MoneySpentSound.play();
            }
            else {
                this.state = "lose";
            }
        }

        if(this.progressDisplay.complete()) {
            this.state = "win";
        }

        if(keyIsDown(SPACE_KEY)) {
            if(!this.spacePressed) {
                this.spacePressed = true;
                this.progressDisplay.incrementProgress();
            }
        }
        else {
            this.spacePressed = false;
        }
    }

    this.executeGameOver = function() {
        // Move all the NPCs, but don't allow them to drop new shells.
        this.bombers.forEach(bomber => {
            bomber.move();
            bomber.shells.forEach(shell => shell.move());
        });
        this.seekers.forEach(seeker => {
            seeker.move();
            seeker.shells.forEach(shell => {
                shell.move(
                    this.player.position.x + (this.player.baseWidth / 2),
                    this.player.position.y + (this.player.baseHeight / 2)
                );
            });
        });

        
        // Spawn a new explosion animation on the player's current location.
        if(frameCount % 8 === 0)
            this.gameOverExplosions.push(
                new ExplosionAnimation(
                    this.player.position.x + random(0, this.player.baseWidth),
                    this.player.position.y + random(0, this.player.baseHeight)
                )
            );

        this.player.noInputMove();
        this.player.position.x -= 2;

        // Move all of the player explosions to the new player location.
        // this.gameOverExplosions.forEach(explosion => {
        //     explosion.position.x = this.player.position.x + random(0, this.player.baseWidth);
        //     explosion.position.y = this.player.position.y + random(0, this.player.baseHeight);
        // });

        // Do not process player movement.
        // Do not process collisions.

        if(this.player.position.x < -this.player.baseWidth - 10) {
            if(mouseIsPressed) {
                console.log(`X: ${mouseX} Y: ${mouseY}`);
                if(mouseX > 275 && mouseX < 525) {
                    if(mouseY > 125 && mouseY < 275) {
                        console.log("Should transition to start!");
                        this.transitionToStart = true;
                    }
                }
            }
        }
    }

    this.executeGameWin = function() {
        // Move all the NPCs, but don't allow them to drop new shells.
        this.bombers.forEach(bomber => {
            bomber.move();
            bomber.shells.forEach(shell => shell.move());
        });
        this.seekers.forEach(seeker => {
            seeker.move();
            seeker.shells.forEach(shell => {
                shell.move(
                    this.player.position.x + (this.player.baseWidth / 2),
                    this.player.position.y + (this.player.baseHeight / 2)
                );
            });
        });

        this.player.noInputMove();
        this.player.position.x += 2;

        if(this.player.position.x > width + this.player.baseWidth + 10) {
            if(mouseIsPressed) {
                if(mouseX > width/3 && mouseX < 2*width/3) {
                    if(mouseY > height/2 && mouseY < height) {
                        this.transitionToStart = true;
                    }
                }
            }
        }
    }

    this.execute = function() {
        switch(this.state) {
            case "play":
                this.executeGame();
            break;
            case "shop":
                this.executeShop();
            break;
            case "lose":
                this.executeGameOver();
            break;
            case "win":
                this.executeGameWin();
            break;
        }
    }

    this.shouldTransitionToStart = function() {
        return this.transitionToStart;
    }

    this.playRandomExplosion = function() {
        let sound = random(this.explosionSounds);
        sound.play();
    }

}