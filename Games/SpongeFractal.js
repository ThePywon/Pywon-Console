window.Game = {name:"Menger Sponge Fractal", author:"<a href='https://discord.gg/tDb3DP3C'>Pywon</a>", desc:"Fractal.<br/>(do NOT press the screen more than 5 times)"};

class Frac
{
  constructor(position, size)
  {
    this.position = position;
    this.size = size;
    this.init();
  }
  
  init()
  {
    //var r = random(0, 255);
    //var g = random(0, 255);
    //var b = random(0, 255);
    this.display = new Box(this.position.new(), this.size.new()/*, "rgb(" + r + ", " + g + ", " + b + ")"*/);
  }
  
  generate()
  {
    var boxes = [];
    for(var x = -1; x < 2; x++)
    {
      for(var y = -1; y < 2; y++)
      {
        if(x != 0 || y != 0)
        {
          var newSize = this.size.div(3);
          var newPos = new Vector2(
              this.position.x+(x+1)*newSize.x,
              this.position.y+(y+1)*newSize.y);
          var b = new Frac(newPos.new(), newSize.new());
          boxes.push(b);
        }
      }
    }
    return boxes;
  }
}

var box;
var sponge = [];

function Start()
{
  var pos = new Vector2(window.innerWidth, window.innerHeight).div(2);
  var size = new Vector2(243, 243);
  box = new Frac(pos.sub(size.div(2)), size.new());
  sponge.push(box);
}

content.onclick = function()
{
  var next = [];
  var max = sponge.length;
  for(var b = 0; b < max; b++)
  {
    var newBoxes = sponge[b].generate();
    sponge[b].display.display.remove();
    next = [].concat(next, newBoxes);
  }
  sponge = next;
}
