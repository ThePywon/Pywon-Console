const FileCheck = {run:(callback) => {window.IsReady=true;callback({name:"Pacman", author:"<a href='https://discord.gg/pdgUD7R2'>Pywon</a>", desc:"A classic remade in javascript."});}};

class Pacman
{
  constructor(level, position, facing = "up")
  {
    this.level = level;
    this.width = 24;
    this.height = 24;
    this.speed = 5;
    this.position = new Vector2(this.level.position.X + position.X * this.level.cellSize + this.level.cellSize/2 - this.width/2, this.level.position.Y + position.Y * this.level.cellSize + this.level.cellSize/2 - this.height/2);
    this.facing = facing;
    this.sprites = ["Pacman2", "Pacman3", "Pacman2", "Pacman1"];
    this.animIndex = 0;
    this.animTimer = 1;
    
    this.Init();
  }
  
  Init()
  {
    this.Display = document.createElement("img");
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
      //Collect pellets
      for(var i = 0; i < Instance.level.pellets.length; i++)
      {
        if(Instance.level.getLevelIndex(new Vector2(Instance.level.pellets[i].position.X, Instance.level.pellets[i].position.Y)).Equals(Instance.level.getLevelIndex(new Vector2(Instance.position.X + Instance.width/2, Instance.position.Y + Instance.height/2))))
        if(Math.sqrt(Math.pow(Instance.position.X - Instance.level.pellets[i].position.X, 2) + Math.pow(Instance.position.Y - Instance.level.pellets[i].position.Y, 2)) <= Instance.width/2)
        {
          Instance.level.pellets[i].collect();
          return;
        }
      }
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
    
    var val1 = this.level.getLevelValue(this.level.getLevelIndex(new Vector2(this.position.X + getV2fromDir(this.facing).X * this.speed + this.width-4, this.position.Y + getV2fromDir(this.facing).Y * this.speed +4)));
    
    var val2 = this.level.getLevelValue(this.level.getLevelIndex(new Vector2(this.position.X + getV2fromDir(this.facing).X * this.speed + this.width-4, this.position.Y + getV2fromDir(this.facing).Y * this.speed + this.height-4)));
    
    var val3 = this.level.getLevelValue(this.level.getLevelIndex(new Vector2(this.position.X + getV2fromDir(this.facing).X * this.speed +4, this.position.Y + getV2fromDir(this.facing).Y * this.speed +4)));
    
    var val4 = this.level.getLevelValue(this.level.getLevelIndex(new Vector2(this.position.X + getV2fromDir(this.facing).X * this.speed+4, this.position.Y + getV2fromDir(this.facing).Y * this.speed + this.height-4)));
    
    if(this.position.X + getV2fromDir(this.facing).X * this.speed < window.innerWidth - this.width && this.position.Y + getV2fromDir(this.facing).Y * this.speed < window.innerHeight - this.height && this.position.X + getV2fromDir(this.facing).X * this.speed > 0 && this.position.Y + getV2fromDir(this.facing).Y * this.speed > 0 &&
      (val1 == 0 || val1 == 3) && (val2 == 0 || val2 == 3) && (val3 == 0 || val3 == 3) && (val4 == 0 || val4 == 3))
    {
      movement.Add(new Vector2(getV2fromDir(this.facing).X*this.speed, getV2fromDir(this.facing).Y*this.speed));
    }
    
    if(!movement.Equals(new Vector2()))
    {
      this.position.Add(movement);
      if(this.position.X < this.level.position.X)
        this.position.X = this.level.position.X + this.level.size.X * this.level.cellSize - this.width;
      else if(this.position.X > this.level.position.X + this.level.size.X * this.level.cellSize - this.width)
        this.position.X = this.level.position.X;
      if(this.position.Y < this.level.position.Y)
        this.position.Y = this.level.position.Y + this.level.size.Y * this.level.cellSize - this.height;
      else if(this.position.Y > this.level.position.Y + this.level.size.Y * this.level.cellSize - this.height)
        this.position.Y = this.level.position.Y;
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
      if(this.facing != facing)
      {
        var val1 = this.level.getLevelValue(this.level.getLevelIndex(new Vector2(this.position.X + this.width/2 + getV2fromDir(this.facing).X*this.level.cellSize, this.position.Y + this.height/2 + getV2fromDir(this.facing).Y*this.level.cellSize)));
        
        var val2 = this.level.getLevelValue(this.level.getLevelIndex(new Vector2(this.position.X + this.width/2 + getV2fromDir(facing).X*this.level.cellSize, this.position.Y + this.height/2 + getV2fromDir(facing).Y*this.level.cellSize)));
        
        if((val1 == 0 || val1 == 3) && (val2 == 0 || val2 == 3) && this.facing != invertDir(facing))
        {
          var pos = this.level.getLevelIndex(new Vector2(this.position.X + this.width/2, this.position.Y + this.height/2));
          this.position = new Vector2(pos.X * this.level.cellSize + this.level.position.X + this.level.cellSize/2 - this.width/2, pos.Y * this.level.cellSize + this.level.position.Y + this.level.cellSize/2 - this.height/2);
        }
        
        this.facing = facing;
        
        this.rotateDisplay();
      }
      
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
    this.width = 28;
    this.height = 28;
    this.facing = facing;
    this.state = "chase";
    this.position = new Vector2(this.level.position.X + position.X * this.level.cellSize + this.level.cellSize/2 - this.width/2, this.level.position.Y + position.Y * this.level.cellSize + this.level.cellSize/2 - this.height/2);
    this.animIndex = 0;
    this.animTimer = 0;
    
    this.Init();
  }
  
  Init()
  {
    this.Display = document.createElement("img");
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
      Instance.move();
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
    
    var dirs = ["right", "down", "left", "up"];
    for(var i = 0; i < dirs.length; i++)
    {
      if(invertDir(dirs[i]) != this.facing)
      {
        var dir = dirs[i];
        var newPos = new Vector2(this.position.X + (getV2fromDir(dir).X * this.level.cellSize), this.position.Y + (getV2fromDir(dir).Y * this.level.cellSize));
        var val = this.level.getLevelValue(this.level.getLevelIndex(new Vector2(newPos.X + this.width/2, newPos.Y + this.height/2)));
        
        if(newPos.Y < window.innerHeight-this.level.cellSize &&
        newPos.X < window.innerWidth-this.level.cellSize && newPos.Y > 0 && newPos.X > 0 && (val
         == 0 || val == 3) ||
        newPos.Y < window.innerHeight-this.level.cellSize &&
        newPos.X < window.innerWidth-this.level.cellSize && newPos.Y > 0 && newPos.X > 0 &&
        this.state != "chase" && val
         == 2)
        {
          var dist = Math.sqrt(Math.pow(newPos.X-targetPos.X, 2) + Math.pow(newPos.Y-targetPos.Y, 2));
          
          if(closestDist === undefined || dist <= closestDist)
          {
            closestDist = dist;
            lastDir = dir;
            movement = new Vector2(getV2fromDir(lastDir).X * this.level.cellSize, getV2fromDir(lastDir).Y * this.level.cellSize);
          }
        }
      }
    }
    
    if(movement.Equals(new Vector2()))
    {
      var newPos = new Vector2(this.position.X + -(getV2fromDir(this.facing).X * this.width), this.position.Y + -(getV2fromDir(this.facing).Y * this.height));
      var val = this.level.getLevelValue(this.level.getLevelIndex(new Vector2(newPos.X + this.width/2, newPos.Y + this.height/2)));
      
      if(newPos.Y < window.innerHeight-this.height &&
      newPos.X < window.innerWidth-this.width && newPos.Y > 0 && newPos.X > 0 && (val
       == 0 || val == 3) ||
      newPos.Y < window.innerHeight-this.height &&
      newPos.X < window.innerWidth-this.width && newPos.Y > 0 && newPos.X > 0 &&
      this.state != "chase" && val
       == 2)
      {
        lastDir = invertDir(this.facing);
        movement = new Vector2(getV2fromDir(lastDir).X * this.width, getV2fromDir(lastDir).Y * this.height);
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
        this.position.Y = this.level.position.Y + this.level.size.Y * this.level.cellSize - this.height;
      else if(this.position.Y > this.level.position.Y + this.level.size.Y * this.level.cellSize - this.width)
        this.position.Y = this.level.position.Y;
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

class Pellet
{
  constructor(level, position)
  {
    this.level = level;
    this.position = position;
    this.Init();
  }
  
  Init()
  {
    this.Display = document.createElement("img");
    document.getElementById("Content").appendChild(this.Display);
    this.Display.src = "../Assets/Images/Pellet.png";
    this.Display.style.width = this.level.cellSize;
    this.Display.style.height = this.level.cellSize;
    this.Display.style.position = "absolute";
    this.Display.style.left = this.position.X;
    this.Display.style.bottom = this.position.Y;
  }
  
  collect()
  {
    this.Display.remove();
    Score+=10;
    updateScoreDisplay();
    this.level.pellets.splice(this.level.pellets.indexOf(this), 1);
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
      else if(!up && !down && !right && !left)
        this.Display.src = "../Assets/Images/WallTileSingle.png";
      else if(!up && down && right && left && dl && dr)
        this.Display.src = "../Assets/Images/WallTileExposed.png";
      else if(up && !down && right && left && ul && ur)
      {
        this.Display.src = "../Assets/Images/WallTileExposed.png";
        this.Display.style.transform = "rotate(180deg)";
      }
      else if(up && down && !right && left && ul && dl)
      {
        this.Display.src = "../Assets/Images/WallTileExposed.png";
        this.Display.style.transform = "rotate(90deg)";
      }
      else if(up && down && right && !left && ur && dr)
      {
        this.Display.src = "../Assets/Images/WallTileExposed.png";
        this.Display.style.transform = "rotate(-90deg)";
      }
      else if(!up && down && !right && left && dl)
        this.Display.src = "../Assets/Images/WallTileOutsideSingleCorner.png";
      else if(up && !down && !right && left && ul)
      {
        this.Display.src = "../Assets/Images/WallTileOutsideSingleCorner.png";
        this.Display.style.transform = "rotate(90deg)";
      }
      else if(up && !down && right && !left && ur)
      {
        this.Display.src = "../Assets/Images/WallTileOutsideSingleCorner.png";
        this.Display.style.transform = "rotate(180deg)";
      }
      else if(!up && down && right && !left && dr)
      {
        this.Display.src = "../Assets/Images/WallTileOutsideSingleCorner.png";
        this.Display.style.transform = "rotate(-90deg)";
      }
      else if(!up && down && !right && left && !dl)
      {
        this.Display.src = "../Assets/Images/WallTileOutsideDoubleCorner.png";
        this.Display.style.transform = "rotate(180deg)";
      }
      else if(up && !down && !right && left && !ul)
      {
        this.Display.src = "../Assets/Images/WallTileOutsideDoubleCorner.png";
        this.Display.style.transform = "rotate(-90deg)";
      }
      else if(up && !down && right && !left && !ur)
        this.Display.src = "../Assets/Images/WallTileOutsideDoubleCorner.png";
      else if(!up && down && right && !left && !dr)
      {
        this.Display.src = "../Assets/Images/WallTileOutsideDoubleCorner.png";
        this.Display.style.transform = "rotate(90deg)";
      }
      else if(up && down && right && left && ul && !ur && dl && dr)
        this.Display.src = "../Assets/Images/WallTileSingleCorner.png";
      else if(up && down && right && left && ul && ur && dl && !dr)
      {
        this.Display.src = "../Assets/Images/WallTileSingleCorner.png";
        this.Display.style.transform = "rotate(90deg)";
      }
      else if(up && down && right && left && ul && ur && !dl && dr)
      {
        this.Display.src = "../Assets/Images/WallTileSingleCorner.png";
        this.Display.style.transform = "rotate(180deg)";
      }
      else if(up && down && right && left && !ul && ur && dl && dr)
      {
        this.Display.src = "../Assets/Images/WallTileSingleCorner.png";
        this.Display.style.transform = "rotate(-90deg)";
      }
      else if(!up && down && right && left && !dl && dr)
        this.Display.src = "../Assets/Images/WallTileExposedSingleCorner.png";
      else if(up && down && !right && left && !ul && dl)
      {
        this.Display.src = "../Assets/Images/WallTileExposedSingleCorner.png";
        this.Display.style.transform = "rotate(90deg)";
      }
      else if(up && !down && right && left && ul && !ur)
      {
        this.Display.src = "../Assets/Images/WallTileExposedSingleCorner.png";
        this.Display.style.transform = "rotate(180deg)";
      }
      else if(up && down && right && !left && ur && !dr)
      {
        this.Display.src = "../Assets/Images/WallTileExposedSingleCorner.png";
        this.Display.style.transform = "rotate(-90deg)";
      }
      else if(!up && down && right && left && dl && !dr)
        this.Display.src = "../Assets/Images/WallTileExposedSingleCorner2.png";
      else if(up && down && !right && left && ul && !dl)
      {
        this.Display.src = "../Assets/Images/WallTileExposedSingleCorner2.png";
        this.Display.style.transform = "rotate(90deg)";
      }
      else if(up && !down && right && left && !ul && ur)
      {
        this.Display.src = "../Assets/Images/WallTileExposedSingleCorner2.png";
        this.Display.style.transform = "rotate(180deg)";
      }
      else if(up && down && right && !left && !ur && dr)
      {
        this.Display.src = "../Assets/Images/WallTileExposedSingleCorner2.png";
        this.Display.style.transform = "rotate(-90deg)";
      }
      else if(!up && down && right && left && !dl && !dr)
        this.Display.src = "../Assets/Images/WallTileExposedDoubleCorner.png";
      else if(up && down && !right && left && !ul && !dl)
      {
        this.Display.src = "../Assets/Images/WallTileExposedDoubleCorner.png";
        this.Display.style.transform = "rotate(90deg)";
      }
      else if(up && !down && right && left && !ul && !ur)
      {
        this.Display.src = "../Assets/Images/WallTileExposedDoubleCorner.png";
        this.Display.style.transform = "rotate(180deg)";
      }
      else if(up && down && right && !left && !ur && !dr)
      {
        this.Display.src = "../Assets/Images/WallTileExposedDoubleCorner.png";
        this.Display.style.transform = "rotate(-90deg)";
      }
      else if(up && down && !right && !left)
        this.Display.src = "../Assets/Images/WallTileLinear.png";
      else if(!up && !down && right && left)
      {
        this.Display.src = "../Assets/Images/WallTileLinear.png";
        this.Display.style.transform = "rotate(90deg)";
      }
      else if(!up && down && !right && !left)
        this.Display.src = "../Assets/Images/WallTileBit.png";
      else if(!up && !down && !right && left)
      {
        this.Display.src = "../Assets/Images/WallTileBit.png";
        this.Display.style.transform = "rotate(90deg)";
      }
      else if(up && !down && !right && !left)
      {
        this.Display.src = "../Assets/Images/WallTileBit.png";
        this.Display.style.transform = "rotate(180deg)";
      }
      else if(!up && !down && right && !left)
      {
        this.Display.src = "../Assets/Images/WallTileBit.png";
        this.Display.style.transform = "rotate(-90deg)";
      }
      else if(up && down && right && left && !ul && !ur && !dl && dr)
        this.Display.src = "../Assets/Images/WallTileTripleCorner.png";
      else if(up && down && right && left && !ul && !ur && dl && !dr)
      {
        this.Display.src = "../Assets/Images/WallTileTripleCorner.png";
        this.Display.style.transform = "rotate(90deg)";
      }
      else if(up && down && right && left && ul && !ur && !dl && !dr)
      {
        this.Display.src = "../Assets/Images/WallTileTripleCorner.png";
        this.Display.style.transform = "rotate(180deg)";
      }
      else if(up && down && right && left && !ul && ur && !dl && !dr)
      {
        this.Display.src = "../Assets/Images/WallTileTripleCorner.png";
        this.Display.style.transform = "rotate(-90deg)";
      }
      else if(up && down && right && left && !ul && !ur && dl && dr)
        this.Display.src = "../Assets/Images/WallTileDoubleCorner.png";
      else if(up && down && right && left && ul && !ur && dl && !dr)
      {
        this.Display.src = "../Assets/Images/WallTileDoubleCorner.png";
        this.Display.style.transform = "rotate(90deg)";
      }
      else if(up && down && right && left && ul && ur && !dl && !dr)
      {
        this.Display.src = "../Assets/Images/WallTileDoubleCorner.png";
        this.Display.style.transform = "rotate(180deg)";
      }
      else if(up && down && right && left && !ul && ur && !dl && dr)
      {
        this.Display.src = "../Assets/Images/WallTileDoubleCorner.png";
        this.Display.style.transform = "rotate(-90deg)";
      }
      else if(up && down && right && left && ul && !ur && !dl && dr)
        this.Display.src = "../Assets/Images/WallTileCrossCorner.png";
      else if(up && down && right && left && !ul && ur && dl && !dr)
      {
        this.Display.src = "../Assets/Images/WallTileCrossCorner.png";
        this.Display.style.transform = "rotate(90deg)";
      }
      else if(up && down && right && left && !ul && !ur && !dl && !dr)
        this.Display.src = "../Assets/Images/WallTileFullCorner.png";
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
    this.pellets = [];
    
    for(var x = 0; x < this.size.X; x++)
    {
      for(var y = 0; y < this.size.Y; y++)
      {
        if(this.getLevelValue(new Vector2(x, y)) == 1 || this.getLevelValue(new Vector2(x, y)) == 2)
          new Tile(this, new Vector2(this.position.X+x*this.cellSize, this.position.Y+y*this.cellSize), new Vector2(x, y));
        else if(this.getLevelValue(new Vector2(x, y)) == 3)
          this.pellets.push(new Pellet(this, new Vector2(this.position.X+x*this.cellSize, this.position.Y+y*this.cellSize)));
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

var Score = 0;

function Start()
{
  setupFonts();
  try
  {
  setupUI();
  }
  catch(error)
  {
    LogError(error);
  }
  
  var CurrentLevel = new Level([
  "11111111111111111111111",
  "13333333333133333333331",
  "13111311113131111311131",
  "13111311113131111311131",
  "13333333333333333333331",
  "13111313111111131311131",
  "13333313333133331333331",
  "11111311110101111311111",
  "11111310000000001311111",
  "11111310111211101311111",
  "33333300100000100333333",
  "11111310111111101311111",
  "11111310000000001311111",
  "11111310111111101311111",
  "13333333333133333333331",
  "13111311113131111311131",
  "13331333333333333313331",
  "11131313111111131313111",
  "13333313333133331333331",
  "13111111113131111111131",
  "13333333333333333333331",
  "11111111111111111111111"
  ], 32);
  
  var PlayerInstance = new Pacman(CurrentLevel, new Vector2(11, 9));
  
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
  
  var Blinky = new Ghost(CurrentLevel, "Blinky", new Vector2(11, 12));
  Blinky.setAI(new BlinkyAI(PlayerInstance));
  var Pinky = new Ghost(CurrentLevel, "Pinky", new Vector2(11, 12));
  Pinky.setAI(new PinkyAI(CurrentLevel, PlayerInstance));
  var Inky = new Ghost(CurrentLevel, "Inky", new Vector2(11, 12));
  Inky.setAI(new InkyAI(CurrentLevel, PlayerInstance, Blinky));
  var Clyde = new Ghost(CurrentLevel, "Clyde", new Vector2(11, 12));
  Clyde.setAI(new ClydeAI(CurrentLevel, Clyde, PlayerInstance));
}

function setupFonts()
{
  var MainFont = new FontFace('Main', 'url(../Assets/Fonts/Pacman.woff) format("woff"), url(../Assets/Fonts/Pacman.ttf) format("truetype")');
  MainFont.load().then(function(font){document.fonts.add(font);});
}

function setupUI()
{
  var UIdiv = document.createElement("div");
  document.getElementById("Content").appendChild(UIdiv);
  UIdiv.style.margin = "auto";
  UIdiv.style.width = "100%";
  UIdiv.style.height = 200;
  UIdiv.style.color = "white";
  var scoreDiv = document.createElement("div");
  UIdiv.appendChild(scoreDiv);
  scoreDiv.style.fontFamily = "Main";
  scoreDiv.style.fontSize = 16;
  scoreDiv.style.width = 200;
  scoreDiv.style.textAlign = "center";
  scoreDiv.style.margin = "auto 100px auto auto";
  var scoreTitle = document.createElement("p");
  scoreDiv.appendChild(scoreTitle);
  scoreTitle.innerHTML = "HIGH SCORE";
  var scoreDisplay = document.createElement("p");
  scoreDiv.appendChild(scoreDisplay);
  scoreDisplay.id = "Score";
  scoreDisplay.style.color = "white";
  updateScoreDisplay();
}

function updateScoreDisplay()
{
  if(Score.toString().length == 1)
    document.getElementById("Score").innerHTML = "0" + Score;
  else
    document.getElementById("Score").innerHTML = Score;
}
