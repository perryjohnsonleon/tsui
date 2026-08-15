
<h2>Redirect to a Webpage</h2>
<p>The replace() method replaces the current document with a new one:</p>

<button onclick="myFunction()">Replace document</button>

<script>
function myFunction() {
  location.replace("https://www.w3schools.com")
}
</script>

</body>
</html> 

<!DOCTYPE html>
<html>
<style>
#myProgress {
  width: 100%;
  height: 30px;
  position: relative;
  background-color: #ddd;
}

#myBar {
  background-color: #4CAF50;
  width: 10px;
  height: 30px;
  position: absolute;
}
</style>
<body>

<h1>JavaScript Progress Bar</h1>

<div id="myProgress">
  <div id="myBar"></div>
</div>

<br>
<button onclick="move()">Click Me</button> 

<script>
function move() {
  const element = document.getElementById("myBar");   
  let width = 0;
  const id = setInterval(frame, 10);
  function frame() {
    if (width == 100) {
      clearInterval(id);
    } else {
      width++; 
      element.style.width = width + '%'; 
    }
  }
}
</script>

<h1>The Window Object</h1>
<h2>The setInterval() and clearInterval() Methods</h2>

<p>In this example, the setInterval() method executes the setColor() function once every 500 milliseconds
to toggle between two background colors.</p>

<button onclick="stopColor()">Stop Toggling</button>

<script>
myInterval = setInterval(setColor, 500);
 
function setColor() {
  let x = document.body;
  x.style.backgroundColor = x.style.backgroundColor == "yellow" ? "pink" : "yellow";
}
 
function stopColor() {
  clearInterval(myInterval);
}
</script>

<script>
let text = "Hello planet earth, you are a great planet.";
let result = text.lastIndexOf("planet");

document.getElementById("demo").innerHTML = result;
</script>
<html>
<body>

<h1>JavaScript Strings</h1>
<h2>The slice() Method</h2>

<p>slice() extracts a part of a string and returns the extracted part:</p>

<p id="demo"></p>

<script>
let text = "Hello world!"; 
let result = text.slice(3);

document.getElementById("demo").innerHTML = result;
</script>

</body>
</html>


</body>
</html>

</body>
</html>
