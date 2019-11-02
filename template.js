
let ShareTechMono;

let TankSpriteBase;
let TankSpriteWheel;

let BomberFrame0;
let BomberFrame1;
let BomberFrame2;
let BomberFrame3;
let BomberFrame4;

let preGameController;

function preload() {

    ShareTechMono = loadFont('../assets/fonts/ShareTechMono-Regular.ttf');
    
    TankSpriteBase = loadImage("../assets/tank_base_alpha.png");
    TankSpriteWheel = loadImage("../assets/tank_wheel.png");

    BomberFrame0 = loadImage("../assets/bomber.png");
    BomberFrame1 = loadImage("../assets/bomber_1.png");
    BomberFrame2 = loadImage("../assets/bomber_2.png");
    BomberFrame3 = loadImage("../assets/bomber_3.png");
    BomberFrame4 = loadImage("../assets/bomber_4.png");


}

function setup() {
    //createCanvas(400, 400);

    let canvasElement = createCanvas(400, 400).elt;
    let context = canvasElement.getContext('2d');
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;

    textFont(ShareTechMono);

    let tankScale = 2;
    TankSpriteBase.resizeNN(TankSpriteBase.width * tankScale, TankSpriteBase.height * tankScale);
    TankSpriteWheel.resizeNN(TankSpriteWheel.width * tankScale, TankSpriteWheel.height * tankScale);

    let bomberScale = 2;
    BomberFrame0.resizeNN(BomberFrame0.width * bomberScale, BomberFrame0.height * bomberScale);
    BomberFrame1.resizeNN(BomberFrame1.width * bomberScale, BomberFrame1.height * bomberScale);
    BomberFrame2.resizeNN(BomberFrame2.width * bomberScale, BomberFrame2.height * bomberScale);
    BomberFrame3.resizeNN(BomberFrame3.width * bomberScale, BomberFrame3.height * bomberScale);
    BomberFrame4.resizeNN(BomberFrame4.width * bomberScale, BomberFrame4.height * bomberScale);

    preGameController = new PreGameObj();
}

function draw() {

    background(COLORS.skyBlue);

    preGameController.draw();
}