var canvas = $('canvas')[0];
var context = canvas.getContext('2d');

var Dots = [];
var ID = 0;
var colors = ['#FF9900', '#424242', '#BCBCBC', '#3299BB', '#B9D3B0', '#81BDA4', '#F88F79', '#F6AA93'];
var maximum = 100;

function Dot() {
  this.active = true;
  this.id = ID; ID++;
  
  this.diameter = 2 + Math.random() * 7;

  this.x = Math.round(Math.random() * canvas.width);
  this.y = Math.round(Math.random() * canvas.height);
  
  this.velocity = {
    x: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.4,
    y: (Math.random() < 0.5 ? -1 : 1) * Math.random() * 0.4
  };

  this.alpha = 0.1;
  this.maxAlpha = this.diameter < 5 ? 0.3 : 0.8;
  this.hex = colors[Math.round(Math.random() * 7)];
  this.color = HexToRGBA(this.hex, this.alpha);
}

Dot.prototype = {
  Update: function() {
    if(this.alpha <= this.maxAlpha) {
      this.alpha += 0.005;
      this.color = HexToRGBA(this.hex, this.alpha);
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if(this.x > canvas.width + 5 || this.x < 0 - 5 || this.y > canvas.height + 5 || this.y < 0 - 5) {
      this.active = false;
    }
  },

  Draw: function() {
    context.strokeStyle = this.color;
    context.fillStyle = this.color;
    context.save();
    context.beginPath();
    context.translate(this.x, this.y);
    context.moveTo(0, -this.diameter);

    for (var i = 0; i < 7; i++)
    {
      context.rotate(Math.PI / 7);
      context.lineTo(0, -(this.diameter / 2));
      context.rotate(Math.PI / 7);
      context.lineTo(0, -this.diameter);
    }

    if(this.id % 2 == 0) {
      context.stroke();
    } else {
      context.fill();
    }
    
    context.closePath();
    context.restore();
  }
}

function Update() {
  GenerateDots();

  Dots.forEach(function(Dot) {
    Dot.Update();
  });

  Dots = Dots.filter(function(Dot) {
    return Dot.active;
  });

  Render();
  requestAnimationFrame(Update);
}

function Render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  Dots.forEach(function(Dot) {
    Dot.Draw();
  });
}

function GenerateDots() {
  if(Dots.length < maximum) {
    for(var i = Dots.length; i < maximum; i++) {
      Dots.push(new Dot());
    }
  }

  return false;
}

function HexToRGBA(hex, alpha) {
  var red = parseInt((TrimHex(hex)).substring(0, 2), 16);
  var green = parseInt((TrimHex(hex)).substring(2, 4), 16);
  var blue = parseInt((TrimHex(hex)).substring(4, 6), 16);

  return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')';
}

function TrimHex(hex) {
  return (hex.charAt(0) == "#") ? hex.substring(1, 7) : hex;
}

function WindowSize(width, height) {
  if(width != null) { canvas.width = width; } else { canvas.width = $(window).width(); }
  if(height != null) { canvas.height = height; } else { canvas.height = $(window).height(); }
  
}

$(window).resize(function() {
  Dots = [];
  WindowSize();
});

WindowSize();
GenerateDots();
Update();