var canvas = document.getElementsByTagName('canvas')[0];
var ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

window.addEventListener('resize', function(){
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
});

var mousePressed = false;
var src;

currentMouse = {
  x: undefined,
  y: undefined
}

prevMouse = {
  x: undefined,
  y: undefined
}

var pointerRadius = 5;
var pointerColor = "black";

window.addEventListener('mousedown', function(event){
  if(event.y < 50){
    return;
  }else{
    mousePressed = true;
    if(eraserPressed == false){
      draw1();
    }else if(eraserPressed == true){
      draw2();
    }
  }
});

window.addEventListener('mouseup', function(){
  mousePressed = false;
  prevMouse.x = undefined;
  prevMouse.y = undefined;
});

function draw1(){
  ctx.beginPath();
  ctx.arc(currentMouse.x,currentMouse.y,pointerRadius,0,Math.PI*2);
  ctx.fillStyle = pointerColor;
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(prevMouse.x,prevMouse.y);
  ctx.lineTo(currentMouse.x,currentMouse.y);
  ctx.lineWidth = pointerRadius*2;
  ctx.strokeStyle = pointerColor;
  ctx.stroke();

  prevMouse.x = currentMouse.x;
  prevMouse.y = currentMouse.y;
}

function draw2(){
  ctx.beginPath();
  ctx.fillStyle = 'white';
  ctx.strokeStyle = 'white';
  ctx.clearRect(currentMouse.x - pointerRadius,currentMouse.y - pointerRadius,2*pointerRadius,2*pointerRadius);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(prevMouse.x,prevMouse.y);
  ctx.lineTo(currentMouse.x,currentMouse.y);
  ctx.lineWidth = pointerRadius*2;
  ctx.stroke();

  prevMouse.x = currentMouse.x;
  prevMouse.y = currentMouse.y;

}

window.addEventListener('mousemove', function(event){
  currentMouse.x = event.x;
  currentMouse.y = event.y;
  if(mousePressed == true){
    if(eraserPressed == false){
      draw1();
    }else if(eraserPressed == true){
      draw2();
    }
  }
});

// function handling

function radiusChanger(value){
  pointerRadius = value;
  document.getElementById('radiusDisplay').value = pointerRadius;
}

function color1(){
  pointerColor = "green";
}
function color2(){
  pointerColor = "red";
}
function color3(){
  pointerColor = "blue";
}
function color4(){
  pointerColor = "yellow";
}
function color5(){
  pointerColor = "cyan";
}
function color6(){
  pointerColor = "magenta";
}
function color7(){
  pointerColor = "black";
}

// mousePointer

var mousePointer = document.getElementsByClassName('mousePointer')[0];

function animate(){
  requestAnimationFrame(animate);
  mousePointer.style.top = (currentMouse.y - pointerRadius) + 'px';
  mousePointer.style.left = (currentMouse.x - pointerRadius) + 'px';
  mousePointer.style.height = (2*pointerRadius) + 'px';
  mousePointer.style.width = (2*pointerRadius) + 'px';
  if(eraserPressed == false){
    mousePointer.style.borderRadius = pointerRadius + 'px';
    mousePointer.style.background = pointerColor;
    mousePointer.style.border = 'none';
  }
  else if(eraserPressed == true){
    mousePointer.style.borderRadius = '0px';
    mousePointer.style.background = 'white';
    mousePointer.style.border = '1px black solid';
  }
  src = canvas.toDataURL("image/jpeg");
}
animate();



// make save button


function download(){
  var download = document.getElementById("download");
  var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  download.setAttribute("href", image);
}



// mouse and eraser interactions

var pencilBox = document.getElementById('pencil');
var eraserBox = document.getElementById('eraser');
var eraserPressed = false;


function pencil(){
  pencilBox.style.border = '1px solid yellow';
  eraserBox.style.border = 'none';
  eraserPressed = false;
}
function eraser(){
  pencilBox.style.border = 'none';
  eraserBox.style.border = '1px solid yellow';
  eraserPressed = true;
}
