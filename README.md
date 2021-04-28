Hello, this is a little project of mine I made for fun.
Its a console wich can execute some .js files in the Games folder.

You can add your own game in there by including a line of code like that in there:
const FileCheck = {run:(callback) => {window.IsReady=true;callback({name:"Game Name", author:"Your Name", desc:"Some Description"});}};

To run it just type:
/execute Filename.js
in the console.

You can use the console yourself using 'Log("text", "CSScolor")' and 'LogError("text")'

Last thing I must tell you is that to run the console you have to go to the Scripts folder and open 'main.html'

Have a very nice day.
