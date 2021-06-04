var Console = document.getElementById("Console");
var TextArea = document.getElementById("ConsoleTA");
var Toggle = document.getElementById("ConsoleToggle");
var Content = document.getElementById("Content");
var CheckedValidity = false;
var IsExecuting = false;

class Exception
{
  constructor(type, message, reference = null)
  {
    this.reference = reference;
    if(message !== undefined)
    {
      if(this.reference !== null)
      {
        if(typeof this.reference == "object")
        {
          try
          {
            this.message = type.toString() + " exception in " + this.reference.constructor.name + " class:<br/>" + message.toString();
          }
          catch(error)
          {
            this.message = type.toString() + " exception in " + this.reference.valueOf() + ":<br/>" + message.toString();
          }
          this.reference._isValid = false;
        }
        else
          this.message = type.toString() + " exception:<br/>" + message.toString();
      }
      else
        this.message = type.toString() + " exception:<br/>" + message.toString();
    }
    else
      this.message = "Exception:<br/>" + type.toString();
    
    Exception.prototype.toString = function()
    {
      return this.message;
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
    
    var P = document.createElement("p")
    P.className = "ErrLog";
    P.innerHTML = this.toString();
    
    Logs.appendChild(P);
    P.scrollIntoView(true);
  }
}

class Log
{
  constructor(message, color = "white", scroll = true)
  {
    this.message = message.toString();
    this.color = color;
    this.scroll = scroll;
    
    Log.prototype.toString = function()
    {
      return this.message;
    }
    
    Log.prototype.valueOf = function()
    {
      return "Log";
    }
    
    this.print();
  }
  
  print()
  {
    var BlankLog = document.getElementById("BlankLog");
  
    if(BlankLog !== null)
      BlankLog.remove();
    
    var Logs = document.getElementById("Logs");
    
    this.Display = document.createElement("p")
    this.Display.className = "Log";
    this.Display.innerHTML = this.message;
    this.Display.style.color = this.color;
    this.Display.style.borderLeft = "2px solid " + this.color;
    
    Logs.appendChild(this.Display);
    this.Display.scrollIntoView(this.scroll);
  }
  
  edit(message)
  {
    this.Display.innerHTML = message.toString();
  }
  
  setColor(color)
  {
    this.Display.style.color = color;
    this.Display.style.borderLeft = "2px solid " + color;
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
}

const content = document.getElementById("Content");

//Start a javascript file of your choice (has to be in the 'Games' directory)
function Execute(name)
{
  if(!IsExecuting)
  {
    CheckedValidity = false;
    IsExecuting = true;
    
    if(window.IsReady)
    {
      new Exception("File execution", "Cannot execute file because another one has already been executed.");
      return;
    }
    
    var Game = document.createElement("script");
    Game.src = "../Games/" + name + ".js";
    document.getElementById("Games").appendChild(Game);
    
    new Log("Attempt to execute '" + name + "'.<br/>Please wait around 1 to 2 seconds to get a response.", "cyan");
    
    setTimeout(function(){
      Content.innerHTML = "<img id='Check' src='execute' onerror='FileCheck.run(function(value){CheckValid(value);})'/>";
      document.getElementById("Check").remove();
      
      setTimeout(function () {
        if(!CheckedValidity)
          CheckValid({name:name});
      }, 1000);
    }, 1000);
  }
  else
    new Exception("File execution", "Already trying to execute a file.");
}

function CheckValid(game = {})
{
  
  CheckedValidity = true;
  IsExecuting = false;
  
  if (window.IsReady === undefined)
  {
    new Exception("File execution", "Failed to execute '" + game.name + "'. This may be because file wasn't found or because file wasn't meant to be executed in that way.");
    return;
  }
  else
  {
    if(game.name === undefined)
      game.name = "*no name*"
    
    if(game.author === undefined)
      game.author = "anonymous"
    
    if(game.desc === undefined)
      game.desc = "*empty*"
    
    new Log("Successfully executed '" + game.name + "'!<br/>Made by " + game.author + "<br/>Description: " + game.desc, "lime");
    Content.innerHTML = "<img id='StartCall' src='execute' onerror='Start()'/>";
    document.getElementById("StartCall").remove();
    return;
  }
}

//Console toggle
function ToggleConsole()
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

//Keyboard Inputs
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 13) {
      LockTextArea();
      DoCommand(PopTextArea());
    }
});

document.addEventListener('keyup', function(event) {
    if(event.keyCode == 13) {
      UnlockTextArea();
    }
});

//Console TextArea stuff
function LockTextArea()
{
  TextArea.readOnly = true;
}

function UnlockTextArea()
{
  TextArea.readOnly = false;
}

function PopTextArea()
{
  var Result = TextArea.value;
  TextArea.value = "";
  return Result;
}

function CorrectTextArea()
{
  TextArea.value = TextArea.value.replace(/\n/g, "").replace(/</g, "").replace(/>/g, "");
}

//Console commands
function DoCommand(message)
{
  if(message.startsWith("/"))
  {
    var args = message.replace("/", "").split(" ");
    
    for(var i = 0; i < args.length; i++)
      if(args[i] === "")
      {
        new Exception("Console command", "One or more of the passed arguments returned undefined!");
        return;
      }
    
    if(args[0].toLowerCase() == "execute")
    {
      if(args.length == 2)
        Execute(args[1]);
      else
        new Exception("Console command", "Invalid argument amount. Expected 1 argument.");
      return;
    }
    else if(args[0].toLowerCase() == "clear")
      if(args.length == 1)
      {
        Logs = document.getElementById("Logs");
        Logs.innerHTML = "<p id='BlankLog'>There are no logs yet.</p>";
        return;
      }
      else
      {
        new Exception("Console command", "Invalid argument amount. Expected 1 argument.");
        return;
      }
        
    new Exception("Console command", "No command named '" + args[0].toLowerCase() + "' exist.");
  }
  else
    if(message.replace(/ /g, "") !== "")
      new Log(message);
}

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
