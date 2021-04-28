var Content = document.getElementById("Content");
var DialogueBox = document.createElement("div");
var CharacterImg = document.createElement("img");
var DialogueBoxContent = document.createElement("div");
var Asterix = document.createElement("div");
var DialogueBoxText = document.createElement("div");
var DialogueIndex = 0;
var CharIndex = 0;
var IsReading = false;
var Skipped = false;
var Scene = document.createElement("div");
var BackgroundImg = document.createElement("img");

class Character
{
  constructor(name, images, font)
  {
    this.name = name;
    this.images = images;
    this.font = font;
  }
}

class Dialogue
{
  constructor(character, imgIndex, text, asterix = true, delay = 50, skippable = true, action = function(){})
  {
    this.character = character;
    this.imgIndex = imgIndex;
    this.text = text;
    this.asterix = asterix;
    this.delay = delay;
    this.skippable = skippable;
    this.action = action;
  }
}

var Characters = [
  new Character("Title", ["Placeholder"], "Title"),
  new Character("Menu", ["Placeholder"], "Determination"),
  new Character("Protagonist", ["Placeholder"], "Determination"),
  new Character("Flowey", ["Face_FloweyDefault", "Face_FloweyBlinking"], "Determination")
  ]

var Dialogues = [
  new Dialogue("Menu", 0, "Long ago, two races ruled over Earth:<b>HUMANS and MONSTERS.", false, 50, false),
  new Dialogue("Menu", 0, "One day, war broke out between the two races.", false, 50, false),
  new Dialogue("Menu", 0, "After a long battle,<b>the humans were victorious.", false, 50, false),
  new Dialogue("Menu", 0, "They sealed the monsters underground with a magic spell.", false, 50, false),
  new Dialogue("Menu", 0, "Many years later...", false, 50, false),
  new Dialogue("Menu", 0, "MT. EBOTT<b>201*", false, 50, false),
  new Dialogue("Menu", 0, "Legends say that those who climb the mountain never return.", false, 50, false),
  new Dialogue("Protagonist", 0, "", false, 0),
  new Dialogue("Title", 0, "Undertale", false, 0),
  new Dialogue("Title", 0, "<Y>Hackertale</Y>", false, 0),
  new Dialogue("Menu", 0, "Name the fallen human."),
  new Dialogue("Protagonist", 0, "S a m", false, 500),
  new Dialogue("Menu", 0, "Is this name correct?"),
  new Dialogue("Protagonist", 0, "Yes", false, 1000),
  new Dialogue("Menu", 0, "Sam wakes up."),
  new Dialogue("Menu", 0, "She looks at the bed of flowers, all <Y>golden</Y> for some reason.", true, 50, true, function(){
    SetBkgdImg("GoldenFlowers", 320, 320);
  }),
  new Dialogue("Menu", 0, "She then looks at the hole, far above her head.", true, 50, true, function(){
    HideBkgdImg();
  }),
  new Dialogue("Menu", 0, "Looks like she's trapped underground."),
  new Dialogue("Menu", 0, "She stands up and start heading in the darkness.", true, 50, true, function(){
    SetBkgdImg("DarkHallway", 320, 320);
  }),
  new Dialogue("Menu", 0, "She goes through the dark hallway..."),
  new Dialogue("Menu", 0, "She then looks at the strange doorway at the end of the passage.", true, 50, true, function(){
    HideBkgdImg();
  }),
  new Dialogue("Menu", 0, "It's open."),
  new Dialogue("Menu", 0, "In the other side is another room, dimly lit by another little hole in the mountain.", true, 50, true, function(){
    SetBkgdImg("FloweyRoom");
  }),
  new Dialogue("Menu", 0, "It's lightning up a single golden flower in the center of the room."),
  new Dialogue("Menu", 0, "Suddently, as she approches, the flower starts talking.", true, 50, true, function(){
    SetBkgdImg("FriendlyFlowey");
  }),
  new Dialogue("Flowey", 0, "Howdy!<b>I'm <Y>FLOWEY</Y>.<b><Y>FLOWEY</Y> the <Y>FLOWER</Y>!"),
  new Dialogue("Flowey", 0, "Hmmm..."),
  new Dialogue("Flowey", 0, "You're new to the UNDERGROUND, aren'tcha?"),
  new Dialogue("Flowey", 0, "Golly, you must be so confused."),
  new Dialogue("Flowey", 0, "Someone ought to teach you how things work around here!"),
  new Dialogue("Flowey", 0, "I guess little old me will have to do."),
  new Dialogue("Flowey", 0, "Ready?<b>Here we go!", true, 50, true, function(){
      window.Instance1 = document.createElement("img");
      Content.appendChild(window.Instance1);
      window.Instance1.src = "../Assets/Images/SOUL_DETERMINATION.png";
      window.Instance1.style.width = 80;
      window.Instance1.style.height = 80;
      window.Instance1.style.position = "absolute";
      window.Instance1.style.left = parseInt((window.innerWidth-80)/2);
      window.Instance1.style.bottom = parseInt((window.innerHeight-240)/2);
      window.Instance1.style.transition = "left 3s ease";
  }),
    new Dialogue("Flowey", 0, "See that hearth?<b>That is your SOUL, the very culmination of your being!"),
    new Dialogue("Flowey", 0, "Your SOUL starts of weak, but you can grow strong if you gain a lot of LV."),
    new Dialogue("Flowey", 0, "What's LV stand for?<b>Why, LOVE, of course!"),
    new Dialogue("Flowey", 0, "You want some LOVE, don't you?"),
    new Dialogue("Flowey", 0, "Don't worry,<b>I'll share some with you!"),
    new Dialogue("Flowey", 1, " ", false, 1, false, function(){
      SetBkgdImg("BlinkFlowey");
    }),
    new Dialogue("Flowey", 0, "Down here, LOVE is shared through...", true, 50, true, function(){
      SetBkgdImg("FriendlyFlowey");
    }),
    new Dialogue("Flowey", 0, "Little white...<b>'friendliness pellets.'", true, 50, true, function(){
      window.Instance2 = document.createElement("img");
      Content.appendChild(window.Instance2);
      window.Instance2.src = "../Assets/Images/Pellet.png";
      window.Instance2.style.width = 120;
      window.Instance2.style.height = 120;
      window.Instance2.style.position = "absolute";
      window.Instance2.style.left = parseInt((window.innerWidth-120)/2);
      window.Instance2.style.bottom = 500;
      window.Instance2.style.transform = "rotate(0deg)";
      window.Instance2.style.transition = "bottom 3s ease";
      var Animation = setInterval(function(){
        if(window.Instance2 === null)
        {
          clearInterval(Animation);
          return;
        }
        if(window.Instance2.style.transform == "rotate(0deg)")
          window.Instance2.style.transform = "rotate(90deg)";
        else
          window.Instance2.style.transform = "rotate(0deg)";
      }, 100);
    }),
    new Dialogue("Flowey", 0, "Are you ready?"),
    new Dialogue("Flowey", 0, "Move around!<b>Get as many as you can!", true, 50, false, function(){
      window.Instance1.style.left = 400;
      window.Instance2.style.bottom = -120;
    })
  ]

const FileCheck = {run:(callback) => {window.IsReady=true;callback({name:"HackerTale", author:"<a href='https://discord.gg/pdgUD7R2'>Pywon</a> (some art by selfdestructingin163centimeters)", desc:"A Undertale narrative story :)"});}};

//On start

function Start()
{
  SetUpFonts();
  SetUpScene();
  SetUpTextBox();
  StartNextDialogue();
}

//Setups

function SetUpFonts()
{
  var DefaultFont = new FontFace('Determination', 'url(../Assets/Fonts/Default.woff) format("woff"), url(../Assets/Fonts/Default.ttf) format("truetype")');
  DefaultFont.load().then(function(font){document.fonts.add(font);});
  var TitleFont = new FontFace('Title', 'url(../Assets/Fonts/Title.woff) format("woff"), url(../Assets/Fonts/Title.ttf) format("truetype")');
  TitleFont.load().then(function(font){document.fonts.add(font);});
  var WingDingsFont = new FontFace('WingDings', 'url(../Assets/Fonts/WingDings.woff) format("woff"), url(../Assets/Fonts/WingDings.ttf) format("truetype")');
  WingDingsFont.load().then(function(font){document.fonts.add(font);});
  var PapyrusFont = new FontFace('Papyrus', 'url(../Assets/Fonts/Papyrus.woff) format("woff"), url(../Assets/Fonts/Papyrus.ttf) format("truetype")');
  PapyrusFont.load().then(function(font){document.fonts.add(font);});
  var sansFont = new FontFace('sans', 'url(../Assets/Fonts/sans.woff) format("woff"), url(../Assets/Fonts/sans.ttf) format("truetype")');
  sansFont.load().then(function(font){document.fonts.add(font);});
}

function SetUpTextBox()
{
  Content.appendChild(DialogueBox);
  DialogueBox.style.border="5px solid white";
  DialogueBox.style.width = 600;
  DialogueBox.style.height = 150;
  DialogueBox.style.position = "absolute";
  DialogueBox.style.bottom = 5;
  DialogueBox.style.left = 383;
  DialogueBox.style.color = "white";
  DialogueBox.style.backgroundColor = "black";
  DialogueBox.onclick = function(){StartNextDialogue();};
  DialogueBox.appendChild(CharacterImg);
  CharacterImg.style.height = 96;
  CharacterImg.style.width = 96;
  CharacterImg.style.position = "absolute";
  CharacterImg.style.left = 27;
  CharacterImg.style.bottom = 27;
  DialogueBox.appendChild(DialogueBoxContent);
  DialogueBoxContent.style.width = 450;
  DialogueBoxContent.style.height = 150;
  DialogueBoxContent.style.position = "absolute";
  DialogueBoxContent.style.bottom = 0;
  DialogueBoxContent.style.left = 150;
  DialogueBoxContent.style.webkitTouchCallout = "none";
  DialogueBoxContent.style.webkitUserSelect = "none";
  DialogueBoxContent.style.khtmlUserSelect = "none";
  DialogueBoxContent.style.mozUserSelect = "none";
  DialogueBoxContent.style.msUserSelect = "none";
  DialogueBoxContent.style.UserSelect = "none";
  DialogueBoxContent.style.fontSize = 32;
  DialogueBoxContent.appendChild(Asterix);
  Asterix.style.width = 32;
  Asterix.style.textAlign = "center";
  Asterix.style.position = "absolute";
  Asterix.style.top = 5;
  Asterix.innerHTML = "*";
  DialogueBoxContent.appendChild(DialogueBoxText);
  DialogueBoxText.style.width = 418;
  DialogueBoxText.style.position = "absolute";
  DialogueBoxText.style.left = 32;
  DialogueBoxText.style.top = 5;
}

function SetUpScene()
{
  Content.appendChild(Scene);
  Scene.style.position = "absolute";
  Scene.style.width = "100%";
  Scene.style.height = "100%";
  Scene.style.top = 0;
  Scene.style.left = 0;
  Scene.appendChild(BackgroundImg);
  BackgroundImg.style.position = "absolute";
  BackgroundImg.style.opacity = 0;
  BackgroundImg.style.transition = "opacity 0.5s ease";
}

//More used stuff

function StartNextDialogue()
{
  if(DialogueIndex < Dialogues.length)
  {
    if(Dialogues[DialogueIndex].skippable || !IsReading)
    {
      DialogueBoxText.innerHTML = "";
      Dialogues[DialogueIndex].action();
      CharIndex = 0;
    }
    DialogueBoxContent.style.fontFamily = GetCharacter(Dialogues[DialogueIndex].character).font;
    CharacterImg.src = "../Assets/Images/" + GetCharacter(Dialogues[DialogueIndex].character).images[Dialogues[DialogueIndex].imgIndex] + ".png";
    Asterix.hidden = !Dialogues[DialogueIndex].asterix;
    ReadNextDialogue();
  }
  else
  {
    DialogueBoxText.innerHTML = "The end";
    DialogueBoxContent.style.fontFamily = "Determination";
    CharacterImg.src = "../Assets/Images/Placeholder.png";
    Asterix.hidden = false;
    HideBkgdImg();
  }
}

function ReadNextDialogue()
{
  if(!IsReading)
  {
    IsReading = true;
      if(Dialogues[DialogueIndex].delay === 0)
        Skip();
      
      var loop = setInterval(function(){
      if(Skipped)
      {
        Skipped = false;
        IsReading = false;
        clearInterval(loop);
        return;
      }
        
      if(CharIndex < Dialogues[DialogueIndex].text.length)
      {
        if(CharIndex < Dialogues[DialogueIndex].text.length-2 &&
        Dialogues[DialogueIndex].text[CharIndex] == "<" &&
        Dialogues[DialogueIndex].text[CharIndex+1] == "b" &&
        Dialogues[DialogueIndex].text[CharIndex+2] == ">")
        {
          DialogueBoxText.innerHTML+="<br/>";
          CharIndex+=3;
        }
        else if(CharIndex < Dialogues[DialogueIndex].text.length-2 &&
        Dialogues[DialogueIndex].text[CharIndex] == "<" &&
        Dialogues[DialogueIndex].text[CharIndex+1] == "Y" &&
        Dialogues[DialogueIndex].text[CharIndex+2] == ">")
        {
          CharIndex+=3;
          ReadColor("yellow");
          clearInterval(loop);
          return;
        }
        else
        {
          DialogueBoxText.innerHTML+=Dialogues[DialogueIndex].text[CharIndex];
          CharIndex++;
        }
      }
      else
      {
        IsReading = false;
        DialogueIndex++;
        clearInterval(loop);
        return;
      }
    }, Dialogues[DialogueIndex].delay);
  }
  else if(Dialogues[DialogueIndex].skippable)
    Skip();
}

function ReadColor(color)
{
  var ColorNode = document.createElement("a");
  DialogueBoxText.appendChild(ColorNode);
  ColorNode.style.color = color;
  
  var loop = setInterval(function(){
    if(Skipped)
    {
      Skipped = false;
      IsReading = false;
      clearInterval(loop);
      return;
    }
          
    if(CharIndex < Dialogues[DialogueIndex].text.length)
    {
      if(CharIndex < Dialogues[DialogueIndex].text.length-2 &&
      Dialogues[DialogueIndex].text[CharIndex] == "<" &&
      Dialogues[DialogueIndex].text[CharIndex+1] == "b" &&
      Dialogues[DialogueIndex].text[CharIndex+2] == ">")
      {
        ColorNode.innerHTML+="<br/>";
        CharIndex+=3;
      }
      else if(CharIndex < Dialogues[DialogueIndex].text.length-2 &&
      Dialogues[DialogueIndex].text[CharIndex] == "<" &&
      Dialogues[DialogueIndex].text[CharIndex+1] == "/" &&
      Dialogues[DialogueIndex].text[CharIndex+2] == "Y" &&
      Dialogues[DialogueIndex].text[CharIndex+3] == ">")
      {
        if(color == "yellow")
        {
          CharIndex+=4;
          IsReading = false;
          ReadNextDialogue();
          clearInterval(loop);
          return;
        }
        else
          LogError("Invalid closing tag detected in dialogue.<br/>" + DialogueIndex + "." + CharIndex);
      }
      else
      {
        ColorNode.innerHTML+=Dialogues[DialogueIndex].text[CharIndex];
        CharIndex++;
      }
    }
    else
    {
      IsReading = false;
      DialogueIndex++;
      clearInterval(loop);
    }
  }, Dialogues[DialogueIndex].delay);
}

function Skip()
{
  if(!Skipped)
  {
    Skipped = true;
    IsReading = false;
    DialogueBoxText.innerHTML = Dialogues[DialogueIndex].text.replace(/<b>/g, "<br/>").replace(/<Y>/g, "<a style='color:yellow;'>").replace(/<\/Y>/g, "</a>");
    DialogueIndex++;
  }
}

function SetBkgdImg(url, width, height)
{
  BackgroundImg.style.width = width;
  BackgroundImg.style.height = height;
  BackgroundImg.style.left = parseInt((window.innerWidth-width)/2);
  BackgroundImg.style.bottom = parseInt((window.innerHeight-height+160)/2);
  BackgroundImg.src = "../Assets/Images/" + url + ".png";
  ShowBkgdImg();
}

function ShowBkgdImg()
{
  BackgroundImg.style.opacity = 1;
}

function HideBkgdImg()
{
  BackgroundImg.style.opacity = 0;
}

//Get values
function GetCharacter(name)
{
  for(var i = 0; i < Characters.length; i++)
  {
    if(Characters[i].name == name)
      return Characters[i];
  }
  
  return null;
}