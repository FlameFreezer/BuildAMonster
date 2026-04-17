class Pos {
    constructor(X, Y) {
        this.x = X;
        this.y = Y;
    }
}
class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.speed = 1;
        this.position = new Pos(300, 350);
        this.body = new Pos(0, 0);
        this.leftArm = new Pos(75, 0);
        this.rightArm = new Pos(-75, 0);
        this.head = new Pos(0, -150);
        this.smile = new Pos(0, -95);
        this.fangs = new Pos(0, -88);
        this.nose = new Pos(0, -120);
        this.leftEye = new Pos(-31, -140);
        this.rightEye = new Pos(31, -140);
        this.leftHorn = new Pos(-55, -220);
        this.rightHorn = new Pos(55, -220);
        this.leftLeg = new Pos(-65, 125);
        this.rightLeg = new Pos(65, 125);

        this.sKey = null;
        this.fKey = null;
        this.aKey = null;
        this.dKey = null;
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    addSprite(pos, filename) {
        return this.add.sprite(this.position.x + pos.x, this.position.y + pos.y, "monsterParts", filename);
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        my.sprite.body = this.addSprite(this.body, "body_greenD.png");
        my.sprite.leftArm = this.addSprite(this.leftArm, "arm_yellowE.png"); 
        my.sprite.rightArm = this.addSprite(this.rightArm, "arm_yellowE.png"); 
        my.sprite.rightArm.flipX = true;
        my.sprite.head = this.addSprite(this.head, "body_greenC.png");
        my.sprite.smile = this.addSprite(this.smile, "mouth_closed_teeth.png");
        my.sprite.fangs = this.addSprite(this.fangs, "mouthC.png");
        my.sprite.fangs.visible = false;
        my.sprite.nose = this.addSprite(this.nose, "nose_brown.png");
        my.sprite.leftEye = this.addSprite(this.leftEye, "eye_cute_light.png");
        my.sprite.rightEye = this.addSprite(this.rightEye, "eye_cute_light.png");
        my.sprite.rightEye.flipX = true;
        my.sprite.leftHorn = this.addSprite(this.leftHorn, "detail_yellow_horn_small.png");
        my.sprite.rightHorn = this.addSprite(this.rightHorn, "detail_yellow_horn_small.png");
        my.sprite.leftHorn.flipX = true;
        my.sprite.leftLeg = this.addSprite(this.leftLeg, "leg_yellowC.png");
        my.sprite.rightLeg = this.addSprite(this.rightLeg, "leg_yellowC.png");
        my.sprite.leftLeg.flipX = true;

        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.fKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        let my = this.my;    // create an alias to this.my for readability

        //Polling for smile
        if(Phaser.Input.Keyboard.JustDown(this.sKey)) {
            my.sprite.smile.visible = true;
            my.sprite.fangs.visible = false;
        }
        //Polling for fangs
        if(Phaser.Input.Keyboard.JustDown(this.fKey)) {
            my.sprite.smile.visible = false;
            my.sprite.fangs.visible = true;
        }
        //Polling for movement
        if(this.aKey.isDown) {
            this.position.x -= this.speed;
            for(let sprite in my.sprite) {
                my.sprite[sprite].x -= this.speed;
            }
        }
        if(this.dKey.isDown) {
            this.position.x += this.speed;
            for(let sprite in my.sprite) {
                my.sprite[sprite].x += this.speed;
            }
        }
    }

}