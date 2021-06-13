window.Game = {name:"Snake", author:"<a href='https://discord.gg/tDb3DP3C'>Pywon</a>", desc:"Old classic remake."};

class Snake
{
  constructor(position, dir)
  {
    this.spawn = position.new();
    this.position = position;
    if(dir === undefined)
      this.facing = new Dir2D("none");
    else
      this.facing = dir;
    this.newDir = this.facing;
    this.width = cellSize;
    this.body = [];
    
    this.init();
  }
  
  init()
  {
    this.body.push(new Box(this.position.new(), new Vector2(this.width, this.width)));
  }
  
  update()
  {
    this.facing = this.newDir;
    this.position = this.position.add(this.facing.toVector2().multi(this.width));
  }
  
  show()
  {
    var last = this.body.pop();
    last.position = this.position.new();
    last.update();
    this.body.unshift(last);
  }
  
  eat(pos)
  {
    if(this.position.equals(pos))
    {
      this.body.push(new Box(this.body[this.body.length-1].position.new(), new Vector2(this.width, this.width)));
      return true;
    }
    
    return false;
  }
  
  collides(pos)
  {
    if(this.body.length > 1)
    {
      for(var i = 1; i < this.body.length; i++)
      {
        if(this.body[i].position.equals(pos))
          return true;
      }
    }
    
    return false;
  }
  
  death(food)
  {
    if(this.body.length > 2)
    {
      if(this.collides(this.position))
      {
        for(var i = 0; i < this.body.length; i++)
        {
          this.body[i].display.remove();
        }
        this.body = [];
        this.body.push(new Box(this.position.new(), new Vector2(this.width, this.width)));
        this.position = this.spawn.new();
        return true;
      }
    }
    
    if(this.position.x < map.position.x-map.size.x/2 || this.position.x > map.position.x-map.size.x/2 + mapSize * cellSize || this.position.y < map.position.y-map.size.y/2 || this.position.y > map.position.y-map.size.y/2 + mapSize * cellSize)
    {
      for(var i = 0; i < this.body.length; i++)
      {
        this.body[i].display.remove();
      }
      this.body = [];
      this.body.push(new Box(this.position.new(), new Vector2(this.width, this.width)));
      this.position = this.spawn.new();
      return true;
    }
    
    return false;
  }
}

class Food
{
  constructor(position)
  {
    this.position = position;
    
    this.init();
  }
  
  init()
  {
    this.display = new Box(this.position.new(), new Vector2(cellSize, cellSize), "red");
  }
  
  relocate(snake)
  {
    var x = random(0, mapSize * cellSize);
    var y = random(0, mapSize * cellSize);
    x = parseInt(x/cellSize)*cellSize+map.position.x-parseInt(map.size.x/2)+cellSize/2;
    y = parseInt(y/cellSize)*cellSize+map.position.y-parseInt(map.size.y/2)+cellSize/2;
    this.position = new Vector2(x, y);
    
    while(snake.collides(this.position) || this.position.equals(snake.position))
    {
      var x = random(0, mapSize * cellSize);
      var y = random(0, mapSize * cellSize);
      x = parseInt(x/cellSize)*cellSize+map.position.x-parseInt(map.size.x/2)+cellSize/2;
      y = parseInt(y/cellSize)*cellSize+map.position.y-parseInt(map.size.y/2)+cellSize/2;
      this.position = new Vector2(x, y);
    }
    
    this.draw();
  }
  
  draw()
  {
    this.display.position = this.position.new();
    this.display.update();
  }
}

var map;
var s;
var food;

var mapSize = 21;
var cellSize = 20;

function Start()
{
  map = new Box(new Vector2(window.innerWidth/2, window.innerHeight/2), new Vector2(mapSize * cellSize, mapSize * cellSize), "black");
  map.display.style.outline = cellSize + "px solid white";
  
  s = new Snake(new Vector2(window.innerWidth/2, window.innerHeight/2));
  
  food = new Food(new Vector2());
  food.relocate(s);
  
  window.interval = 200;
}

function Update()
{
  if(s.death())
    food.relocate(s);
  s.update();
  s.show();
  if(s.eat(food.position))
    food.relocate(s);
}

function Keydown(event){
  if(event.keyCode == 37)
  {
    if(!s.facing.equals(new Dir2D("right")))
      s.newDir = new Dir2D("left");
  }
  else if(event.keyCode == 38)
  {
    if(!s.facing.equals(new Dir2D("down")))
      s.newDir = new Dir2D("up");
  }
  else if(event.keyCode == 39)
  {
    if(!s.facing.equals(new Dir2D("left")))
      s.newDir = new Dir2D("right");
  }
  else if(event.keyCode == 40)
  {
    if(!s.facing.equals(new Dir2D("up")))
      s.newDir = new Dir2D("down");
  }
}
