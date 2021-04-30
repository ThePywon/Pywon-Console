const FileCheck = {run:(callback) => {window.IsReady=true;callback({name:"Pacman", author:"<a href='https://discord.gg/pdgUD7R2'>Pywon</a>", desc:"A classic remade in javascript."});}};

class Vector2
{
  constructor(X = 0, Y = 0)
  {
    this.X = X;
    this.Y = Y;
  }
  
  Equals(value)
  {
    if(this.X == value.X && this.Y == value.Y)
      return true;
    else
      return false;
  }
  
  Add(value)
  {
    if(value.X !== undefined && value.Y !== undefined)
    {
      this.X += value.X;
      this.Y += value.Y;
    }
    else
    {
      if(typeof value == "object")
        LogError("Vector2 cannot make an addition with an object of type " + value.constructor.name);
      else
        LogError("Vector2 cannot make an addition with a " + typeof value);
    }
  }
  
  Substract(value)
  {
    if(value.X !== undefined && value.Y !== undefined)
    {
      this.X -= value.X;
      this.Y -= value.Y;
    }
    else
    {
      if(typeof value == "object")
        LogError("Vector2 cannot make an substraction with an object of type " + value.constructor.name);
      else
        LogError("Vector2 cannot make an substraction with a " + typeof value);
    }
  }
  
  Multiply(value)
  {
    if(value.X !== undefined && value.Y !== undefined)
    {
      this.X *= value.X;
      this.Y *= value.Y;
    }
    else
    {
      if(typeof value == "object")
        LogError("Vector2 cannot make a multiplication with an object of type " + value.constructor.name);
      else if(typeof value == "number")
      {
        this.X *= value;
        this.Y *= value;
      }
      else
        LogError("Vector2 cannot make a multiplication with a " + typeof value);
    }
  }
  
  Divide(value)
  {
    if(value.X !== undefined && value.Y !== undefined)
    {
      this.X /= value.X;
      this.Y /= value.Y;
    }
    else
    {
      if(typeof value == "object")
        LogError("Vector2 cannot make a multiplication with an object of type " + value.constructor.name);
      else if(typeof value == "number")
      {
        this.X /= value;
        this.Y /= value;
      }
      else
        LogError("Vector2 cannot make a multiplication with a " + typeof value);
    }
  }
  
  Distance(vector2)
  {
    if(vector2.X !== undefined && vector2.Y !== undefined)
    {
      var thirdPoint = new Vector2(this.X, vector2.Y);
      var a = Math.abs(thirdPoint.X - vector2.X);
      var b = Math.abs(thirdPoint.Y - this.Y);
      var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
      return c;
    }
    else
    {
      if(typeof vector2 == "object")
        LogError("Vector2 cannot calculate distance with an object of type " + value.constructor.name);
      else
        LogError("Vector2 cannot calculate distance with a " + typeof value);
    }
  }
}

class Pacman
{
  constructor(level, position, facing = "up")
  {
    this.level = level;
    this.position = new Vector2();
    this.position = position;
    this.speed = 5;
    this.facing = facing;
    this.sprites = ["Pacman2", "Pacman3", "Pacman2", "Pacman1"];
    this.animIndex = 0;
    this.animTimer = 1;
    
    this.Init();
  }
  
  Init()
  {
    this.Display = document.createElement("img");
    this.width = 24;
    this.height = 24;
    this.Display.style.width = 24;
    this.Display.style.height = 24;
    this.Display.style.position = "absolute";
    this.Display.src = "../Assets/Images/" + this.sprites[this.animIndex] + ".png";
    
    this.rotateDisplay();
    
    document.getElementById("Content").appendChild(this.Display);
    this.Display.style.left = this.position.X;
    this.Display.style.bottom = this.position.Y;
    this.Display.style.transition = "bottom 0.1s linear, left 0.1s linear";
    
    var Instance = this;
    
    var Update = setInterval(function()
    {
      Instance.move();
    }, 50)
  }
  
  rotateDisplay()
  {
    var Rotation = 0;
    if(this.facing.toLowerCase() == "right")
      Rotation = 0;
    else if(this.facing.toLowerCase() == "down")
      Rotation = 90;
    else if(this.facing.toLowerCase() == "left")
      Rotation = 180;
    else if(this.facing.toLowerCase() == "up")
      Rotation = -90;
    else
      LogError("Invalid facing direction used in Pacman.rotateDisplay()");
    
    this.Display.style.transform = "rotate(" + Rotation + "deg)";
  }
  
  move()
  {
    var movement = new Vector2();
    if(this.facing.toLowerCase() == "right")
    {
      if(this.position.X + this.speed < window.innerWidth-24 &&
      this.level.getLevelValue(this.level.getLevelIndex(new Vector2(this.position.X + this.speed + this.width-4, this.position.Y+4))) == 0 && this.level.getLevelValue(this.level.getLevelIndex(new Vector2(this.position.X + this.speed + this.width-4, this.position.Y + this.width-4))) == 0)
      {
        movement.Add(new Vector2(this.speed, 0));
      }
    }
    else if(this.facing.toLowerCase() == "down")
    {
      if(this.position.Y - this.speed > 0 && this.level.getLevelValue(this.level.getLevelIndex(new Vector2(this.position.X+4, this.position.Y-this.speed+4))) == 0 && this.level.getLevelValue(this.level.getLevelIndex(new Vector2(this.position.X + this.width-4, this.position.Y-this.speed+4))) == 0)
      {
        movement.Add(new Vector2(0, -this.speed));
      }
    }
    else if(this.facing.toLowerCase() == "left")
    {
      if(this.position.X - this.speed > 0 &&
      this.level.getLevelValue(this.level.getLevelIndex(new Vector2(this.position.X-this.speed+4, this.position.Y+4))) == 0 && this.level.getLevelValue(this.level.getLevelIndex(new Vector2(this.position.X-this.speed+4, this.position.Y + this.width-4))) == 0)
      {
        movement.Add(new Vector2(-this.speed, 0));
      }
    }
    else if(this.facing.toLowerCase() == "up")
    {
      if(this.position.Y + this.speed < window.innerHeight-24 &&
      this.level.getLevelValue(this.level.getLevelIndex(new Vector2(this.position.X+4, this.position.Y+this.speed + this.width-4))) == 0 && this.level.getLevelValue(this.level.getLevelIndex(new Vector2(this.position.X + this.width-4, this.position.Y+this.speed + this.width-4))) == 0)
      {
        movement.Add(new Vector2(0, this.speed));
      }
    }
    else
      LogError("Invalid facing direction used in Pacman.move()<br/>Direction: " + this.facing);
    
    if(!movement.Equals(new Vector2()))
    {
      this.position.Add(movement);
      if(this.position.X < this.level.position.X)
        this.position.X = this.level.position.X + this.level.size.X * this.level.cellSize - this.width;
      else if(this.position.X > this.level.position.X + this.level.size.X * this.level.cellSize - this.width)
        this.position.X = this.level.position.X;
      if(this.position.Y < this.level.position.Y)
        this.position.Y = this.level.position.Y + this.level.size.Y;
      else if(this.position.Y > this.level.position.Y + this.level.size.Y * this.level.cellSize - this.width)
        this.position.Y = this.level.position.Y + this.level.size.Y * this.level.cellSize - this.width;
      this.Display.style.left = this.position.X;
      this.Display.style.bottom = this.position.Y;
      this.animate();
    }
    else
    {
      this.animIndex = 0;
      this.Display.src = "../Assets/Images/" + this.sprites[this.animIndex] + ".png";
    }
  }
  
  rotate(facing)
  {
    if(facing.toLowerCase() == "right" ||
    facing.toLowerCase() == "down" ||
    facing.toLowerCase() == "left" ||
    facing.toLowerCase() == "up")
    {
      this.facing = facing;
      this.rotateDisplay();
    }
    else
      LogError("Invalid facing direction used in Pacman.rotate()");
  }
  
  animate()
  {
    if(this.animTimer > 0)
      this.animTimer -= 1;
    else
    {
      this.animTimer = 1;
      this.animIndex++;
      if(this.animIndex >= this.sprites.length)
        this.animIndex = 0;
    }
    
    this.Display.src = "../Assets/Images/" + this.sprites[this.animIndex] + ".png";
  }
}

class Ghost
{
  constructor(level, name, position, facing = "up")
  {
    this.level = level;
    this.name = name;
    this.speed = 3;
    this.facing = facing;
    this.state = "chase";
    this.position = new Vector2();
    this.position = position;
    this.animIndex = 0;
    this.animTimer = 0;
    
    this.Init();
  }
  
  Init()
  {
    this.Display = document.createElement("img");
    this.width = 28;
    this.height = 28;
    this.Display.style.width = this.width;
    this.Display.style.height = this.height;
    this.Display.style.position = "absolute";
    this.Display.src = "../Assets/Images/" + this.name.toLowerCase() + this.facing.toLowerCase() + (this.animIndex+1) + ".png";
    document.getElementById("Content").appendChild(this.Display);
    this.Display.style.left = this.position.X;
    this.Display.style.bottom = this.position.Y;
    this.Display.style.transition = "bottom " + (1/this.speed) + "s linear, left " + (1/this.speed) + "s linear";
    
    var Instance = this;
    
    var Update = setInterval(function(){
      try
      {
      Instance.move();
      }
      catch(error)
      {
        LogError(error);
      }
    }, 1000/this.speed);
  }
  
  setAI(AI)
  {
    this.AI = AI;
  }
  
  move()
  {
    //AI
    
    var targetPos = this.AI.getTargetPos();
    
    var movement = new Vector2();
    var closestDist;
    var lastDir;
    
    //Calculate direction
    
    if(this.facing != "left")
    {
      var newPos = new Vector2(this.position.X + this.width, this.position.Y);
      
      if(this.position.X + this.width < window.innerWidth-28 &&
      this.level.getLevelValue(this.level.getLevelIndex(new Vector2(newPos.X + this.width/2, newPos.Y + this.height/2))) == 0 || this.position.X + this.width < window.innerWidth-28 &&
      this.state != "chase" && this.level.getLevelValue(this.level.getLevelIndex(new Vector2(newPos.X + this.width/2, newPos.Y + this.height/2))) == 2)
      {
        var dist = Math.sqrt(Math.pow(newPos.X-targetPos.X, 2) + Math.pow(newPos.Y-targetPos.Y, 2));
        
        if(closestDist === undefined || dist <= closestDist)
        {
          closestDist = dist;
          lastDir = "right";
          movement = new Vector2(this.width, 0);
        }
      }
    }
    if(this.facing != "up")
    {
      var newPos = new Vector2(this.position.X, this.position.Y-this.height);
      
      if(this.position.Y - this.height > 0 &&
      this.level.getLevelValue(this.level.getLevelIndex(new Vector2(newPos.X + this.width/2, newPos.Y + this.height/2))) == 0 || this.position.Y - this.height > 0 && this.state != "chase" && this.level.getLevelValue(this.level.getLevelIndex(new Vector2(newPos.X + this.width/2, newPos.Y + this.height/2))) == 2)
      {
        var dist = Math.sqrt(Math.pow(newPos.X-targetPos.X, 2) + Math.pow(newPos.Y-targetPos.Y, 2));
        
        if(closestDist === undefined || dist <= closestDist)
        {
          closestDist = dist;
          lastDir = "down";
          movement = new Vector2(0, -this.height);
        }
      }
    }
    if(this.facing != "right")
    {
      var newPos = new Vector2(this.position.X-this.width, this.position.Y);
      
      if(this.position.X - this.width > 0 &&
      this.level.getLevelValue(this.level.getLevelIndex(new Vector2(newPos.X + this.width/2, newPos.Y + this.height/2))) == 0 ||
      this.position.X - this.width > 0 &&
      this.state != "chase" && this.level.getLevelValue(this.level.getLevelIndex(new Vector2(newPos.X + this.width/2, newPos.Y + this.height/2))) == 2)
      {
        var dist = Math.sqrt(Math.pow(newPos.X-targetPos.X, 2) + Math.pow(newPos.Y-targetPos.Y, 2));
        
        if(closestDist === undefined || dist <= closestDist)
        {
          closestDist = dist;
          lastDir = "left";
          movement = new Vector2(-this.width, 0);
        }
      }
    }
    if(this.facing != "down")
    {
      var newPos = new Vector2(this.position.X, this.position.Y+this.height);
      
      if(this.position.Y + this.height < window.innerHeight-28 &&
      this.level.getLevelValue(this.level.getLevelIndex(new Vector2(newPos.X + this.width/2, newPos.Y + this.height/2))) == 0 ||
      this.position.X + this.width < window.innerWidth-28 &&
      this.state != "chase" && this.level.getLevelValue(this.level.getLevelIndex(new Vector2(newPos.X + this.width/2, newPos.Y + this.height/2))) == 2)
      {
        var dist = Math.sqrt(Math.pow(newPos.X-targetPos.X, 2) + Math.pow(newPos.Y-targetPos.Y, 2));
        
        if(closestDist === undefined || dist <= closestDist)
        {
          closestDist = dist;
          lastDir = "up";
          movement = new Vector2(0, this.height);
        }
      }
    }
    
    //Move
    
    if(lastDir !== undefined)
      this.facing = lastDir;
    
    if(!movement.Equals(new Vector2()))
    {
      this.position.Add(movement);
      if(this.position.X < this.level.position.X)
        this.position.X = this.level.position.X + this.level.size.X * this.level.cellSize - this.width;
      else if(this.position.X > this.level.position.X + this.level.size.X * this.level.cellSize - this.width)
        this.position.X = this.level.position.X;
      if(this.position.Y < this.level.position.Y)
        this.position.Y = this.level.position.Y + this.level.size.Y;
      else if(this.position.Y > this.level.position.Y + this.level.size.Y * this.level.cellSize - this.width)
        this.position.Y = this.level.position.Y + this.level.size.Y * this.level.cellSize - this.width;
      this.Display.style.left = this.position.X;
      this.Display.style.bottom = this.position.Y;
      this.animate();
    }
    else
    {
      this.animIndex = 0;
      this.Display.src = "../Assets/Images/" + this.name.toLowerCase() + this.facing.toLowerCase() + (this.animIndex+1) + ".png";
    }
  }
  
  animate()
  {
    if(this.animTimer > 0)
      this.animTimer -= 1;
    else
    {
      this.animTimer = 0;
      this.animIndex++;
      if(this.animIndex >= 2)
        this.animIndex = 0;
    }
    
    this.Display.src = "../Assets/Images/" + this.name.toLowerCase() + this.facing.toLowerCase() + (this.animIndex+1) + ".png";
  }
}

class BlinkyAI
{
  constructor(target)
  {
    this.target = target;
  }
  
  getTargetPos()
  {
    return this.target.position;
  }
}

class PinkyAI
{
  constructor(level, target)
  {
    this.level = level;
    this.target = target;
  }
  
  getTargetPos()
  {
    return new Vector2(this.target.position.X + getV2fromDir(this.target.facing).X * 4 * this.level.cellSize, this.target.position.Y + getV2fromDir(this.target.facing).Y * 4 * this.level.cellSize);
  }
}

class InkyAI
{
  constructor(level, target, other)
  {
    this.level = level;
    this.target = target;
    this.other = other;
  }
  
  getTargetPos()
  {
    return new Vector2(this.target.position.X + getV2fromDir(this.target.facing).X * 2 * this.level.cellSize + -(this.other.position.X - (this.target.position.X + getV2fromDir(this.target.facing).X * 2 * this.level.cellSize)), this.target.position.Y + getV2fromDir(this.target.facing).Y * 2 * this.level.cellSize + -(this.other.position.Y - (this.target.position.Y + getV2fromDir(this.target.facing).Y * 2 * this.level.cellSize)));;
  }
}

class ClydeAI
{
  constructor(level, ghost, target)
  {
    this.level = level;
    this.ghost = ghost;
    this.target = target;
  }
  
  getTargetPos()
  {
    if(Math.sqrt(Math.pow(this.ghost.position.X - this.target.position.X, 2) + Math.pow(this.ghost.position.Y - this.target.position.Y, 2)) > this.level.cellSize*8)
      return this.target.position;
    else
      return this.level.position;
  }
}

class Tile
{
  constructor(level, position, levelIndex)
  {
    this.level = level;
    this.position = new Vector2();
    if(position.X !== undefined && position.Y !== undefined)
      this.position = position;
    else
      LogError("Invalid position was passed in Wall class.");
    this.levelIndex = new Vector2();
    if(levelIndex.X !== undefined && levelIndex.Y !== undefined)
      this.levelIndex = levelIndex;
    else
      LogError("Invalid level index was passed in Wall class.");
    
    this.Init();
    this.getTexture();
  }
  
  Init()
  {
    this.Display = document.createElement("img");
    document.getElementById("Content").appendChild(this.Display);
    this.Display.style.position = "absolute";
    this.Display.style.left = this.position.X;
    this.Display.style.bottom = this.position.Y;
    this.Display.style.width = this.level.cellSize;
    this.Display.style.height = this.level.cellSize;
  }
  
  getTexture()
  {
    var up = false;
    var down = false;
    var right = false;
    var left = false;
    var ul = false;
    var ur = false;
    var dl = false;
    var dr = false;
    
    up = this.level.getLevelValue(new Vector2(this.levelIndex.X, this.levelIndex.Y+1)) == "1";
    down = this.level.getLevelValue(new Vector2(this.levelIndex.X, this.levelIndex.Y-1)) == "1";
    right = this.level.getLevelValue(new Vector2(this.levelIndex.X+1, this.levelIndex.Y)) == "1";
    left = this.level.getLevelValue(new Vector2(this.levelIndex.X-1, this.levelIndex.Y)) == "1";
    ul = this.level.getLevelValue(new Vector2(this.levelIndex.X-1, this.levelIndex.Y+1)) == "1";
    ur = this.level.getLevelValue(new Vector2(this.levelIndex.X+1, this.levelIndex.Y+1)) == "1";
    dl = this.level.getLevelValue(new Vector2(this.levelIndex.X-1, this.levelIndex.Y-1)) == "1";
    dr = this.level.getLevelValue(new Vector2(this.levelIndex.X+1, this.levelIndex.Y-1)) == "1";
    
    if(this.level.getLevelValue(this.levelIndex) == "1")
    {
      if(up && down && right && left && ul && ur && dl && dr)
        this.Display.style.display = "none";
      
      if(!up && !down && !right && !left)
        this.Display.src = "../Assets/Images/WallTileSingle.png";
      
      if(!up && down && right && left && dl && dr)
        this.Display.src = "../Assets/Images/WallTileExposed.png";
      
      if(up && !down && right && left && ul && ur)
      {
        this.Display.src = "../Assets/Images/WallTileExposed.png";
        this.Display.style.transform = "rotate(180deg)";
      }
      
      if(up && down && !right && left && ul && dl)
      {
        this.Display.src = "../Assets/Images/WallTileExposed.png";
        this.Display.style.transform = "rotate(90deg)";
      }
      
      if(up && down && right && !left && ur && dr)
      {
        this.Display.src = "../Assets/Images/WallTileExposed.png";
        this.Display.style.transform = "rotate(-90deg)";
      }
      
      if(!up && down && !right && left && dl)
        this.Display.src = "../Assets/Images/WallTileOutsideSingleCorner.png";
      
      if(up && !down && !right && left && ul)
      {
        this.Display.src = "../Assets/Images/WallTileOutsideSingleCorner.png";
        this.Display.style.transform = "rotate(90deg)";
      }
      
      if(up && !down && right && !left && ur)
      {
        this.Display.src = "../Assets/Images/WallTileOutsideSingleCorner.png";
        this.Display.style.transform = "rotate(180deg)";
      }
      
      if(!up && down && right && !left && dr)
      {
        this.Display.src = "../Assets/Images/WallTileOutsideSingleCorner.png";
        this.Display.style.transform = "rotate(-90deg)";
      }
      
      if(!up && down && !right && left && !dl)
      {
        this.Display.src = "../Assets/Images/WallTileOutsideDoubleCorner.png";
        this.Display.style.transform = "rotate(180deg)";
      }
      
      if(up && !down && !right && left && !ul)
      {
        this.Display.src = "../Assets/Images/WallTileOutsideDoubleCorner.png";
        this.Display.style.transform = "rotate(-90deg)";
      }
      
      if(up && !down && right && !left && !ur)
        this.Display.src = "../Assets/Images/WallTileOutsideDoubleCorner.png";
      
      if(!up && down && right && !left && !dr)
      {
        this.Display.src = "../Assets/Images/WallTileOutsideDoubleCorner.png";
        this.Display.style.transform = "rotate(90deg)";
      }
      
      if(up && down && right && left && ul && !ur && dl && dr)
        this.Display.src = "../Assets/Images/WallTileSingleCorner.png";
        
      if(up && down && right && left && ul && ur && dl && !dr)
      {
        this.Display.src = "../Assets/Images/WallTileSingleCorner.png";
        this.Display.style.transform = "rotate(90deg)";
      }
      
      if(up && down && right && left && ul && ur && !dl && dr)
      {
        this.Display.src = "../Assets/Images/WallTileSingleCorner.png";
        this.Display.style.transform = "rotate(180deg)";
      }
      
      if(up && down && right && left && !ul && ur && dl && dr)
      {
        this.Display.src = "../Assets/Images/WallTileSingleCorner.png";
        this.Display.style.transform = "rotate(-90deg)";
      }
      
      if(!up && down && right && left && !dl && dr)
        this.Display.src = "../Assets/Images/WallTileExposedSingleCorner.png";
      
      if(up && down && !right && left && !ul && dl)
      {
        this.Display.src = "../Assets/Images/WallTileExposedSingleCorner.png";
        this.Display.style.transform = "rotate(90deg)";
      }
      
      if(up && !down && right && left && ul && !ur)
      {
        this.Display.src = "../Assets/Images/WallTileExposedSingleCorner.png";
        this.Display.style.transform = "rotate(180deg)";
      }
      
      if(up && down && right && !left && ur && !dr)
      {
        this.Display.src = "../Assets/Images/WallTileExposedSingleCorner.png";
        this.Display.style.transform = "rotate(-90deg)";
      }
      
      if(!up && down && right && left && dl && !dr)
        this.Display.src = "../Assets/Images/WallTileExposedSingleCorner2.png";
      
      if(up && down && !right && left && ul && !dl)
      {
        this.Display.src = "../Assets/Images/WallTileExposedSingleCorner2.png";
        this.Display.style.transform = "rotate(90deg)";
      }
      
      if(up && !down && right && left && !ul && ur)
      {
        this.Display.src = "../Assets/Images/WallTileExposedSingleCorner2.png";
        this.Display.style.transform = "rotate(180deg)";
      }
      
      if(up && down && right && !left && !ur && dr)
      {
        this.Display.src = "../Assets/Images/WallTileExposedSingleCorner2.png";
        this.Display.style.transform = "rotate(-90deg)";
      }
      
      if(!up && down && right && left && !dl && !dr)
        this.Display.src = "../Assets/Images/WallTileExposedDoubleCorner.png";
      
      if(up && down && !right && left && !ul && !dl)
      {
        this.Display.src = "../Assets/Images/WallTileExposedDoubleCorner.png";
        this.Display.style.transform = "rotate(90deg)";
      }
      
      if(up && !down && right && left && !ul && !ur)
      {
        this.Display.src = "../Assets/Images/WallTileExposedDoubleCorner.png";
        this.Display.style.transform = "rotate(180deg)";
      }
      
      if(up && down && right && !left && !ur && !dr)
      {
        this.Display.src = "../Assets/Images/WallTileExposedDoubleCorner.png";
        this.Display.style.transform = "rotate(-90deg)";
      }
      
      if(up && down && !right && !left)
        this.Display.src = "../Assets/Images/WallTileLinear.png";
      
      if(!up && !down && right && left)
      {
        this.Display.src = "../Assets/Images/WallTileLinear.png";
        this.Display.style.transform = "rotate(90deg)";
      }
      
      if(!up && down && !right && !left)
        this.Display.src = "../Assets/Images/WallTileBit.png";
      
      if(!up && !down && !right && left)
      {
        this.Display.src = "../Assets/Images/WallTileBit.png";
        this.Display.style.transform = "rotate(90deg)";
      }
      
      if(up && !down && !right && !left)
      {
        this.Display.src = "../Assets/Images/WallTileBit.png";
        this.Display.style.transform = "rotate(180deg)";
      }
      
      if(!up && !down && right && !left)
      {
        this.Display.src = "../Assets/Images/WallTileBit.png";
        this.Display.style.transform = "rotate(-90deg)";
      }
    }
    else if(this.level.getLevelValue(this.levelIndex) == "2")
    {
      this.Display.src = "../Assets/Images/BarrierTile.png";
      
      if(up && down)
        this.Display.style.transform = "rotate(90deg)";
    }
  }
}

class Level
{
  constructor(data, cellSize)
  {
    this.cellSize = cellSize;
    this.setData(data);
    this.position = new Vector2(parseInt(((window.innerWidth)-this.size.X*this.cellSize)/2/this.cellSize)*this.cellSize, (window.innerHeight-this.size.Y*this.cellSize)/2);
    this.createLevel();
  }
  
  setData(data)
  {
    for(var i = 0; i < data.length; i++)
    {
      if(this.size === undefined)
        this.size = new Vector2(data[i].length, data.length);
      else if(this.size.X > data[i].length)
        this.size.X = data[i].length;
    }
    
    this.data = []
    
    for(var i = 0; i < this.size.Y; i++)
      this.data.push(data[i].slice(0, this.size.X));
  }
  
  createLevel()
  {
    for(var x = 0; x < this.size.X; x++)
    {
      for(var y = 0; y < this.size.Y; y++)
      {
        if(this.getLevelValue(new Vector2(x, y)) != "0")
          new Tile(this, new Vector2(this.position.X+x*this.cellSize, this.position.Y+y*this.cellSize), new Vector2(x, y));
      }
    }
  }
  
  getLevelIndex(V2)
  {
    var vector2 = new Vector2();
    if(vector2.X !== undefined && vector2.Y !== undefined)
      vector2 = V2;
    else
      LogError("Invalid position was passed in getLevelValue()");
      
    vector2.Substract(this.position);
    vector2.Divide(this.cellSize);
    vector2 = new Vector2(parseInt(vector2.X), parseInt(vector2.Y));
    
    return vector2;
  }
  
  getLevelValue(V2)
  {
    var vector2 = new Vector2();
    if(vector2.X !== undefined && vector2.Y !== undefined)
      vector2 = V2;
    else
      LogError("Invalid position was passed in getLevelValue()");
      
    if(vector2.X >= 0 && vector2.X < this.size.X &&
    vector2.Y >= 0 && vector2.Y < this.size.Y)
      return parseInt(this.data[this.data.length-vector2.Y-1].charAt(vector2.X));
    else
      return 0;
  }
}

var UIdiv;
var target1;
var target2;
var target3;
var target4;

function Start()
{
  setupFonts();
  setupUI();
  
  var CurrentLevel = new Level([
  "11111111111111111111111",
  "10000000000100000000001",
  "10111011110101111011101",
  "10111011110101111011101",
  "10000000000000000000001",
  "10111010111111101011101",
  "10000010000100001000001",
  "11111011110101111011111",
  "11111010000000001011111",
  "11111010111211101011111",
  "00000000100000100000000",
  "11111010111111101011111",
  "11111010000000001011111",
  "11111010111111101011111",
  "10000000000100000000001",
  "10111011110101111011101",
  "10001000000000000010001",
  "11101010111111101010111",
  "10000010000100001000001",
  "10111111110101111111101",
  "10000000000000000000001",
  "11111111111111111111111"
  ], 28);
  
  var PlayerInstance = new Pacman(CurrentLevel, new Vector2(CurrentLevel.position.X + 11 * CurrentLevel.cellSize, CurrentLevel.position.Y + 9 * CurrentLevel.cellSize));
  
  document.addEventListener('keydown', function(event) {
    if(event.keyCode == 37) {
      PlayerInstance.rotate("left");
    }
    else if(event.keyCode == 38) {
      PlayerInstance.rotate("up");
    }
    else if(event.keyCode == 39) {
      PlayerInstance.rotate("right");
    }
    else if(event.keyCode == 40) {
      PlayerInstance.rotate("down");
    }
  });
  
  try
  {
  var Blinky = new Ghost(CurrentLevel, "Blinky", new Vector2(CurrentLevel.position.X + 11 * CurrentLevel.cellSize, CurrentLevel.position.Y + 12 * CurrentLevel.cellSize));
  Blinky.setAI(new BlinkyAI(PlayerInstance));
  var Pinky = new Ghost(CurrentLevel, "Pinky", new Vector2(CurrentLevel.position.X + 11 * CurrentLevel.cellSize, CurrentLevel.position.Y + 12 * CurrentLevel.cellSize));
  Pinky.setAI(new PinkyAI(CurrentLevel, PlayerInstance));
  var Inky = new Ghost(CurrentLevel, "Inky", new Vector2(CurrentLevel.position.X + 11 * CurrentLevel.cellSize, CurrentLevel.position.Y + 12 * CurrentLevel.cellSize));
  Inky.setAI(new InkyAI(CurrentLevel, PlayerInstance, Blinky));
  var Clyde = new Ghost(CurrentLevel, "Clyde", new Vector2(CurrentLevel.position.X + 11 * CurrentLevel.cellSize, CurrentLevel.position.Y + 12 * CurrentLevel.cellSize));
  Clyde.setAI(new ClydeAI(CurrentLevel, Clyde, PlayerInstance));
  }
  catch(error)
  {
    LogError(error);
  }
}

function setupFonts()
{
  var MainFont = new FontFace('Main', 'url(../Assets/Fonts/Pacman.woff) format("woff"), url(../Assets/Fonts/Pacman.ttf) format("truetype")');
  MainFont.load().then(function(font){document.fonts.add(font);});
}

function setupUI()
{
  UIdiv = document.createElement("div");
  document.getElementById("Content").appendChild(UIdiv);
  UIdiv.style.margin = "auto";
  UIdiv.style.width = "100%";
  UIdiv.style.height = 60;
  UIdiv.style.color = "white";
  var scoreText = document.createElement("p");
  scoreText.style.fontFamily = "Main";
  scoreText.style.fontSize = 16;
  scoreText.innerHTML = "HIGH SCORE";
  UIdiv.appendChild(scoreText);
}

function getV2fromDir(dir)
{
  if(dir.toLowerCase() == "up")
    return new Vector2(0, 1);
  else if(dir.toLowerCase() == "right")
    return new Vector2(1, 0);
  else if(dir.toLowerCase() == "down")
    return new Vector2(0, -1);
  else if(dir.toLowerCase() == "left")
    return new Vector2(-1, 0);
  else
    LogError("Invalid position passed in getV2fromDir()");
  
  return new Vector2();
}
