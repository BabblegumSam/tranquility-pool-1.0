// TRANQUILITY POOL (ABSTRACT/UTOPIAN) - Architectural Expression
// 21/11/2022
// Samuel Mui Shen Ern

// An animated, generative 3D sculpture inspired by the vaporwave aesthetic movement. 

var easy;

// initialize texture variables and arrays
var watertxtr, gridtxtr, liqtxtr, noisetxtr, steeltxtr, statictxtr, walltxtr, wavestxtr;
var textures = [];

// initialize arrays for object classes
var henges = [];
var floaties = [];
var clouds = [];
var spires = [];
var emanations = [];

// intialize counter for "Box Wave" textures and randomizer for the towers
let counter;
let randomTextureBoxes;
let randomTextureTower1;
let randomTextureTower2;
let randomTextureTower3;

// preload textures
function preload() {
  watertxtr = loadImage('water.png'); 
  gridtxtr = loadImage('grid.jpg');
  liqtxtr = loadImage('liquid.jpeg');
  noisetxtr = loadImage('noise.jpg');
  steeltxtr = loadImage('steel.jpg');
  statictxtr = loadImage('static.jpg');
  walltxtr = loadImage('wall.jpg');
  wavestxtr = loadImage('waves.jpg');
}

function setup() {
  createCanvas(600,600, WEBGL);
  easy = createEasyCam({distance:2000,
                        rotation: [0.7785299983401404, 0.4696351105090781, 
                                    0.27019569827675355, -0.3167462537968929],
                        angle: 40,

                 });
  rectMode(CENTER);
  counter = 0;
  
  // place textures in array
  textures = [watertxtr, gridtxtr, liqtxtr, noisetxtr, statictxtr, walltxtr, wavestxtr];
  
  // intialize random texture generator for the "Box Wave" and tower
  randomTextureBoxes = random(textures);
  randomTextureTower1 = random(textures);
  randomTextureTower2 = random(textures);
  randomTextureTower3 = random(textures);

  // place object classes in their respective arrays
  for (let i = 0; i < floor(random(1, 4)); i++) {
    let h = new henge();
    henges.push(h);
  }

  for (let i = 0; i < floor(random(4, 12)); i++) {
    let f = new floaty();
    floaties.push(f);
  }

  for (let i = 0; i < floor(random(10, 25)); i++) {
    let c = new cloud();
    clouds.push(c);
  }

  for (let i = 0; i < floor(random(3, 6)); i++) {
    let s = new spire();
    spires.push(s);
  }

  for (let i = 0; i < floor(random(2, 4)); i++) {
    let e = new emanation();
    emanations.push(e);
  }

 document.oncontextmenu = ()=>false;
}



function draw() {
  background(0);
  ambientLight(255);
  pointLight(100, 100, 100, cos(frameCount/40) * 1000, sin(frameCount/40) * 1000, 3000 + sin(frameCount/25) * 1000);
  strokeWeight(3);

    noStroke();


    // BOX WAVE
    for (let x = -500; x < 500; x += 100) {
      for (let y = -500; y < 500; y += 100) {
        push();
        translate(x, y);
        texture(liqtxtr);
        texture(textures[counter % (textures.length - 1)]); // cycle through textures
        texture(randomTextureBoxes);
        box(50, 50, 200+ noise(x, y) * 500 * sin(frameCount/100 + x + y));
        pop();
      }
    }

      // draw columns
      column(750, -750);
      column(-750, -750);
      column(750, 750);

      // draw walls

      let br = 750;
      let ht = 500;

      push();
        specularMaterial(255, 200, 200);
        texture(gridtxtr);
        translate(br, 0, ht/2);
        rotateX(PI/2);
        rotateY(PI/2);
        rect(0, 0, 1500, ht);
      pop();

      push();
        specularMaterial(255, 200, 200);
        texture(gridtxtr);
        translate(0, -br, ht/2);
        rotateX(PI/2);
        rect(0, 0, 1500, ht);
      pop();

      // draw floor
      push();
      
      rectMode(CORNER);
      let checker = 0;

      //rect(0, 0, 1500, 1500);
      for(let x = -1300; x < 1300; x += 75) {
        for (let y = -1250; y < 1250; y += 75) {
          if (checker % 2 == 0) { specularMaterial(0, 0, 0); } // give floor a checkboard pattern
          else { specularMaterial(255, 255, 255); }
          noStroke();
          rect(x, y, 75);
          checker++;
        }
        checker++;
      }
      pop();


      // draw tower
      push();
        translate(0, 0, 100);
        specularMaterial(0, 200, 255);
        fill(0, 255, 255, 200);
        tower();
      pop();

      // draw class objects (except clouds)
      for (let i = 0; i < henges.length; i++) {
        henges[i].show();
      }

      for (let i = 0; i < floaties.length; i++) {
        floaties[i].show();
      }

      for (let i = 0; i < spires.length; i++) {
        spires[i].show();
      }

      for (let i = 0; i < emanations.length; i++) {
        emanations[i].show();
      }


      // draw water
      push();
        translate(0, 0, 100);
        rotateY(sin(frameCount/100) / 20);
        fill(50, 200, 255, 100);
        texture(watertxtr);
        tint(255, 200);
        rect(0, 0, 5000, 5000);

        push();
      
        rectMode(CORNER);

      pop();

      // draw cloud class objects over water
      for (let i = 0; i < clouds.length; i++) {
        clouds[i].show();
      }
}

function column(x, y) {
        push();
        translate(x, y);
          specularMaterial(255, 200, 200);
          texture(gridtxtr); 
          rotateX(PI/2);
      
          cylinder(200, 250); // base of column
          for(let i = 0; i < 1200; i += 20) {
           noStroke();
          
          push();
            translate(0, i, 0); // rest of column
             cylinder(100 + (noise(i) * 100), 20);
          pop();
      }
      pop();
}

function tower() {
  push();
    fill(255, 0, 0);
    texture(randomTextureTower1);
    rotate(-frameCount/20);

    // tower shaft
    box(200, 200, 600 + sin(frameCount/50) * 200);

    push();
      translate(0, 0, 300 + sin(frameCount/50) * 200);
      texture(randomTextureTower2);
      rotate(frameCount/10);
      box(100, 100, 300);

    pop();

    // tower head
    push();
      translate(0, 0, 500 + sin(frameCount/50) * 200);
      texture(randomTextureTower3);
      sphere(100);
    pop();
  pop();
}

class henge {
  constructor() {
    this.texture = random(textures);
    this.flipper = [-1, 1]; // flip direction of rotation
    this.direction = random(this.flipper);
    this.speed = random(40, 80);
    this.thickness = random(30, 60);
    this.theta = random(TWO_PI); // adjust angle of rotation

    this.tip = random(300, 600);
    this.height = random(400, 1000);
    this.wave = 0;
    this.tide = random(75, 200);
    this.bob = random(30, 60);

  }

  show() {
      // squareArches
      this.wave = sin(frameCount/this.bob) * this.tide;

      push();
        rotate(this.theta);
        rotate(frameCount/this.speed * this.direction);
        texture(this.texture);

        push();
          translate(-this.tip, 0); // Henge Pillar 1
          box(this.thickness, this.thickness, this.height + this.wave);
          
        pop();
        push();
          translate(0, 0, this.height/2 + this.wave/2); // Henge Connector
          box((this.tip * 2.1), this.thickness, this.thickness); // arch
        pop();

        push();
        translate(this.tip, 0); // Henge Pillar 2
        box(this.thickness, this.thickness, this.height + this.wave);
        pop();
      pop();
    
  }
}

class floaty{
  constructor() {
    this.x = random(-900, 400);
    this.y = random(-200, 1000);
    this.z = 100;

    this.float = 0;
    this.size = random(10, 100);
    this.thickness = this.size*0.6;
    this.texture = random(textures);
    this.bob = (40, 70);

  }

  show() {
    this.float = sin(frameCount/this.bob) *25;
    push();
      translate(this.x, this.y, this.z + this.float);

      texture(this.texture);
      torus(this.size, this.thickness);
      
    pop();
  }
}

class cloud {
  constructor() {
    this.x = random(-500, 500);
    this.y = random(-500, 500);
    this.z = 200; 
    this.shift = random(10, 200);
    this.mover = 0;

    this.size = random(50, 200);
  }
  
  show() {
    this.mover = noise(frameCount/500) * this.shift;
    push();
    translate(this.mover + this.x, this.mover + this.y, this.z);
    fill(255, 100);
    sphere(this.size);
  pop();
  }
}

class emanation {
  constructor() {
    this.theta = random(0, PI/2);
    this.slowdown = random(10, 200);
    this.xTurner = random(0, TWO_PI);
    this.yTurner = random(0, TWO_PI);
    this.zTurner = random(0, TWO_PI);

    this.z = 10000;
    this.radius = random(500, 1500);
    this.start = PI/2;
    this.stop = -PI/2;
  }

  show() {
    push();
      translate(0, 0, 400);
      noFill();
      strokeWeight(30);
      stroke(255, 255, 100);
      rotateX(this.xTurner);
      rotateY(this.yTurner);
      rotateZ(this.zTurner);

      rotate(frameCount/this.slowdown);
      
      arc(0, 0, this.radius, this.radius, this.start, this.stop);
    pop();

  }
}

class spire {
  constructor() {
    this.x = random(-600, 600);
    this.y = random(-600, 600);
    
    this.rotate = random(TWO_PI);

    this.radius = random(50, 100);
    this.thickness = random(30, 80);
    this.height = random(30, 70);

    this.colorR = random(100, 255);
    this.colorG = random(100, 255);
    this.colorB = random(100, 255);

    this.lift = 0;

    this.speed = random(90, 150);

  }

  show() {
    push();
    translate(this.x, this.y, -this.height/3);
    rotate(this.rotate);
    rotate(frameCount/this.speed);

    fill(this.colorR, this.colorG, this.colorB, 100);
      beginShape(TRIANGLE_STRIP);
      for (let i = 0; i < 20; i++) { // draw spire
      let xLoop = sin(i) * this.radius;
      let yLoop = cos(i) * this.radius;
      
       vertex(xLoop, yLoop, (i * this.height));
       vertex(xLoop, yLoop, this.thickness + (i * this.height));
      }
      endShape(CLOSE);
  pop();

  }
}
