$(document).ready(function() {
  console.log("this works");
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  //var radius = canvas.height / 2;
  //ctx.translate(radius, radius);
  //radius = radius * 0.90
  //drawClock();
  ctx.fillRect(10,10,10,10);

  function drawClock() {
      ctx.arc(0, 0, radius, 0 , 2*Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
  }
});
