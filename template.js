
var ShareTechMono;
var OceanRush;
var RoyalFighter;
var DoubleHomocide;
var LadyRadical;

let TankSpriteBase;
let TankSpriteWheel;

// How-To Images
let HowToFuel;
let HowToMoney;
let HowToCombo;

// Bomber Image Frames
let BomberFrame0;
let BomberFrame1;
let BomberFrame2;
let BomberFrame3;
let BomberFrame4;

// Seeker Image Frames
let SeekerFrame;

// Arcibode Image Frames
let ArcibodeFrame0;
let ArcibodeFrame1;
let ArcibodeFrame2;
let ArcibodeFrame3;
let ArcibodeFrame4;
let ArcibodeFrame5;
let ArcibodeFrame6;
let ArcibodeFrame7;
let ArcibodeFrames = {
    zero: [],
    one: [],
    two: [],
    three: [],
    four: [],
    five: [],
    six: [],
    seven: []
};

// Fuel Can Image Frames
let FuelCanFrame;
let SkullFrame;
let MargaritaFrame;

// Sounds
let GoodLuckSound;
let DoubleKillSound;
let QuadraKillSound;
let SuperKillSound;
let KillatacularSound;
let KillionaireSound;
let KilltastropheSound;
let MonsterKillSound;
let UltraKillSound;
let HolyShitSound;
let YeetSound;
let MoneySpentSound;

let gameState = "pregame";

let preGameController;
let playGameController;

Number.prototype.toHexString = function() {
    return ("0" + (Math.trunc(this)).toString(16)).slice(-2).toUpperCase();
};

function preload() {
    soundFormats('mp3', 'ogg');

    ShareTechMono = loadFont('../assets/fonts/ShareTechMono-Regular.ttf');
    OceanRush = loadFont("../assets/fonts/OceanRush.otf");
    RoyalFighter = loadFont("../assets/fonts/RoyalFighter.otf");
    //DoubleHomocide = loadFont("../assets/fonts/DoubleHomocide.ttf");
    LadyRadical = loadFont("../assets/fonts/LadyRadical.ttf");
    
    TankSpriteBase = loadImage("../assets/tank_base_alpha.png");
    TankSpriteWheel = loadImage("../assets/tank_wheel.png");

    HowToFuel = loadImage("../assets/howto_fuel.PNG");
    HowToMoney = loadImage("../assets/howto_money.PNG");
    HowToCombo = loadImage("../assets/howto_combo.PNG");

    // Bomber NPC Sprite Frames
    BomberFrame0 = loadImage("../assets/bomber.png");
    BomberFrame1 = loadImage("../assets/bomber_1.png");
    BomberFrame2 = loadImage("../assets/bomber_2.png");
    BomberFrame3 = loadImage("../assets/bomber_3.png");
    BomberFrame4 = loadImage("../assets/bomber_4.png");
    BomberShellBase = loadImage("../assets/bomber_shell.png");

    // Seeker NPC Sprite Frames
    SeekerFrame = loadImage("../assets/seeker.png");
    SeekerShellFrame0 = loadImage("../assets/seeker_shell_0.png");
    SeekerShellFrame1 = loadImage("../assets/seeker_shell_1.png");
    SeekerShellFrame2 = loadImage("../assets/seeker_shell_2.png");
    SeekerShellFrame3 = loadImage("../assets/seeker_shell_3.png");

    // Arcibode NPC Sprite Frames
    ArcibodeFrame0 = loadImage("../assets/arcibode_0.png");
    ArcibodeFrame1 = loadImage("../assets/arcibode_1.png");
    ArcibodeFrame2 = loadImage("../assets/arcibode_2.png");
    ArcibodeFrame3 = loadImage("../assets/arcibode_3.png");
    ArcibodeFrame4 = loadImage("../assets/arcibode_4.png");
    ArcibodeFrame5 = loadImage("../assets/arcibode_5.png");
    ArcibodeFrame6 = loadImage("../assets/arcibode_6.png");
    ArcibodeFrame7 = loadImage("../assets/arcibode_7.png");
    for(let i = 1; i <= 20; i++) {
        ArcibodeFrames.zero.push(loadImage("../assets/arcibode_0.png"));
        ArcibodeFrames.one.push(loadImage("../assets/arcibode_1.png"));
        ArcibodeFrames.two.push(loadImage("../assets/arcibode_2.png"));
        ArcibodeFrames.three.push(loadImage("../assets/arcibode_3.png"));
        ArcibodeFrames.four.push(loadImage("../assets/arcibode_4.png"));
        ArcibodeFrames.five.push(loadImage("../assets/arcibode_5.png"));
        ArcibodeFrames.six.push(loadImage("../assets/arcibode_6.png"));
        ArcibodeFrames.seven.push(loadImage("../assets/arcibode_7.png"));
    }

    // Fuel Can Frames
    FuelCanFrame = loadImage("../assets/fuel_can.png");

    SkullFrame = loadImage("../assets/skull.png");
    MargaritaFrame = loadImage("../assets/margarita.png");

    ExplosionFrame0 = loadImage("../assets/explosion_0.png");
    ExplosionFrame1 = loadImage("../assets/explosion_1.png");
    ExplosionFrame2 = loadImage("../assets/explosion_2.png");
    ExplosionFrame3 = loadImage("../assets/explosion_3.png");
    ExplosionFrame4 = loadImage("../assets/explosion_4.png");
    ExplosionFrame5 = loadImage("../assets/explosion_5.png");
    ExplosionFrame6 = loadImage("../assets/explosion_6.png");
    ExplosionFrame7 = loadImage("../assets/explosion_7.png");

    // Load sound files.
    Explosion1 = loadSound("../assets/sounds/explosion1.mp3");
    Explosion2 = loadSound("../assets/sounds/explosion2.mp3");
    Explosion3 = loadSound("../assets/sounds/explosion3.mp3");

    GoodLuckSound = loadSound("../assets/sounds/goodLuck.wav");
    DoubleKillSound = loadSound("../assets/sounds/doubleKill.wav");
    QuadraKillSound = loadSound("../assets/sounds/quadraKill.wav");
    SuperKillSound = loadSound("../assets/sounds/superKill.wav");
    KillatacularSound = loadSound("../assets/sounds/killtacular.wav");
    KillionaireSound = loadSound("../assets/sounds/killionaire.wav");
    KilltastropheSound = loadSound("../assets/sounds/killtastrophe.wav");
    MonsterKillSound = loadSound("../assets/sounds/monsterKill.wav");
    UltraKillSound = loadSound("../assets/sounds/ultraKill.wav");
    HolyShitSound = loadSound("../assets/sounds/holyShit.wav");
    YeetSound = loadSound("../assets/sounds/420yeet.wav");
    MoneySpentSound = loadSound("../assets/sounds/chaChing.mp3");

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

    HowToFuel.resize(HowToFuel.width * 0.8, HowToFuel.height * 0.8);
    HowToCombo.resize(HowToCombo.width * 0.9, HowToCombo.height * 0.9);

    // Scale up the Bomber NPC's frames.
    let bomberScale = 2;
    BomberFrame0.resizeNN(BomberFrame0.width * bomberScale, BomberFrame0.height * bomberScale);
    BomberFrame1.resizeNN(BomberFrame1.width * bomberScale, BomberFrame1.height * bomberScale);
    BomberFrame2.resizeNN(BomberFrame2.width * bomberScale, BomberFrame2.height * bomberScale);
    BomberFrame3.resizeNN(BomberFrame3.width * bomberScale, BomberFrame3.height * bomberScale);
    BomberFrame4.resizeNN(BomberFrame4.width * bomberScale, BomberFrame4.height * bomberScale);
    BomberShellBase.resizeNN(BomberShellBase.width * bomberScale, BomberShellBase.height * bomberScale);

    // Scale up the Seeker NPC's frames.
    let seekerScale = 2;
    SeekerFrame.resizeNN(SeekerFrame.width * seekerScale, SeekerFrame.height * seekerScale);

    Object.values(ArcibodeFrames).forEach(frameSet => {
        frameSet.forEach((frame, idx) => {
            frame.resizeNN((frame.width * idx / 20) + 1, (frame.height * idx / 20) + 1);
        });
    })

    FuelCanFrame.resizeNN(FuelCanFrame.width * 0.8, FuelCanFrame.height * 0.8);
    SkullFrame.resizeNN(SkullFrame.width * 0.3, SkullFrame.height * 0.3);
    MargaritaFrame.resizeNN(MargaritaFrame.width * 7, MargaritaFrame.height * 7);

    ExplosionFrame0.resizeNN(ExplosionFrame0.width * 2, ExplosionFrame0.height * 2);
    ExplosionFrame1.resizeNN(ExplosionFrame1.width * 2, ExplosionFrame1.height * 2);
    ExplosionFrame2.resizeNN(ExplosionFrame2.width * 2, ExplosionFrame2.height * 2);
    ExplosionFrame3.resizeNN(ExplosionFrame3.width * 2, ExplosionFrame3.height * 2);
    ExplosionFrame4.resizeNN(ExplosionFrame4.width * 2, ExplosionFrame4.height * 2);
    ExplosionFrame5.resizeNN(ExplosionFrame5.width * 2, ExplosionFrame5.height * 2);
    ExplosionFrame6.resizeNN(ExplosionFrame6.width * 2, ExplosionFrame6.height * 2);
    ExplosionFrame7.resizeNN(ExplosionFrame7.width * 2, ExplosionFrame7.height * 2);

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
                GoodLuckSound.play();
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