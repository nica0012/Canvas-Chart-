//Global Variables
var total = 0;
var values = [];
var labels = [];
var canvas, context;
//Global Variables END

document.addEventListener("DOMContentLoaded", function () {
	canvas = document.querySelector("#myCanvas");
	context = canvas.getContext("2d");

	var script = document.createElement("script");
	script.src = "./json/cheese.json";
	document.querySelector('body').appendChild(script);
	script.addEventListener("load", function () {

		for (var i = 0; i < data[0].segments.length; i++) {
			values.push(data[0].segments[i].value);
			labels.push(data[0].segments[i].label);
			total += values[i];
		}
		addButtonListeners()
		pieChart();
	});
});

function setDefaultStyles(){
  //set default styles for canvas
  context.strokeStyle = "#333";	//colour of the lines
  context.lineWidth = 3;
  context.font = "bold 16pt Arial";
  context.fillStyle = "#900";	//colour of the text
  context.textAlign = "left";
}



//Pie  Chart

function pieChart() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	setDefaultStyles();

	var cx = canvas.width / 2.5;
	var cy = canvas.height / 2;
	var radius = 100;
	var currentAngle = 0;

	for (var i = 0; i < values.length; i++) {
		var pct = values[i] / total;
		var clr = data[0].segments[i].color;
		var endAngle = currentAngle + (pct * (Math.PI * 2));
		//console.log((pct * (Math.PI * 2))); //Find out which object is biggest and smallest
		context.moveTo(cx, cy);
		context.beginPath();
		context.fillStyle = clr;

		if ((pct * (Math.PI * 2)) > 1.5) { //Biggest
			context.arc(cx, cy, radius * 0.9, currentAngle, endAngle, false);
			context.lineTo(cx, cy);
			context.fill();
		} else if ((pct * (Math.PI * 2)) < 0.5) { //Smallest
			context.arc(cx, cy, radius * 1.1, currentAngle, endAngle, false);
			context.lineTo(cx, cy);
			context.fill();
		} else { //Other
			context.arc(cx, cy, radius, currentAngle, endAngle, false);
			context.lineTo(cx, cy);
			context.fill();
		}

		context.save();
		context.translate(cx, cy);
		context.strokeStyle = "#000";
		context.lineWidth = 1;
		context.beginPath();
		var midAngle = (currentAngle + endAngle) / 2;
		context.moveTo(0, 0);
		var dx = Math.cos(midAngle) * (0.8 * radius);
		var dy = Math.sin(midAngle) * (0.8 * radius);
		context.moveTo(dx, dy);
		var dx = Math.cos(midAngle) * (radius + 50);
		var dy = Math.sin(midAngle) * (radius + 50);
		context.lineTo(dx, dy);
		context.font = '10pt Calibri';
		context.fillStyle = '#232f41';
		context.fillText(labels[i], dx, dy);
		context.stroke();
		context.restore();
		currentAngle = endAngle;
	}
}

//Circle Chart

function newChart(){
    
  //clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  //set the styles in case others have been set
  setDefaultStyles();
  var numPoints = values.length;	//number of circles to draw.
  var padding = 5;	//space away from left edge of canvas to start drawing.
  var magnifier = 13.5;	
  var horizontalAxis = canvas.height/2;   //how far apart to make each x value.

  var currentPoint = 0;	//this will become the center of each cirlce.
  var x = 0;
  var y = horizontalAxis;//center y point for circle
  var colour = "rgba(0, 255, 0, 0)";
    
  for (var i = 0; i < values.length; i++) {
    var pct = Math.round((values[i] / total) * 100);
    var clr = data[0].segments[i].color;
      
  
    var a = (0xD0 + Math.round(Math.random() * 0x2F));
    var b = (0xD0 + Math.round(Math.random() * 0x2F));
     area = Math.PI * radius * radius
     radius = Math.sqrt( area / Math.PI );
    var radius = Math.sqrt(pct / Math.PI ) * magnifier; 
    // makes all circles bigger
    x = currentPoint + padding + radius;

    context.beginPath();
    context.fillStyle = clr;	
    //colour inside the circle set AFTER beginPath() BEFORE fill()
    context.strokeStyle = "000000";
    context.lineWidth = 1;
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();	//fill comes before stroke
    context.stroke();
   //   context.save();
    var lbl = pct.toString();

      
    context.font = "normal 9pt Arial";
    context.textAlign = "center";
    context.fillStyle = "rgb(29, 29, 29)";	//colour inside the circle
    context.beginPath();
//      context.translate( 0, 0 );
//      context.rotate( Math.PI / 2 );
      if(i!=4){
    context.fillText(labels[i], x, y+70);
      }else{
           context.fillText(labels[i], x, y-70);
      }
      
    context.closePath();
//      context.restore();
    currentPoint = x + radius;	
    //move the x value to the end of the circle for the next point  
  }
}













function addButtonListeners() {
	document.querySelector("#btnPie").addEventListener("click", pieChart);
	document.querySelector("#btnNew").addEventListener("click", newChart);
}

    
