var Console = document.getElementById("Console");
var TextArea = document.getElementById("ConsoleTA");
var Toggle = document.getElementById("ConsoleToggle");
var Content = document.getElementById("Content");
var CheckedValidity = false;
var IsExecuting = false;

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

//Start a javascript file of your choice (has to be in the 'Games' directory)
function Execute(name)
{
  if(!IsExecuting)
  {
    CheckedValidity = false;
    IsExecuting = true;
    
    if(window.IsReady)
    {
      LogError("Cannot execute file because another one has already been executed.");
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
    LogError("Already trying to execute a file.");
}

function CheckValid(game = {})
{
  
  CheckedValidity = true;
  IsExecuting = false;
  
  if (window.IsReady === undefined)
  {
    LogError("Failed to execute '" + game.name + "'. This may be because file wasn't found or because file wasn't meant to be executed in that way.");
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
function Log(message, mainColor = "white")
{
  BlankLog = document.getElementById("BlankLog");
  
  if(BlankLog !== null)
    BlankLog.remove();
  
  Logs = document.getElementById("Logs");
  
  P = document.createElement("p")
  P.className = "Log";
  P.innerHTML = message;
  P.style.color = mainColor;
  P.style.borderLeft = "2px solid " + mainColor;
  
  Logs.appendChild(P);
  P.scrollIntoView(true);
}

function LogError(message)
{
  BlankLog = document.getElementById("BlankLog");
  
  if(BlankLog !== null)
    BlankLog.remove();
  
  Logs = document.getElementById("Logs");
  
  P = document.createElement("p")
  P.className = "ErrLog";
  P.innerHTML = message;
  
  Logs.appendChild(P);
  P.scrollIntoView(true);
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
        LogError("One or more of the passed arguments returned undefined!");
        return;
      }
    
    if(args[0].toLowerCase() == "execute")
    {
      if(args.length == 2)
        Execute(args[1]);
      else
        LogError("Invalid argument amount. Expected 1 argument.");
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
        LogError("Invalid argument amount. Expected 1 argument.");
        return;
      }
        
    LogError("No command named '" + args[0] + "' exist.");
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
    LogError("Invalid direction passed in getV2fromDir()");
  
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
    LogError("Invalid direction passed in getV2fromDir()");
  
  return null;
}
