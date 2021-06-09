window.Game = {name:"Purple Rain", author:"<a href='https://discord.gg/tDb3DP3C'>Pywon</a>", desc:"Just some purple rain."};

class Drop
{
  constructor(position)
  {
    this.position = position;
    this.last = new Vector2(this.position.x, this.position.y);
    this.speed = clamp(this.position.z, 5, 20);
    this.init();
  }
  
  init()
  {
    this.display = new Line(new Vector2(this.position.x, this.position.y), new Vector2(this.position.x, this.position.y), 1, "#3a006b");
  }
  
  fall()
  {
    this.speed+=clamp(this.position.z/5, 1, 3);
    if(this.last.y <= 0)
    {
      this.position.y = random(window.innerHeight, window.innerHeight+500);
      this.last.y = this.position.y;
      this.speed = clamp(this.position.z, 5, 20);
    }
    else
      this.position.y-=this.speed;
  }
  
  show()
  {
    this.display.start = new Vector2(this.position.x, this.position.y);
    this.display.end = this.last.new();
    this.display.width = clamp(this.position.z/5, 1, 3);
    this.display.update();
    this.last = new Vector2(this.position.x, this.position.y);
  }
}

var amt = 500;
var drops = [];

function Start()
{
  document.body.style.backgroundColor = "#d3d3d3";
  
  for(var i = 0; i < amt; i++)
  {
    drops.push(new Drop(new Vector3(random(0, window.innerWidth), random(window.innerHeight, window.innerHeight+500), random(0, 20))));
  }
}

function Update()
{
  try
  {
  for(var i = 0; i < drops.length; i++)
  {
    drops[i].fall();
    drops[i].show();
  }
  }
  catch(error)
  {
    new Exception(error);
  }
}
