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
  constructor(position, facing = "up")
  {
    this.position = new Vector2();
    if(position.X !== undefined && position.Y !== undefined)
      this.position = position;
    else
      LogError("Invalid position was passed in Pacman class.");
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
      getLevelValue(getLevelIndex(new Vector2(this.position.X + this.speed + this.width/2, this.position.Y + this.width/2))) == "0")
      {
        movement.Add(new Vector2(this.speed, 0));
      }
    }
    else if(this.facing.toLowerCase() == "down" &&
      getLevelValue(getLevelIndex(new Vector2(this.position.X + this.width/2, this.position.Y-this.speed + this.width/2))) == "0")
    {
      if(this.position.Y - this.speed > 0)
      {
        movement.Add(new Vector2(0, -this.speed));
      }
    }
    else if(this.facing.toLowerCase() == "left" &&
      getLevelValue(getLevelIndex(new Vector2(this.position.X-this.speed + this.width/2, this.position.Y + this.width/2))) == "0")
    {
      if(this.position.X - this.speed > 0)
      {
        movement.Add(new Vector2(-this.speed, 0));
      }
    }
    else if(this.facing.toLowerCase() == "up" &&
      getLevelValue(getLevelIndex(new Vector2(this.position.X + this.width/2, this.position.Y+this.speed + this.width/2))) == "0")
    {
      if(this.position.Y + this.speed < window.innerHeight-24)
      {
        movement.Add(new Vector2(0, this.speed));
      }
    }
    else
      LogError("Invalid facing direction used in Pacman.move()");
    
    if(!movement.Equals(new Vector2()))
    {
      this.position.Add(movement);
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
  constructor(name, position, facing = "up")
  {
    this.name = name;
    this.position = new Vector2();
    this.speed = 3;
    this.facing = facing;
    this.state = "eaten";
    this.target = new Vector2();
    if(position.X !== undefined && position.Y !== undefined)
      this.position = position;
    else
      LogError("Invalid position was passed in Ghost class.");
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
      Instance.target = PlayerInstance.position;
      Instance.move();
    }, 1000/this.speed);
  }
  
  move()
  {
    var targetPos;
    
    if(this.name.toLowerCase() == "blinky")
    {
      targetPos = this.target;
      if(target1 === undefined)
        {
          target1 = document.createElement("span");
          document.getElementById("Content").appendChild(target1);
          target1.style.display = "block";
          target1.style.borderRadius = "50%"
          target1.style.backgroundColor = "red";
          target1.style.width = 10;
          target1.style.height = 10;
          target1.style.position = "absolute";
          target1.style.left = targetPos.X;
          target1.style.bottom = targetPos.Y;
        }
        else
        {
          target1.style.left = targetPos.X;
          target1.style.bottom = targetPos.Y;
        }
    }
    else if(this.name.toLowerCase() == "pinky")
    {
      var forward = getV2fromDir(PlayerInstance.facing);
        targetPos = new Vector2(this.target.X + (forward.X * this.width * 4), this.target.Y + (forward.Y * this.width * 4));
        if(target2 === undefined)
        {
          target2 = document.createElement("span");
          document.getElementById("Content").appendChild(target2);
          target2.style.display = "block";
          target2.style.borderRadius = "50%"
          target2.style.backgroundColor = "#ff69e7";
          target2.style.width = 10;
          target2.style.height = 10;
          target2.style.position = "absolute";
          target2.style.left = targetPos.X;
          target2.style.bottom = targetPos.Y;
        }
        else
        {
          target2.style.left = targetPos.X;
          target2.style.bottom = targetPos.Y;
        }
    }
    else if(this.name.toLowerCase() == "inky")
    {
      var forward = getV2fromDir(PlayerInstance.facing);
        targetPos = new Vector2(this.target.X + (Blinky.position.X - this.target.X)*-2, this.target.Y + (Blinky.position.Y - this.target.Y)*-2)
        if(target3 === undefined)
        {
          target3 = document.createElement("span");
          document.getElementById("Content").appendChild(target3);
          target3.style.display = "block";
          target3.style.borderRadius = "50%"
          target3.style.backgroundColor = "cyan";
          target3.style.width = 10;
          target3.style.height = 10;
          target3.style.position = "absolute";
          target3.style.left = targetPos.X;
          target3.style.bottom = targetPos.Y;
        }
        else
        {
          target3.style.left = targetPos.X;
          target3.style.bottom = targetPos.Y;
        }
    }
    else if(this.name.toLowerCase() == "clyde")
    {
      var forward = getV2fromDir(PlayerInstance.facing);
      if(Math.sqrt(Math.pow(this.position.X - this.target.X, 2) + Math.pow(this.position.Y - this.target.Y, 2)) > this.width*8)
        targetPos = this.target;
      else
        targetPos = new Vector2();
        if(target4 === undefined)
        {
          target4 = document.createElement("span");
          document.getElementById("Content").appendChild(target4);
          target4.style.display = "block";
          target4.style.borderRadius = "50%"
          target4.style.backgroundColor = "#ff7c00";
          target4.style.width = 10;
          target4.style.height = 10;
          target4.style.position = "absolute";
          target4.style.left = targetPos.X;
          target4.style.bottom = targetPos.Y;
        }
        else
        {
          target4.style.left = targetPos.X;
          target4.style.bottom = targetPos.Y;
        }
    }
    else
      targetPos = this.target;
    
    var movement = new Vector2();
    var closestDist;
    
    var lastDir;
    
    if(this.facing != "left")
    {
      var newPos = new Vector2(this.position.X + this.width, this.position.Y);
      
      if(this.position.X + this.width < window.innerWidth-28 &&
      getLevelValue(getLevelIndex(new Vector2(newPos.X + this.width/2, newPos.Y + this.width/2))) == "0")
      {
        var dist = Math.sqrt(Math.pow(newPos.X-targetPos.X, 2) + Math.pow(newPos.Y-targetPos.Y, 2));
        
        if(closestDist === undefined || dist <= closestDist)
        {
          closestDist = dist;
          lastDir = "right";
          movement = new Vector2(this.width, 0);
        }
      }
      else if(this.position.X + this.width < window.innerWidth-28 &&
      !this.state == "chase" && getLevelValue(getLevelIndex(new Vector2(newPos.X + this.width/2, newPos.Y + this.width/2))) == "2")
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
      getLevelValue(getLevelIndex(new Vector2(newPos.X + this.width/2, newPos.Y + this.width/2))) == "0")
      {
        var dist = Math.sqrt(Math.pow(newPos.X-targetPos.X, 2) + Math.pow(newPos.Y-targetPos.Y, 2));
        
        if(closestDist === undefined || dist <= closestDist)
        {
          closestDist = dist;
          lastDir = "down";
          movement = new Vector2(0, -this.height);
        }
      }
      else if(this.position.X + this.width < window.innerWidth-28 &&
      !this.state == "chase" && getLevelValue(getLevelIndex(new Vector2(newPos.X + this.width/2, newPos.Y + this.width/2))) == "2")
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
      getLevelValue(getLevelIndex(new Vector2(newPos.X + this.width/2, newPos.Y + this.width/2))) == "0" ||
      this.position.X + this.width < window.innerWidth-28 &&
      !this.state == "chase" && getLevelValue(getLevelIndex(new Vector2(newPos.X + this.width/2, newPos.Y + this.width/2))) == "2")
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
      getLevelValue(getLevelIndex(new Vector2(newPos.X + this.width/2, newPos.Y + this.width/2))) == "0" ||
      this.position.X + this.width < window.innerWidth-28 &&
      !this.state == "chase" && getLevelValue(getLevelIndex(new Vector2(newPos.X + this.width/2, newPos.Y + this.width/2))) == "2")
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
    
    if(lastDir !== undefined)
      this.facing = lastDir;
    
    if(!movement.Equals(new Vector2()))
    {
      this.position.Add(movement);
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

class Tile
{
  constructor(position, levelIndex)
  {
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
    this.Display.style.width = CellSize;
    this.Display.style.height = CellSize;
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
    
    up = getLevelValue(new Vector2(this.levelIndex.X, this.levelIndex.Y+1)) == "1";
    down = getLevelValue(new Vector2(this.levelIndex.X, this.levelIndex.Y-1)) == "1";
    right = getLevelValue(new Vector2(this.levelIndex.X+1, this.levelIndex.Y)) == "1";
    left = getLevelValue(new Vector2(this.levelIndex.X-1, this.levelIndex.Y)) == "1";
    ul = getLevelValue(new Vector2(this.levelIndex.X-1, this.levelIndex.Y+1)) == "1";
    ur = getLevelValue(new Vector2(this.levelIndex.X+1, this.levelIndex.Y+1)) == "1";
    dl = getLevelValue(new Vector2(this.levelIndex.X-1, this.levelIndex.Y-1)) == "1";
    dr = getLevelValue(new Vector2(this.levelIndex.X+1, this.levelIndex.Y-1)) == "1";
    
    if(getLevelValue(this.levelIndex) == "1")
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
    else if(getLevelValue(this.levelIndex) == "2")
    {
      this.Display.src = "../Assets/Images/BarrierTile.png";
      
      if(up && down)
        this.Display.style.transform = "rotate(90deg)";
    }
  }
}

var LevelData = [
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
  ]
var LevelPos = new Vector2();
var LevelSize = new Vector2(23, 22);
var CellSize = 28;
var Grid;

var PlayerInstance;
var UIdiv;
var Blinky
var target1;
var Pinky
var target2;
var Inky
var target3;
var Clyde
var target4;

function Start()
{
  setupFonts();
  setupUI();
  
  setupLevel();
  
  PlayerInstance = new Pacman(new Vector2());
  Blinky = new Ghost("Blinky", new Vector2());
  Pinky = new Ghost("Pinky", new Vector2());
  Inky = new Ghost("Inky", new Vector2());
  Clyde = new Ghost("Clyde", new Vector2());
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

function setupLevel()
{
  LevelPos = new Vector2(parseInt(((window.innerWidth)-LevelSize.X*CellSize)/2/CellSize)*CellSize, (window.innerHeight-LevelSize.Y*CellSize)/2);
  
  for(var x = 0; x < LevelSize.X; x++)
  {
    for(var y = 0; y < LevelSize.Y; y++)
    {
      if(getLevelValue(new Vector2(x, y)) != "0")
        new Tile(new Vector2(LevelPos.X+x*CellSize, LevelPos.Y+y*CellSize), new Vector2(x, y));
    }
  }
}

function getLevelValue(V2)
{
  var vector2 = new Vector2();
  if(vector2.X !== undefined && vector2.Y !== undefined)
    vector2 = V2;
  else
    LogError("Invalid position was passed in getLevelValue()");
    
  if(vector2.X >= 0 && vector2.X < LevelSize.X &&
  vector2.Y >= 0 && vector2.Y < LevelSize.Y)
    return LevelData[LevelData.length-vector2.Y-1].charAt(vector2.X);
  else
    return "0";
}

function getLevelIndex(V2)
{
  var vector2 = new Vector2();
  if(vector2.X !== undefined && vector2.Y !== undefined)
    vector2 = V2;
  else
    LogError("Invalid position was passed in getLevelValue()");
    
  vector2.Substract(LevelPos);
  vector2.Divide(CellSize);
  vector2 = new Vector2(parseInt(vector2.X), parseInt(vector2.Y));
  
  return vector2;
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

//Little console I made ;D

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