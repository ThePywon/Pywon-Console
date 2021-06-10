var Console = document.getElementById("Console");
var TextArea = document.getElementById("ConsoleTA");
var Toggle = document.getElementById("ConsoleToggle");

const content = document.getElementById("Content");
Keydown = function(event){};
Keyup = function(event){};
window.interval = 50;
window.timeout = 50;
OnMessage = function(message){};
OnError = function(message){};

class Exception
{
  constructor(type, content, reference = null)
  {
    this.reference = reference;
    if(content !== undefined)
    {
      if(this.reference !== null)
      {
        if(typeof this.reference == "object")
        {
          try
          {
            this.content = type.toString() + " exception in " + this.reference.constructor.name + " class:<br/>" + content.toString();
          }
          catch(error)
          {
            this.content = type.toString() + " exception in " + this.reference.valueOf() + ":<br/>" + content.toString();
          }
          this.reference._isValid = false;
        }
        else
          this.content = type.toString() + " exception:<br/>" + content.toString();
      }
      else
        this.content = type.toString() + " exception:<br/>" + content.toString();
    }
    else
      this.content = "Exception:<br/>" + type.toString();
    
    Exception.prototype.toString = function()
    {
      return this.content;
    }
    
    Exception.prototype.valueOf = function()
    {
      return "Exception";
    }
    
    this.print();
  }
  
  print()
  {
    var BlankLog = document.getElementById("BlankLog");
    
    if(BlankLog !== null)
      BlankLog.remove();
    
    var Logs = document.getElementById("Logs");
    
    this.display = document.createElement("div");
    Logs.appendChild(this.display);
    this.display.className = "ErrLog";
    
    var Icon = document.createElement("img");
    this.display.appendChild(Icon);
    Icon.src = "../Assets/Images/RedX.png";
    
    var P = document.createElement("p");
    this.display.appendChild(P);
    P.innerHTML = this.content.toString();
    
    this.display.scrollIntoView(true);
    
    var Instance = this;
    setTimeout(function(){OnError(Instance);}, window.timeout);
  }
  
  delete()
  {
    this.display.remove();
  }
  
  isValid()
  {
    return this._isValid;
  }
}

class Warning
{
  constructor(type, content, reference = null)
  {
    this.reference = reference;
    if(content !== undefined)
    {
      if(this.reference !== null)
      {
        if(typeof this.reference == "object")
        {
          try
          {
            this.content = type.toString() + " warning in " + this.reference.constructor.name + " class:<br/>" + content.toString();
          }
          catch(error)
          {
            this.content = type.toString() + " warning in " + this.reference.valueOf() + ":<br/>" + content.toString();
          }
        }
        else
          this.content = type.toString() + " warning:<br/>" + content.toString();
      }
      else
        this.content = type.toString() + " warning:<br/>" + content.toString();
    }
    else
      this.content = "Warning:<br/>" + type.toString();
    
    Warning.prototype.toString = function()
    {
      return this.content;
    }
    
    Warning.prototype.valueOf = function()
    {
      return "Warning";
    }
    
    this.print();
  }
  
  print()
  {
    var BlankLog = document.getElementById("BlankLog");
    
    if(BlankLog !== null)
      BlankLog.remove();
    
    var Logs = document.getElementById("Logs");
    
    this.display = document.createElement("div");
    Logs.appendChild(this.display);
    this.display.className = "WarnLog";
    
    var Icon = document.createElement("img");
    this.display.appendChild(Icon);
    Icon.src = "../Assets/Images/YellowWarning.png";
    
    var P = document.createElement("p");
    this.display.appendChild(P);
    P.innerHTML = this.content.toString();
    
    this.display.scrollIntoView(true);
    
    var Instance = this;
    setTimeout(function(){OnError(Instance);}, window.timeout);
  }
  
  delete()
  {
    this.display.remove();
  }
  
  isValid()
  {
    return this._isValid;
  }
}

class Log
{
  constructor(content, color, scroll, url)
  {
    this._isValid = true;
    if(content !== undefined)
      this.content = content.toString();
    else
    {
      new Exception("Invalid value", "Passed value 'content' returned undefined!", this);
      return;
    }
    if(color !== undefined)
      this.color = color;
    else this.color = "white";
    if(this.scroll !== undefined)
      this.scroll = scroll;
    else this.scroll = true;
    this.url = url;
    
    Log.prototype.toString = function()
    {
      return this.content;
    }
    
    Log.prototype.valueOf = function()
    {
      if(this._isValid)
        return "Log";
      else
        return "<a style='color:red;'>[Log]</a>";
    }
    
    this.print();
  }
  
  print()
  {
    var BlankLog = document.getElementById("BlankLog");
  
    if(BlankLog !== null)
      BlankLog.remove();
    
    var Logs = document.getElementById("Logs");
    
    this.display = document.createElement("div")
    Logs.appendChild(this.display);
    this.display.className = "Log";
    this.display.style.borderLeft = "2px solid " + this.color;
    
    
    if(this.url !== undefined)
    {
      this.icon = document.createElement("img");
      this.display.appendChild(this.icon);
      this.icon.src = "../Assets/Images/" + this.url;
    }
    
    this.text = document.createElement("p");
    this.display.appendChild(this.text);
    this.text.style.color = this.color;
    this.text.innerHTML = this.content;
    
    this.display.scrollIntoView(this.scroll);
    
    var Instance = this;
    setTimeout(function(){OnMessage(Instance);}, window.timeout);
  }
  
  edit(content)
  {
    if(this._isValid)
    {
      this.content = content;
      this.text.innerHTML = content.toString();
    }
    else
      new Exception("Invalid value", "Cannot edit this instance of Log because it is invalid.", this);
  }
  
  setColor(color)
  {
    if(this._isValid)
    {
      this.color = color;
      this.text.style.color = color;
      this.display.style.borderLeft = "2px solid " + color;
    }
    else
      new Exception("Invalid value", "Cannot change the color of this instance of Log because it is invalid.", this);
  }
  
  setImage(url)
  {
    if(this._isValid)
    {
      if(this.url === undefined)
      {
        this.url = url;
        this.display.innerHTML = "";
        
        this.icon = document.createElement("img");
        this.display.appendChild(this.icon);
        this.icon.src = "../Assets/Images/" + this.url;
        
        this.text = document.createElement("p");
        this.display.appendChild(this.text);
        this.text.style.color = this.color;
        this.text.innerHTML = this.message;
      }
      
      this.url = url;
      this.icon.src = "../Assets/Images/" + this.url;
    }
    else
      new Exception("Invalid value", "Cannot change the image of this instance of Log because it is invalid.", this);
  }
  
  delete()
  {
    this.display.remove();
    this._isValid = false;
  }
  
  isValid()
  {
    return this._isValid;
  }
}

class Dir2D
{
  constructor(val = "none")
  {
    Dir2D.prototype.valueOf = function()
    {
      return "Dir2D";
    }
    
    this._isValid = true;
    if(val.toLowerCase() == "none" || val.toLowerCase() == "left" || val.toLowerCase() == "up" || val.toLowerCase() == "right" || val.toLowerCase() == "down")
    {
      this.value = val.toLowerCase();
      if(this.value == "up" || this.value == "down")
        this.axis = "vertical";
      else if(this.value == "left" || this.value == "right")
        this.axis = "horizontal";
      else
        this.axis = "none";
    }
    else
    {
      this.value = undefined;
      this.axis = "none";
      new Exception("Unexpected value", "Passed value was not a valid value.<br/>Value: " + val, this);
    }
    
    Dir2D.prototype.toString = function()
    {
      if(this._isValid)
        return this.value;
      else
        return "<a style='color:red;'>[Dir2D]</a>";
    }
  }
  
  new()
  {
    if(this._isValid)
      return new Dir2D(this.value);
    else
    {
      new Exception("Invalid value", "Cannot create a new instance of Dir2D because this instance of Dir2D was invalid.");
      return null;
    }
  }
  
  equals(Dir)
  {
    if(Dir.valueOf() == "Dir2D")
    {
      if(this._isValid && Dir._isValid)
        return this.value == Dir.value;
      else
      {
        new Exception("Invalid value", "Dir2D cannot compare with the passed value either because the passed value was invalid or because this instance of Dir2D was invalid.");
        return false;
      }
    }
    else if(typeof Dir == "string")
    {
      if(this._isValid)
        return this.value == Dir.toLowerCase();
      else
      {
        new Exception("Invalid value", "Dir2D cannot compare with the passed value because this instance of Dir2D was invalid.", this);
        return false;
      }
    }
    else
    {
      new Exception("Unexpected value", "Dir2D cannot compare with the passed value because the value wasn't a value of type Dir2D nor a value of type string.<br/>Value type: " + typeof Dir);
      return false;
    }
  }
  
  invert()
  {
    if(this._isValid)
    {
      if(this.value == "none")
        return new Dir2D("none");
      else if (this.value == "left")
        return new Dir2D("right");
      else if(this.value == "up")
        return new Dir2D("down");
      else if(this.value == "right")
        return new Dir2D("left");
      else if(this.value == "down")
        return new Dir2D("up");
    }
    else
    {
      new Exception("Invalid value", "Cannot invert Dir2D because this instance of Dir2D was invalid.", this);
      return null;
    }
  }
  
  toVector2()
  {
    if(this._isValid)
    {
      if(this.value == "none")
        return new Vector2();
      else if (this.value == "left")
        return new Vector2(-1, 0);
      else if(this.value == "up")
        return new Vector2(0, 1);
      else if(this.value == "right")
        return new Vector2(1, 0);
      else if(this.value == "down")
        return new Vector2(0, -1);
    }
    else
    {
      new Exception("Invalid value", "Cannot parse Dir2D to Vector2 because this instance of Dir2D was invalid.", this);
      return null;
    }
  }
  
  toDeg()
  {
    if(this._isValid)
    {
      if(this.value == "none")
        return null;
      else if (this.value == "left")
        return -90;
      else if(this.value == "up")
        return 0;
      else if(this.value == "right")
        return 90;
      else if(this.value == "down")
        return 180;
    }
    else
    {
      new Exception("Invalid value", "Cannot parse Dir2D to degrees because this instance of Dir2D was invalid.", this);
      return null;
    }
  }
}

class Vector2
{
  constructor(x = 0, y = 0)
  {
    Vector2.prototype.valueOf = function()
    {
      return "Vector2";
    }
    
    this._isValid = true;
    if(typeof x == "number")
      this.x = x;
    else
    {
      this.x = NaN;
      new Exception("Unexpected value", "Passed value 'x' was not a number.<br/>Value type: " + typeof x, this);
    }
    if(typeof y == "number")
      this.y = y;
    else
    {
      this.y = NaN;
      new Exception("Unexpected value", "Passed value 'y' was not a number.<br/>Value type: " + typeof y, this);
    }
    
    Vector2.prototype.toString = function()
    {
      if(this._isValid)
        return "(" + this.x + ", " + this.y +")";
      else
        return "<a style='color:red;'>[Vector2]</a>";
    }
  }
  
  new()
  {
    if(this._isValid)
      return new Vector2(this.x, this.y);
    else
    {
      new Exception("Invalid value", "Cannot create a new instance of Vector2 because this instance of Vector2 was invalid.", this);
      return null;
    }
  }
  
  equals(other)
  {
    if(other.valueOf() == "Vector2")
    {
      if(this._isValid && other._isValid)
      {
        if(other.x == this.x && other.y == this.y)
          return true;
        else
          return false;
      }
      else
      {
        new Exception("Invalid value", "Vector2 cannot compare with the passed value either because the value was invalid or because this instance of Vector2 was invalid.");
        return false;
      }
    }
    else
    {
      new Exception("Unexpected value", "Vector2 cannot compare with the passed value because the value wasn't a value of type Vector2.<br/>Value type: " + other.valueOf());
      return false;
    }
  }
  
  add(value)
  {
    if(value.valueOf() == "Vector2")
    {
      if(this._isValid && value._isValid)
      {
        return new Vector2(this.x + value.x, this.y + value.y);
      }
      else
      {
        new Exception("Invalid value", "Vector2 cannot make an addition with the passed value either because the value was invalid or because this instance of Vector2 was invalid.");
        return null;
      }
    }
    else if(typeof value == "number")
    {
      if(this._isValid)
      {
        return new Vector2(this.x + value, this.y + value);
      }
      else
      {
        new Exception("Invalid value", "Vector2 cannot make an addition with the passed value because this instance of Vector2 was invalid.", this);
        return null;
      }
    }
    else
    {
      new Exception("Unexpected value", "Vector2 cannot make an addition with the passed value because the value wasn't a value of type Vector2 nor a value of type number.<br/>Value type: " + typeof value);
      return null;
    }
  }
  
  sub(value)
  {
    if(value.valueOf() == "Vector2")
    {
      if(this._isValid && value._isValid)
      {
        return new Vector2(this.x - value.x, this.y - value.y);
      }
      else
      {
        new Exception("Invalid value", "Vector2 cannot make an substraction with the passed value either because the value was invalid or because this instance of Vector2 was invalid.");
        return null;
      }
    }
    else if(typeof value == "number")
    {
      if(this._isValid)
      {
        return new Vector2(this.x - value, this.y - value);
      }
      else
      {
        new Exception("Invalid value", "Vector2 cannot make an substraction with the passed value because this instance of Vector2 was invalid.", this);
        return null;
      }
    }
    else
    {
      new Exception("Unexpected value", "Vector2 cannot make an substraction with the passed value because the value wasn't a value of type Vector2 nor a value of type number.<br/>Value type: " + typeof value);
      return null;
    }
  }
  
  multi(value)
  {
    if(value.valueOf() == "Vector2")
    {
      if(this._isValid && value._isValid)
      {
        return new Vector2(this.x * value.x, this.y * value.y);
      }
      else
      {
        new Exception("Invalid value", "Vector2 cannot make an multiplication with the passed value either because the value was invalid or because this instance of Vector2 was invalid.");
        return null;
      }
    }
    else if(typeof value == "number")
    {
      if(this._isValid)
      {
        return new Vector2(this.x * value, this.y * value);
      }
      else
      {
        new Exception("Invalid value", "Vector2 cannot make an multiplication with the passed value because this instance of Vector2 was invalid.", this);
        return null;
      }
    }
    else
    {
      new Exception("Unexpected value", "Vector2 cannot make an multiplication with the passed value because the value wasn't a value of type Vector2 nor a value of type number.<br/>Value type: " + typeof value);
      return null;
    }
  }
  
  div(value)
  {
    if(value.valueOf() == "Vector2")
    {
      if(this._isValid && value._isValid)
      {
        return new Vector2(this.x / value.x, this.y / value.y);
      }
      else
      {
        new Exception("Invalid value", "Vector2 cannot divide with the passed value either because the value was invalid or because this instance of Vector2 was invalid.");
        return null;
      }
    }
    else if(typeof value == "number")
    {
      if(this._isValid)
      {
        return new Vector2(this.x / value, this.y / value);
      }
      else
      {
        new Exception("Invalid value", "Vector2 cannot divide with the passed value because this instance of Vector2 was invalid.", this);
        return null;
      }
    }
    else
    {
      new Exception("Invalid value", "Vector2 cannot divide with the passed value because the value wasn't a value of type Vector2 nor a value of type number.<br/>Value type: " + typeof value);
      return null;
    }
  }
  
  dist(other)
  {
    if(other.valueOf() == "Vector2")
    {
      if(this._isValid && other._isValid)
      {
        var thirdPoint = new Vector2(this.x, other.y);
        var a = Math.abs(thirdPoint.x - other.x);
        var b = Math.abs(thirdPoint.y - this.y);
        var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        return c;
      }
      else
      {
        new Exception("Invalid value", "Vector2 cannot calculate distance with the passed value either because the value was invalid or because this instance of Vector2 was invalid.");
        return null;
      }
    }
    else
    {
      new Exception("Unexpected value", "Vector2 cannot calculate distance with the value because is wasn't a value of type Vector2.<br/>Value type: " + other.valueOf());
      return null;
    }
  }
  
  lerp(other, dist)
  {
    if(other.valueOf() == "Vector2")
    {
      if(typeof dist == "number")
      {
        var x = other.x - this.x;
        var y = other.y - this.y;
        return this.Add(new Vector2(x, y).Multi(dist));
      }
      else
        new Exception("Unexpected value", "Vector2 cannot lerp because the passed value 'dist' was not a number.<br/>Value type: " + typeof dist);
    }
    else
      new Exception("Unexpected value", "Vector2 cannot lerp with the passed value because the value wasn't a value of type Vector2.<br/>Value type: " + other.valueOf());
  }
}

class Vector3
{
  constructor(x = 0, y = 0, z = 0)
  {
    Vector3.prototype.valueOf = function()
    {
      return "Vector3";
    }
    
    this._isValid = true;
    if(typeof x == "number")
      this.x = x;
    else
    {
      this.x = NaN;
      new Exception("Unexpected value", "Passed value 'x' was not a number.<br/>Value type: " + typeof x, this);
    }
    if(typeof y == "number")
      this.y = y;
    else
    {
      this.y = NaN;
      new Exception("Unexpected value", "Passed value 'y' was not a number.<br/>Value type: " + typeof y, this);
    }
    if(typeof z == "number")
      this.z = z;
    else
    {
      this.z = NaN;
      new Exception("Unexpected value", "Passed value 'z' was not a number.<br/>Value type: " + typeof z, this);
    }
    
    Vector3.prototype.toString = function()
    {
      if(this._isValid)
        return "(" + this.x + ", " + this.y + ", " + this.z +")";
      else
        return "<a style='color:red;'>[Vector3]</a>";
    }
  }
  
  new()
  {
    if(this._isValid)
      return new Vector3(this.x, this.y, this.z);
    else
    {
      new Exception("Invalid value", "Cannot create a new instance of Vector3 because this instance of Vector3 was invalid.", this);
      return null;
    }
  }
  
  equals(other)
  {
    if(other.valueOf() == "Vector3")
    {
      if(this._isValid && other._isValid)
      {
        if(other.x == this.x && other.y == this.y && other.z == this.z)
          return true;
        else
          return false;
      }
      else
      {
        new Exception("Invalid value", "Vector3 cannot compare with the passed value either because the value was invalid or because this instance of Vector3 was invalid.");
        return false;
      }
    }
    else
    {
      new Exception("Unexpected value", "Vector3 cannot compare with the passed value because is wasn't a value of type Vector3.<br/>Value type: " + other.valueOf());
      return false;
    }
  }
  
  add(value)
  {
    if(value.valueOf() == "Vector3")
    {
      if(this._isValid && value._isValid)
      {
        return new Vector3(this.x + value.x, this.y + value.y, this.z + value.z);
      }
      else
      {
        new Exception("Invalid value", "Vector3 cannot make an addition with the passed value either because the value was invalid or because this instance of Vector3 was invalid.");
        return null;
      }
    }
    else if(typeof value == "number")
    {
      if(this._isValid)
      {
        return new Vector3(this.x + value, this.y + value, this.z + value);
      }
      else
      {
        new Exception("Invalid value", "Vector3 cannot make an addition with the passed value because this instance of Vector3 was invalid.", this);
        return null;
      }
    }
    else
    {
      new Exception("Unexpected value", "Vector3 cannot make an addition with the passed value because the value wasn't a value of type Vector3 nor a value of type number.<br/>Value type: " + typeof value);
      return null;
    }
  }
  
  sub(value)
  {
    if(value.valueOf() == "Vector3")
    {
      if(this._isValid && value._isValid)
      {
        return new Vector3(this.x - value.x, this.y - value.y, this.z - value.z);
      }
      else
      {
        new Exception("Invalid value", "Vector3 cannot make an substraction with the passed value either because the value was invalid or because this instance of Vector3 was invalid.");
        return null;
      }
    }
    else if(typeof value == "number")
    {
      if(this._isValid)
      {
        return new Vector3(this.x - value, this.y - value, this.z - value);
      }
      else
      {
        new Exception("Invalid value", "Vector3 cannot make an substraction with the passed value because this instance of Vector3 was invalid.", this);
        return null;
      }
    }
    else
    {
      new Exception("Unexpected value", "Vector3 cannot make an substraction with the passed value because the value wasn't a value of type Vector3 nor a value of type number.<br/>Value type: " + typeof value);
      return null;
    }
  }
  
  multi(value)
  {
    if(value.valueOf() == "Vector3")
    {
      if(this._isValid && value._isValid)
      {
        return new Vector3(this.x * value.x, this.y * value.y, this.z * value.z);
      }
      else
      {
        new Exception("Invalid value", "Vector3 cannot make an multiplication with the passed value either because the value was invalid or because this instance of Vector3 was invalid.");
        return null;
      }
    }
    else if(typeof value == "number")
    {
      if(this._isValid)
      {
        return new Vector3(this.x * value, this.y * value, this.z * value);
      }
      else
      {
        new Exception("Invalid value", "Vector3 cannot make an multiplication with the passed value because this instance of Vector3 was invalid.", this);
        return null;
      }
    }
    else
    {
      new Exception("Unexpected value", "Vector3 cannot make an multiplication with the passed value because is wasn't a value of type Vector3 nor a value of type number.<br/>Value type: " + typeof value);
      return null;
    }
  }
  
  div(value)
  {
    if(value.valueOf() == "Vector3")
    {
      if(this._isValid && value._isValid)
      {
        return new Vector3(this.x / value.x, this.y / value.y, this.z / value.z);
      }
      else
      {
        new Exception("Invalid value", "Vector3 cannot divide with the passed value either because the value was invalid or because this instance of Vector3 was invalid.");
        return null;
      }
    }
    else if(typeof value == "number")
    {
      if(this._isValid)
      {
        return new Vector3(this.x / value, this.y / value, this.z / value);
      }
      else
      {
        new Exception("Invalid value", "Vector3 cannot divide with the passed value because this instance of Vector3 was invalid.", this);
        return null;
      }
    }
    else
    {
      new Exception("Unexpected value", "Vector3 cannot divide with the passed value because is wasn't a value of type Vector3 nor a value of type number.<br/>Value type: " + typeof value);
      return null;
    }
  }
  
  dist(other)
  {
    if(other.valueOf() == "Vector3")
    {
      if(this._isValid && other._isValid)
      {
        var thirdPoint = new Vector3(this.x, other.y, other.z);
        var a = Math.abs(thirdPoint.x - other.x);
        var b = Math.abs(thirdPoint.y - this.y);
        var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        var d = Math.abs(thirdPoint.z - this.z);
        var e = Math.sqrt(Math.pow(c, 2) + Math.pow(d, 2));
        return e;
      }
      else
      {
        new Exception("Invalid value", "Vector3 cannot calculate distance with the passed value either because the value was invalid or because this instance of Vector3 was invalid.");
        return null;
      }
    }
    else
    {
      new Exception("Unexpected value", "Vector3 cannot calculate distance with the passed value because the value wasn't a value of type Vector3.<br/>Value type: " + other.valueOf());
      return null;
    }
  }
  
  lerp(other, dist)
  {
    if(other.valueOf() == "Vector3")
    {
      if(typeof dist == "number")
      {
        var x = other.x - this.x;
        var y = other.y - this.y;
        var z = other.z - this.z;
        return this.Add(new Vector3(x, y, z).Multi(dist));
      }
      else
        new Exception("Unexpected value", "Vector3 cannot lerp because the passed value 'dist' was not a number.<br/>Value type: " + typeof dist);
    }
    else
      new Exception("Unexpected value", "Vector3 cannot lerp with the passed value because the value wasn't a value of type Vector3.<br/>Value type: " + other.valueOf());
  }
}

class Circle
{
  constructor(position, width, color = "white")
  {
    Circle.prototype.valueOf = function()
    {
      return "Circle";
    }
    
    this._isValid = true;
    this.color = color;
    if(position.valueOf() == "Vector2")
    {
      this.position = position;
    }
    else
    {
      this.position = new Vector2();
      new Exception("Unexpected value", "Passed value 'position' was not a value of type Vector2.<br/>Value type: " + position.valueOf(), this);
    }
    if(typeof width == "number")
    {
      this.width = width;
    }
    else
    {
      this.width = 0;
      new Exception("Unexpected value", "Passed value 'width' was not a number.<br/>Value type: " + typeof position, this);
    }
    
    Circle.prototype.toString = function()
    {
      if(this._isValid)
        return this.width + "pixels diameter Circle<br/>Color: " + this.color + "<br/>Position: " + this.position.toString();
      else
        return "<a style='color:red;'>[Circle]</a>";
    }
    
    this.init();
  }
  
  init()
  {
    this.display = document.createElement("span");
    content.appendChild(this.display);
    this.display.style.display = "block";
    this.display.style.position = "absolute";
    this.display.style.borderRadius = "50%";
    this.update();
  }
  
  update()
  {
    this.display.style.width = this.width;
    this.display.style.height = this.width;
    this.display.style.backgroundColor = this.color;
    this.display.style.left = this.position.x - this.width/2;
    this.display.style.bottom = this.position.y - this.width/2;
  }
  
  remove()
  {
    this.display.remove();
  }
}

class Line
{
  constructor(start, end, width = 1, color = "white")
  {
    Line.prototype.valueOf = function()
    {
      return "Line";
    }
    
    this._isValid = true;
    this.width = width;
    this.color = color;
    if(start.valueOf() == "Vector2")
    {
      this.start = start;
    }
    else
    {
      this.start = new Vector2();
      new Exception("Unexpected value", "Passed value 'start' was not a value of type Vector2.<br/>Value type: " + start.valueOf(), this);
    }
    if(end.valueOf() == "Vector2")
    {
      this.end = end;
    }
    else
    {
      this.end = new Vector2();
      new Exception("Unexpected value", "Passed value 'end' was not a value of type Vector2.<br/>Value type: " + end.valueOf(), this);
    }
    
    Line.prototype.toString = function()
    {
      if(this._isValid)
        return this.width + "pixels wide Line<br/>Color: " + this.color + "<br/>Start: " + this.start.toString() + " | End: " + this.end.toString();
      else
        return "<a style='color:red;'>[Line]</a>";
    }
    
    this.init();
  }
  
  init()
  {
    this.point = document.createElement("a");
    content.appendChild(this.point);
    this.display = document.createElement("div");
    this.point.appendChild(this.display);
    this.point.style.position = "absolute";
    this.display.style.position = "absolute";
    
    this.update();
  }
  
  update()
  {
    this.point.style.left = this.start.x;
    this.point.style.bottom = this.start.y;
    this.display.style.height = this.start.dist(this.end) + this.width * 2;
    this.display.style.width = this.width;
    this.display.style.left = 0 - this.width/2;
    this.display.style.bottom = 0 - this.width/2;
    this.display.style.backgroundColor = this.color;
    var rad = Math.acos((this.end.y-this.start.y)/this.start.dist(this.end));
    if(this.end.x < this.start.x)
      rad *= -1;
    this.point.style.transform = "rotate(" + rad + "rad)";
  }
  
  remove()
  {
    this.display.remove();
  }
}

class Box
{
  constructor(position, size, color = "white")
  {
    Box.prototype.valueOf = function()
    {
      return "Box";
    }
    
    this._isValid = true;
    this.color = color;
    if(position.valueOf() == "Vector2")
    {
      this.position = position;
    }
    else
    {
      this.position = new Vector2();
      new Exception("Unexpected value", "Passed value 'position' was not a value of type Vector2.<br/>Value type: " + position.valueOf(), this);
    }
    if(size.valueOf() == "Vector2")
    {
      this.size = size;
    }
    else
    {
      this.size = new Vector2();
      new Exception("Unexpected value", "Passed value 'size' was not a value of type Vector2.<br/>Value type: " + size.valueOf(), this);
    }
    
    Box.prototype.toString = function()
    {
      if(this._isValid)
        return "Box<br/>Color: " + this.color + "<br/>Position: " + this.position.toString() + "<br/>Size: " + this.size.toString();
      else
        return "<a style='color:red;'>[Box]</a>";
    }
    
    this.init();
  }
  
  init()
  {
    this.display = document.createElement("div");
    content.appendChild(this.display);
    this.display.style.position = "absolute";
    this.update();
  }
  
  update()
  {
    this.display.style.backgroundColor = this.color;
    this.display.style.width = this.size.x;
    this.display.style.height = this.size.y;
    this.display.style.left = this.position.x;
    this.display.style.bottom = this.position.y;
  }
  
  remove()
  {
    this.display.remove();
  }
}

class Sprite
{
  constructor(position, size, url)
  {
    Sprite.prototype.valueOf = function()
    {
      return "Sprite";
    }
    
    this._isValid = true;
    if(typeof url == "string")
    {
      this.url = url;
    }
    else
    {
      this.url = "";
      new Exception("Unexpected value", "Passed value 'url' was not a value of type string.<br/>Value type: " + typeof url, this);
    }
    if(position.valueOf() == "Vector2")
    {
      this.position = position;
    }
    else
    {
      this.position = new Vector2();
      new Exception("Unexpected value", "Passed value 'position' was not a value of type Vector2.<br/>Value type: " + position.valueOf(), this);
    }
    if(size.valueOf() == "Vector2")
    {
      this.size = size;
    }
    else
    {
      this.size = new Vector2();
      new Exception("Unexpected value", "Passed value 'size' was not a value of type Vector2.<br/>Value type: " + size.valueOf(), this);
    }
    
    Sprite.prototype.toString = function()
    {
      if(this._isValid)
        return "Sprite<br/>Url: " + this.url + "<br/>Position: " + this.position.toString() + "<br/>Size: " + this.size.toString();
      else
        return "<a style='color:red;'>[Sprite]</a>";
    }
    
    this.init();
  }
  
  init()
  {
    this.display = document.createElement("img");
    content.appendChild(this.display);
    readOnly(this.display);
    this.display.style.position = "absolute";
    try
    {
    this.update();
    }
    catch(error)
    {
      new Exception(error);
    }
  }
  
  update()
  {
    this.display.src = this.url;
    this.display.style.width = this.size.x;
    this.display.style.height = this.size.y;
    this.display.style.left = this.position.x;
    this.display.style.bottom = this.position.y;
  }
  
  remove()
  {
    this.display.remove();
  }
}

//Start a javascript file of your choice (has to be in the 'Games' directory)
function execute(name)
{
  if(!window.executing)
  {
    window.executing = true;
    var log = new Log("Executing '" + name + "'...", "cyan", true, "Gear.png");
    
    if(window.executed !== undefined)
      new Warning("File execution", "Already executed file earlier.<br/>Executing more than one file at once can bug out the process of previous files.")
    
    var game = document.createElement("script");
    game.src = "../Games/" + name + ".js";
    document.getElementById("Games").appendChild(game);
    
    setTimeout(function(){
      //Start call
      window.executed = "";
      window.executing = false;
      content.innerHTML = "<img id='start' src='invalid' onerror='Start()'></img>";
      document.getElementById("start").remove();
      
      //Check callback
      if(window.Game !== undefined)
      {
        if(window.Game.name === undefined)
          window.Game.name = "*no name*";
        if(window.Game.author === undefined)
          window.Game.author = "anonymous";
        if(window.Game.desc === undefined)
          window.Game.desc = "*empty*";
        
        //Successful
        if(log.isValid())
        {
          log.edit("Successfully executed '" + window.Game.name + "'!<br/>Made by " + window.Game.author + "<br/>Description: " + window.Game.desc);
          log.setColor("lime");
          log.setImage("GreenCheckmark.png");
        }
        else
          new Log("Successfully executed '" + window.Game.name + "'!<br/>Made by " + window.Game.author + "<br/>Description: " + window.Game.desc, "lime", true, "GreenCheckmark.png");
        
        //Update call
        _Update = setInterval(_u1, window.interval);
        return true;
      }
      else
      {
        log.remove();
        new Exception("File execution", "No information callback was done. There is a chance that the file wasn't meant to be executed in that way or that it simply doesn't exist.");
        return false;
      }
    }, 1000);
  }
  else
  {
    new Exception("File execution", "Cannot execute file because the console is already executing a file.");
    return;
  }
}

//Console toggle
function toggleConsole()
{
  if(Console.style.top == "10px")
    Console.style.top = "-300px";
  else
    Console.style.top = "10px";
    
  if(Toggle.style.transform == "rotate(180deg)")
    Toggle.style.transform = "rotate(0deg)";
  else
    Toggle.style.transform = "rotate(180deg)";
}

function clearConsole()
{
  Logs = document.getElementById("Logs");
  Logs.innerHTML = "<p id='BlankLog'>There are no logs yet.</p>";
}

//Keyboard Inputs
document.addEventListener('keydown', function(event) {
  //Call keydown event
  Keydown(event);
  
  //Handle commands + lock textarea
  if(event.keyCode == 13) {
    lockTextArea();
    handleCommands(popTextArea());
  }
});

document.addEventListener('keyup', function(event) {
  //Call keyup event
  Keyup(event);
  
  //unlock textarea
  if(event.keyCode == 13) {
    unlockTextArea();
  }
});

//Console TextArea stuff
function lockTextArea()
{
  TextArea.readOnly = true;
}

function unlockTextArea()
{
  TextArea.readOnly = false;
}

function popTextArea()
{
  var Result = TextArea.value;
  TextArea.value = "";
  return Result;
}

function correctTextArea()
{
  TextArea.value = TextArea.value.replace(/\n/g, "").replace(/</g, "").replace(/>/g, "");
}

//Console commands
function handleCommands(message)
{
  if(message.startsWith("/"))
  {
    var commands = {
      "execute":function(args){
        if(args.length == 1)
          execute(args[0]);
        else
          new Exception("Console command", "Invalid argument amount. Expected 1 argument.");
      },
      "clear":function(args){
        if(args.length === 0)
          clearConsole();
        else
          new Exception("Console command", "Invalid argument amount. Expected 0 arguments.");
      }
    };
    
    var args = message.slice(1).split(" ");
    
    for(var i = 0; i < args.length; i++)
      if(args[i] === "")
      {
        new Exception("Console command", "One or more of the passed arguments returned undefined!");
        return;
      }
    
    try
    {
      commands[args[0]](args.slice(1));
    }
    catch(error)
    {
      new Exception("Console command", "No command named '" + args[0].toLowerCase() + "' exist.");
    }
  }
  else if(message.replace(/ /g, "") !== "")
    new Log(message);
}

//Handle update
var Update = function(){};
var _Update;
var _u1 = function(){
  clearInterval(_Update);
  Update();
  _Update = setInterval(_u2, window.interval);
};
var _u2 = function(){
  clearInterval(_Update);
  Update();
  _Update = setInterval(_u1, window.interval);
};

function readOnly(element)
{
  element.style.webkitTouchCallout = "none";
  element.style.webkitUserSelect = "none";
  element.style.khtmlUserSelect = "none";
  element.style.mozUserSelect = "none";
  element.style.msUserSelect = "none";
  element.style.userSelect = "none";
}

function random(start, end)
{
  return Math.random() * (end-start) + start;
}

function normalize(value, min, max)
{
  if(typeof value == "number" && typeof min == "number" && typeof max == "number")
  {
    return (value - min)/(max - min);
  }
  else
  {
    new Exception("Unexpected value", "Cannot normalize value becauses one or more of the passed values weren't values of type number.");
  }
}

function clamp(value, min, max)
{
  if(typeof value == "number" && typeof min == "number" && typeof max == "number")
  {
    if(value < min)
      return min;
    else if(value > max)
      return max;
    else
      return value;
  }
  else
  {
    new Exception("Unexpected value", "Cannot clamp value becauses one or more of the passed values weren't values of type number.");
  }
}

function collision(element1, element2)
{
  var Rect1 = element1.getBoundingClientRect();
  var Rect2 = element2.getBoundingClientRect();
    
  var overlap = !(Rect1.right < Rect2.left ||
                  Rect1.left > Rect2.right ||
                  Rect1.bottom < Rect2.top ||
                  Rect1.top > Rect2.bottom)
  
  
  if(overlap)
    return {other:element2};
  else
    return false;
}
