const FileCheck = {run:(callback) => {window.IsReady=true;callback({name:"Star Field", author:"<a href='https://discord.gg/tDb3DP3C'>Pywon</a>", desc:"Just a star field :)"});}};

class Star
{
  constructor()
  {
    var x = random(0, window.innerWidth-8);
    var y = random(0, window.innerHeight-8);
    var z = parseInt(random(1, window.innerWidth/10));
    this.position = new Vector3(x, y, z);
    this.init();
  }
  
  init()
  {
    this.line = new Line(new Vector2(this.position.x, this.position.y), new Vector2(this.position.x, this.position.y));
    this.display = new Circle(new Vector2(this.position.x, this.position.y), 0);
  }
  
  update()
  {
    this.previous = new Vector2(this.position.x, this.position.y);
    
    this.position.z--;
    if(this.position.z < 1)
    {
      this.position.x = random(0, window.innerWidth-8);
      this.position.y = random(0, window.innerHeight-8);
      this.position.z = parseInt(random(1, window.innerWidth/10));
      this.previous = new Vector2(this.position.x, this.position.y);
    }
    
    var dirX = this.position.x - window.innerWidth/2;
    var dirY = this.position.y - window.innerHeight/2;
    
    this.position = this.position.add(new Vector3(dirX, dirY).div(this.position.z));
  }
  
  show()
  {
    var size = (1-normalize(this.position.z, 0, window.innerWidth/10)) * 8;
    this.line.start = this.previous.new();
    this.line.end = new Vector2(this.position.x, this.position.y);
    this.line.update();
    this.display.position = new Vector2(this.position.x, this.position.y);
    this.display.width = size;
    this.display.update();
  }
}

var amt = 400;
var stars = [];

function Start()
{
  for(var i = 0; i < amt; i++)
  {
    stars.push(new Star());
  }
  
  var Update = setInterval(function(){
    draw();
  }, 50);
}

function draw()
{
  for(var i = 0; i < stars.length; i++)
  {
    stars[i].update();
    stars[i].show();
  }
}