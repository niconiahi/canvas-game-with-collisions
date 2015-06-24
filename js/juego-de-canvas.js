/////////////////////////////////////////////////////////
/// Variables
/////////////////////////////////////////////////////////

var scenario;

var arrowKeys = {
  up: 38,
  down: 40,
  izq: 37,
  der: 39
};

var background = {
  backgroundPath: 'img/fondo.png',
  backgroundReady: false
};

var diana = {
  dianaPath: {
    front: 'img/diana-frente.png',
    back: 'img/diana-atras.png',
    der: 'img/diana-der.png',
    izq: 'img/diana-izq.png'
  },
  dianaReady: false,
  X: 100,
  Y: 100,
  speed: 50,
  bannedPathOne: function(toMoveX, toMoveY) {
    return !(toMoveY > 150 && toMoveY < 250 && toMoveX < 150);
  },
  bannedPathTwo: function(toMoveX, toMoveY) {
    return !(toMoveY > 300 && toMoveY < 400 && toMoveX > 100);
  },
  bannedPathThree: function(toMoveX, toMoveY) {
    return !(toMoveX > 150 && toMoveX < 250 && toMoveY < 250);
  },
  bannedPathFour: function(toMoveX, toMoveY) {
    return !(toMoveX > 450 || toMoveX < 0 || toMoveY > 450 || toMoveY < 0);
  },
  noBannedPath: function(toMoveX, toMoveY) {
    return this.bannedPathOne(toMoveX, toMoveY) && this.bannedPathTwo(toMoveX, toMoveY) && this.bannedPathThree(toMoveX, toMoveY) && this.bannedPathFour(toMoveX, toMoveY);
  }
};

var liz = {
  lizPath: 'img/liz.png',
  lizReady: false,
  X: 350,
  Y: 200
};

/////////////////////////////////////////////////////////
/// Main function
/////////////////////////////////////////////////////////

function main() {
  scenario = document.getElementById('fondo').getContext('2d');

  document.addEventListener('keydown', keyPressed);

  background.image = new Image();
  background.image.src = background.backgroundPath;
  background.image.onload = confirmBackground;

  diana.frontImage = new Image();
  diana.frontImage.src = diana.dianaPath.front;
  diana.frontImage.onload = confirmDiana;

  diana.backImage = new Image();
  diana.backImage.src = diana.dianaPath.back;
  diana.backImage.onload = confirmDiana;

  diana.derImage = new Image();
  diana.derImage.src = diana.dianaPath.der;
  diana.derImage.onload = confirmDiana;

  diana.izqImage = new Image();
  diana.izqImage.src = diana.dianaPath.izq;
  diana.izqImage.onload = confirmDiana;

  liz.image = new Image();
  liz.image.src = liz.lizPath;
  liz.image.onload = confirmLiz;
}

/////////////////////////////////////////////////////////
/// Functions
/////////////////////////////////////////////////////////

function confirmBackground() {
  background.backgroundReady = true;
  draw();
}

function confirmDiana() {
  diana.dianaReady = true;
}

function confirmLiz() {
  liz.lizReady = true;
  draw();
}

function draw(keyCode) {
  var dianaDirection = diana.frontImage;

  /////////////
  //Background
  /////////////

  if (background.backgroundReady) {
    scenario.drawImage(background.image, 0, 0);
  }

  ////////////
  //Liz
  ////////////

  if (liz.lizReady) {
    scenario.drawImage(liz.image, liz.X, liz.Y);
  }

  ////////////
  //Diana
  ////////////

  if (diana.dianaReady) {
    if (keyCode == arrowKeys.up) {
      var toMoveY = diana.Y - diana.speed;

      if (diana.noBannedPath(diana.X, toMoveY)) {
        diana.Y = toMoveY;
        dianaDirection = diana.backImage;
      }
    } else if (keyCode == arrowKeys.down) {
      var toMoveY = diana.Y + diana.speed;

      if (diana.noBannedPath(diana.X, toMoveY)) {
        diana.Y = toMoveY;
        dianaDirection = diana.frontImage;
      }
    } else if (keyCode == arrowKeys.der) {
      var toMoveX = diana.X + diana.speed;

      if (diana.noBannedPath(toMoveX, diana.Y)) {
        diana.X = toMoveX;
        dianaDirection = diana.derImage;
      }
    } else if (keyCode == arrowKeys.izq) {
      var toMoveX = diana.X - diana.speed;

      if (diana.noBannedPath(toMoveX, diana.Y)) {
        diana.X = toMoveX;
        dianaDirection = diana.izqImage;
      }
    }
  }
  scenario.drawImage(dianaDirection, diana.X, diana.Y);
}

function keyPressed(key) {
  var keyCode = key.keyCode;
  draw(keyCode);
}
