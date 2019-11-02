function PreGameObj() {

    this.state = "start";
    this.inited = false;

    this.init = function() {
        this.myTank = new TankSprite(50, 340);
        this.myBomber = new BomberSprite(40);
        this.myBomber2 = new BomberSprite(120);

        this.playSelector = new TankWheelSprite(90, 150);
        this.howToPlaySelector = new TankWheelSprite(90, 200);

        this.toStartSelector = new TankWheelSprite(190, 330);

        this.inited = true;

        this.mountains = [[],[],[],[],[],[]]; 

        this.a = random(1500);
        for (var i=0; i<=5; i++) {
            for (var j=0; j<=40; j++) {
                var n = noise(this.a);
                this.mountains[i][j] = map(n,0,1,0,400-i*50);
                this.a += 0.025;  // ruggedness
            }
        }
    };

    this.draw = function() {

        if(!this.inited) {
            this.init();
        }

        this.drawBackdrop();
        this.stepNPCs();

        switch(this.state) {
            case "start":
                this.drawStart();
            break;

            case "howToPlay":
                this.drawHowToPlay();
            break;

            case "hiScores":
                this.drawHiScores();
            break;
        };

        
    };

    this.stepNPCs = function() {
        //console.log("Stepping NPCs");
        this.myTank.move();
        this.myBomber.move();
        this.myBomber2.move();
    }

    this.drawBackdrop = function() {
        
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
        
        // mountains
        for (x=0; x<=5; x++) {
            for (var y=0; y<=40; y++) {
                fill(20 + x*5, 60+x*10, 0);
                // draw quads of width 10 pixels
                quad(
                    y*10,
                    this.mountains[x][y]+x*55,
                    (y+1)*10,
                    this.mountains[x][y+1]+(x)*55,
                    (y+1)*10,
                    400,
                    y*10,
                    400
                );
            }
        }

        this.myTank.draw();
        this.myBomber.draw();
        this.myBomber2.draw();
    }

    this.drawStart = function() {

        fill(COLORS.translucentWhite);
        rect(45, 75, 313, 45);

        fill(COLORS.evilGrey);
        textSize(40);
        text("Master Smasher", 50, 110);

        fill(COLORS.translucentWhite);
        rect(125, 145, 250, 35);
        fill(COLORS.evilGrey);
        textSize(30);
        text("GET TO SMASHIN'", 130, 173);

        fill(COLORS.translucentWhite);
        rect(125, 195, 250, 35);
        fill(COLORS.evilGrey);
        textSize(30);
        text("HOW TO PLAY", 130, 223);


        // If the player is hovering over a wheel menu item selector, spin it.
        let selectors = [this.playSelector, this.howToPlaySelector];
        selectors.forEach((selector, idx) => {
            selector.draw();

            let bounds = selector.getBounds();
            if(mouseX > bounds.xMin && mouseX < bounds.xMax) {
                if(mouseY > bounds.yMin && mouseY < bounds.yMax) {
                    if(mouseIsPressed) {
                        if(idx === 1) {
                            this.state = "howToPlay";
                        }
                    }
                    else {
                        selector.spin();
                    }
                }
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

}