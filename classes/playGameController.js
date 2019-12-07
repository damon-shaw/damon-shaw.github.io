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

        this.comboDisplay = new ComboDisplay();

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

        textFont(OceanRush);
        if(this.player.position.y < 100) {
            push();
            translate(0, -this.player.position.y + 100);

            this.comboDisplay.draw(this.player.position.y - 60);
        }
        else {
            this.comboDisplay.draw(40);
        }
        textFont(ShareTechMono);

        // Draw the height meter.
        stroke(COLORS.fadedBlack);
        strokeWeight(3);
        line(10, -HEIGHT_METER_LENGTH-height, 10, height);

        // Draw the height meter tick marks.
        for(var i = 0; i >= -HEIGHT_METER_LENGTH; i = i - HEIGHT_METER_INTERVAL) {
            line(10, i+height, 30, i+height);
        }

        noStroke();
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

                this.comboDisplay.incrementCombo();

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
    }

    this.execute = function() {
        switch(this.state) {
            case "play":
                this.executeGame();
            break;
            case "shop":
                this.executeShop();
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