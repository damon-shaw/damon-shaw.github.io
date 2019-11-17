
let ShareTechMono;

let TankSpriteBase;
let TankSpriteWheel;

let BomberFrame0;
let BomberFrame1;
let BomberFrame2;
let BomberFrame3;
let BomberFrame4;

let gameState = "pregame";

let preGameController;
let playGameController;

function preload() {
    soundFormats('mp3', 'ogg');

    ShareTechMono = loadFont('../assets/fonts/ShareTechMono-Regular.ttf');
    
    TankSpriteBase = loadImage("../assets/tank_base_alpha.png");
    TankSpriteWheel = loadImage("../assets/tank_wheel.png");

    BomberFrame0 = loadImage("../assets/bomber.png");
    BomberFrame1 = loadImage("../assets/bomber_1.png");
    BomberFrame2 = loadImage("../assets/bomber_2.png");
    BomberFrame3 = loadImage("../assets/bomber_3.png");
    BomberFrame4 = loadImage("../assets/bomber_4.png");

    ExplosionFrame0 = loadImage("../assets/explosion_0.png");

    BomberShellBase = loadImage("../assets/bomber_shell.png");

    // Load sound files.
    Explosion1 = loadSound("../assets/sounds/explosion1.mp3");
    Explosion2 = loadSound("../assets/sounds/explosion2.mp3");
    Explosion3 = loadSound("../assets/sounds/explosion3.mp3");

    // Non `const` constant definitions.
    Collider = new ColliderTool();
    GRAVITY_VECTOR = createVector(0, 0.4);
    SLOW_GRAVITY_VECTOR = createVector(0, 0.08);
}

function setup() {
    //createCanvas(400, 400);

    let canvasElement = createCanvas(800, 400).elt;
    let context = canvasElement.getContext('2d');
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;

    textFont(ShareTechMono);

    // Scale up the player tank's base and wheels.
    let tankScale = 2;
    TankSpriteBase.resizeNN(TankSpriteBase.width * tankScale, TankSpriteBase.height * tankScale);
    TankSpriteWheel.resizeNN(TankSpriteWheel.width * tankScale, TankSpriteWheel.height * tankScale);

    // Scale up the Bomber NPC's frames.
    let bomberScale = 2;
    BomberFrame0.resizeNN(BomberFrame0.width * bomberScale, BomberFrame0.height * bomberScale);
    BomberFrame1.resizeNN(BomberFrame1.width * bomberScale, BomberFrame1.height * bomberScale);
    BomberFrame2.resizeNN(BomberFrame2.width * bomberScale, BomberFrame2.height * bomberScale);
    BomberFrame3.resizeNN(BomberFrame3.width * bomberScale, BomberFrame3.height * bomberScale);
    BomberFrame4.resizeNN(BomberFrame4.width * bomberScale, BomberFrame4.height * bomberScale);
    BomberShellBase.resizeNN(BomberShellBase.width * bomberScale, BomberShellBase.height * bomberScale);

    ExplosionFrame0.resizeNN(ExplosionFrame0.width * 4, ExplosionFrame0.height * 4);

    preGameController = new PreGameObj();
    playGameController = new PlayGameControllerObj();

    preGameController.init();
    playGameController.init();
}

function draw() {
    background(COLORS.skyBlue);

    switch(gameState) {
        case "pregame":
            preGameController.draw();
            preGameController.execute();

            if(preGameController.shouldTransitionToGame()) {
                playGameController.reset();
                gameState = "game";
            }
        break;
        case "game":
            playGameController.draw();
            playGameController.execute();

            if(playGameController.shouldTransitionToStart()) {
                preGameController.reset();
                gameState = "pregame";
            }
        break;
    }
}