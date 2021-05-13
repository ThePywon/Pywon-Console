var Console = document.getElementById("Console");
var TextArea = document.getElementById("ConsoleTA");
var Toggle = document.getElementById("ConsoleToggle");
var Content = document.getElementById("Content");
var CheckedValidity = false;
var IsExecuting = false;

class Exception
{
  constructor(message, reference = null)
  {
    this.reference = reference;
    if(this.reference !== null)
    {
      if(typeof this.reference == "object")
      {
        try
        {
          this.message = "Exception in " + this.reference.constructor.name + " class:<br/>" + message.toString();
        }
        catch(error)
        {
          this.message = "Exception in " + this.reference.valueOf() + ":<br/>" + message.toString();
        }
        this.reference._isValid = false;
      }
      else
        this.message = "Exception:<br/>" + message.toString();
    }
    else
      this.message = "Exception:<br/>" + message.toString();
    
    this.init();
  }
  
  init()
  {
    Exception.prototype.toString = function()
    {
      return this.message;
    }
    
    Exception.prototype.valueOf = function()
    {
      return "Exception";
    }
    
    this.LogError();
  }
  
  LogError()
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

class Dir2D
{
  constructor(val = "none")
  {
    this._isValid = true;
    if(val.toLowerCase() == "none" || val.toLowerCase() == "left" || val.toLowerCase() == "up" || val.toLowerCase() == "right" || val.toLowerCase() == "down")
      this.value = val.toLowerCase();
    else
    {
      this.value = undefined;
      new Exception("Passed value 'val' was not a valid value.<br/>Value: " + val, this);
    }
    
    this.init();
  }
  
  init()
  {
    Dir2D.prototype.toString = function()
    {
      return this.value;
    }
    
    Dir2D.prototype.valueOf = function()
    {
      return "Dir2D";
    }
  }
  
  Equals(Dir)
  {
    if(Dir.valueOf() == "Dir2D")
    {
      if(this._isValid && Dir._isValid)
        return this.value == Dir.value;
      else
      {
        new Exception("Dir2D cannot compare with 'Dir' either because the passed value was invalid or because this value was invalid.");
        return false;
      }
    }
    else if(typeof Dir == "string")
    {
      if(this._isValid)
        return this.value == Dir;
      else
      {
        new Exception("Dir2D cannot compare with 'Dir' because this value was invalid.");
        return false;
      }
    }
    else
    {
      new Exception("Dir2D cannot compare with 'Dir' because it wasn't a value of type Dir2D nor a value of type string.");
      return false;
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
      new Exception("Cannot parse Dir to Vector2 because the Dir was invalid.", this);
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
        return 180;
      else if(this.value == "up")
        return -90;
      else if(this.value == "right")
        return 0;
      else if(this.value == "down")
        return 90;
    }
    else
    {
      new Exception("Cannot parse Dir to degrees because the Dir was invalid.", this);
      return null;
    }
  }
}

class Vector2
{
  constructor(X = 0, Y = 0)
  {
    Vector2.prototype.valueOf = function()
    {
      return "Vector2";
    }
    
    this._isValid = true;
    if(typeof X == "number")
      this.X = X;
    else
    {
      this.X = NaN;
      new Exception("Passed value 'X' was not a number.<br/>Value type: " + typeof X, this);
      return;
    }
    if(typeof Y == "number")
      this.Y = Y;
    else
    {
      this.Y = NaN;
      new Exception("Passed value 'Y' was not a number.<br/>Value type: " + typeof Y, this);
      this.init();
      return;
    }
    
    Vector2.prototype.toString = function()
    {
      if(!isNaN(this.X) && !isNaN(this.Y))
        return "(" + this.X + ", " + this.Y +")";
      else
        return "<a style='color:red;'>[Vector2]</a>";
    }
  }
  
  Equals(other)
  {
    if(other.valueOf() == "Vector2")
    {
      if(this._isValid && other._isValid)
      {
        if(other.X == this.X && other.Y == this.Y)
          return true;
        else
          return false;
      }
      else
      {
        new Exception("Vector2 cannot compare with 'other' either because the passed value was invalid or because this value was invalid.");
        return false;
      }
    }
    else
    {
      new Exception("Vector2 cannot compare with 'other' because is wasn't a value of type Vector2.");
      return false;
    }
  }
  
  Add(value)
  {
    if(value.valueOf() == "Vector2")
    {
      if(this._isValid && value._isValid)
      {
        return new Vector2(this.X + value.X, this.Y + value.Y);
      }
      else
      {
        new Exception("Vector2 cannot make an addition with 'other' either because the passed value was invalid or because this value was invalid.");
        return null;
      }
    }
    else if(typeof value == "number")
    {
      if(this._isValid)
      {
        return new Vector2(this.X + value, this.Y + value);
      }
      else
      {
        new Exception("Vector2 cannot make an addition with 'other' because this value was invalid.");
        return null;
      }
    }
    else
    {
      new Exception("Vector2 cannot make an addition with 'other' because is wasn't a value of type Vector2 nor a value of type number.");
      return false;
    }
  }
  
  Sub(value)
  {
    if(value.valueOf() == "Vector2")
    {
      if(this._isValid && value._isValid)
      {
        return new Vector2(this.X - value.X, this.Y - value.Y);
      }
      else
      {
        new Exception("Vector2 cannot make an substraction with 'other' either because the passed value was invalid or because this value was invalid.");
        return null;
      }
    }
    else if(typeof value == "number")
    {
      if(this._isValid)
      {
        return new Vector2(this.X - value, this.Y - value);
      }
      else
      {
        new Exception("Vector2 cannot make an substraction with 'other' because this value was invalid.");
        return null;
      }
    }
    else
    {
      new Exception("Vector2 cannot make an substraction with 'other' because is wasn't a value of type Vector2 nor a value of type number.");
      return false;
    }
  }
  
  Multi(value)
  {
    if(value.valueOf() == "Vector2")
    {
      if(this._isValid && value._isValid)
      {
        return new Vector2(this.X * value.X, this.Y * value.Y);
      }
      else
      {
        new Exception("Vector2 cannot make an multiplication with 'other' either because the passed value was invalid or because this value was invalid.");
        return null;
      }
    }
    else if(typeof value == "number")
    {
      if(this._isValid)
      {
        return new Vector2(this.X * value, this.Y * value);
      }
      else
      {
        new Exception("Vector2 cannot make an multiplication with 'other' because this value was invalid.");
        return null;
      }
    }
    else
    {
      new Exception("Vector2 cannot make an multiplication with 'other' because is wasn't a value of type Vector2 nor a value of type number.");
      return false;
    }
  }
  
  Div(value)
  {
    if(value.valueOf() == "Vector2")
    {
      if(this._isValid && value._isValid)
      {
        return new Vector2(this.X / value.X, this.Y / value.Y);
      }
      else
      {
        new Exception("Vector2 cannot make an divide with 'other' either because the passed value was invalid or because this value was invalid.");
        return null;
      }
    }
    else if(typeof value == "number")
    {
      if(this._isValid)
      {
        return new Vector2(this.X / value, this.Y / value);
      }
      else
      {
        new Exception("Vector2 cannot make an divide with 'other' because this value was invalid.");
        return null;
      }
    }
    else
    {
      new Exception("Vector2 cannot make an divide with 'other' because is wasn't a value of type Vector2 nor a value of type number.");
      return false;
    }
  }
  
  Dist(other)
  {
    if(other.valueOf() == "Vector2")
    {
      if(this._isValid && other._isValid)
      {
        var thirdPoint = new Vector2(this.X, other.Y);
        var a = Math.abs(thirdPoint.X - other.X);
        var b = Math.abs(thirdPoint.Y - this.Y);
        var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        return c;
      }
      else
      {
        new Exception("Vector2 cannot calculate distance with 'other' either because the passed value was invalid or because this value was invalid.");
        return null;
      }
    }
    else
    {
      new Exception("Vector2 cannot calculate distance with 'other' because is wasn't a value of type 'Vector2'.");
      return false;
    }
  }
}

//Start a javascript file of your choice (has to be in the 'Games' directory)
function Execute(name)
{
  if(!IsExecuting)
  {
    CheckedValidity = false;
    IsExecuting = true;
    
    if(window.IsReady)
    {
      new Exception("Cannot execute file because another one has already been executed.");
      return;
    }
    
    var Game = document.createElement("script");
    Game.src = "../Games/" + name + ".js";
    document.getElementById("Games").appendChild(Game);
    
    Log("Attempt to execute '" + name + "'.<br/>Please wait around 1 to 2 seconds to get a response.", "cyan");
    
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
    new Exception("Already trying to execute a file.");
}

function CheckValid(game = {})
{
  
  CheckedValidity = true;
  IsExecuting = false;
  
  if (window.IsReady === undefined)
  {
    new Exception("Failed to execute '" + game.name + "'. This may be because file wasn't found or because file wasn't meant to be executed in that way.");
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
    
    Log("Successfully executed '" + game.name + "'!<br/>Made by " + game.author + "<br/>Description: " + game.desc, "lime");
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

//Console Log system
function Log(message, color = "white", scroll = true)
{
  var BlankLog = document.getElementById("BlankLog");
  
  if(BlankLog !== null)
    BlankLog.remove();
  
  var Logs = document.getElementById("Logs");
  
  var P = document.createElement("p")
  P.className = "Log";
  P.innerHTML = message;
  P.style.color = color;
  P.style.borderLeft = "2px solid " + color;
  
  Logs.appendChild(P);
  P.scrollIntoView(scroll);
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
        new Exception("One or more of the passed arguments returned undefined!");
        return;
      }
    
    if(args[0].toLowerCase() == "execute")
    {
      if(args.length == 2)
        Execute(args[1]);
      else
        new Exception("Invalid argument amount. Expected 1 argument.");
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
        new Exception("Invalid argument amount. Expected 1 argument.");
        return;
      }
        
    new Exception("No command named '" + args[0] + "' exist.");
  }
  else
    if(message.replace(/ /g, "") !== "")
      Log(message);
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
    new Exception("Invalid direction passed in getV2fromDir()");
  
  return new Vector2();
}

function invertDir(dir)
{
  if(dir.toLowerCase() == "up")
    return "down";
  else if(dir.toLowerCase() == "right")
    return "left";
  else if(dir.toLowerCase() == "down")
    return "up";
  else if(dir.toLowerCase() == "left")
    return "right"
  else
    new Exception("Invalid direction passed in getV2fromDir()");
  
  return null;
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
