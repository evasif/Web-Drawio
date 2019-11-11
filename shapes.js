
// Samanstendur af position x og position y
function Shape(x, y) {
  this.x = x;
  this.y = y;
}

Shape.prototype.render = function() {};

Shape.prototype.move = function(x, y) {
  this.x = x;
  this.y = y;
};

Shape.prototype.resize = function() {};

// Búum til kassa
function Rectangle(x, y, width, height, lineWidth, color) {
  // Erfum frá Shape
  Shape.call(this, x, y);
  this.width = width;
  this.height = height;
  this.lineWidth = lineWidth;
  this.color = color;
}

// Tengjum prótótýpuna við kassa sem erfir frá Shape
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.render = function() {
  // Teiknum fyrir kassann
  // Býr til útlínur fyrir kassa, fyllir ekki alveg
  // Hægt að útfæra með með fillStyle
  drawio.ctx.strokeStyle = this.color;
  drawio.ctx.lineWidth = this.lineWidth;
  drawio.ctx.strokeRect(this.x, this.y, this.width, this.height);
}

// Kallar á meðan mús er hreyfð
Rectangle.prototype.resize = function(x, y) {
  this.width = x - this.x;
  this.height = y - this.y;
}

Rectangle.prototype.move = function(x, y, height, width) {
  Shape.call(this, x, y);
  height = this.height;
  width = this.width;
}

// Búum til hring
function Circle(x, y, radius, lineWidth, color) {
  // Erfum frá Shape
  Shape.call(this, x, y);
  this.radius = radius;
  this.lineWidth = lineWidth;
  this.color = color;
}

// Tengjum prótótýpuna við hringinn sem erfir frá Shape
Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

// Teiknum hring
Circle.prototype.render = function() {
  drawio.ctx.beginPath();
  drawio.ctx.strokeStyle = this.color;
  drawio.ctx.lineWidth = this.lineWidth;
  drawio.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  drawio.ctx.stroke();
  drawio.ctx.closePath();
}

// Stækkum og minnkum hring út frá radíus og þvermáli
Circle.prototype.resize = function(x, y, radius) {
  this.radius = Math.sqrt((this.x * x) + (this.y * y)) / 2;
}

// Búum til línu
function Line(x, y, x1, y1, lineWidth, color) {
  // Erfum frá Shape
  Shape.call(this, x, y);
  this.x1 = x1;
  this.y1 = y1;
  this.lineWidth = lineWidth;
  this.color = color;
}

// Tengjum prótótýpuna við línu sem erfir frá Shape
Line.prototype = Object.create(Shape.prototype);
Line.prototype.constructor = Line;

// Teiknum línu
Line.prototype.render = function() {
  drawio.ctx.beginPath();
  drawio.ctx.strokeStyle = this.color;
  drawio.ctx.lineWidth = this.lineWidth;
  drawio.ctx.moveTo(this.x, this.y);
  drawio.ctx.lineTo(this.x1 + this.x, this.y1 + this.y);
  drawio.ctx.closePath();
  drawio.ctx.stroke();
}

Line.prototype.resize = function(x, y, x1, y1) {
  this.x1 = x - this.x;
  this.y1 = y - this.y;
}

// Búum til pensil
function Pencil(x, y, lineWidth, color) {
  // Erfum frá Shape
  Shape.call(this, x, y);
  this.clickX = new Array();
  this.clickY = new Array();
  this.clickDrag = new Array();
  this.lineWidth = lineWidth;
  this.color = color;
}

// Tengjum prótótýpuna við pensil sem erfir frá Shape
Pencil.prototype = Object.create(Shape.prototype);
Pencil.prototype.constructor = Pencil;

// Teiknum með pensil
Pencil.prototype.render = function() {
  for (var i = 0; i < this.clickX.length; i++) {
    drawio.ctx.strokeStyle = this.color;
    drawio.ctx.lineWidth = this.lineWidth;
    drawio.ctx.beginPath();
    if (this.clickDrag[i] && i) {
      drawio.ctx.moveTo(this.clickX[i - 1], this.clickY[i - 1]);
    }
    else {
      drawio.ctx.moveTo(this.clickX[i] - 1, this.clickY[i]);
    }
    drawio.ctx.lineTo(this.clickX[i], this.clickY[i]);
    drawio.ctx.closePath();
    drawio.ctx.stroke();
  }
}

Pencil.prototype.resize = function(x, y, dragging) {
  this.clickX.push(x);
  this.clickY.push(y);
  this.clickDrag.push(dragging);
}

// Búum til texta
function Text(x, y, text, font, color) {
  // Erfum frá Shape
  Shape.call(this, x, y);
  this.text = text;
  this.font = font;
  this.color = color;
}

// Tengjum prótótýpuna við texta sem erfir frá Shape
Text.prototype = Object.create(Shape.prototype);
Text.prototype.constructor = Text;

// Skrifum texta
Text.prototype.render = function() {
  var size = "40px ";
  var font = size.concat(this.font);
  drawio.ctx.fillStyle = this.color;
  drawio.ctx.font = font;
  drawio.ctx.beginPath();
  drawio.ctx.fillText(this.text, this.x, this.y);
  drawio.ctx.closePath();
}

Text.prototype.resize = function(x, y) {
  this.x = x;
  this.y = y;
}
