$(document).ready(function() {

    // config
    app.debug = false;
    app.contextId = '#canvas';
    app.pointColor = 'rgba(150, 255, 150, 0.3)';
    app.pointSize = 3; // the pixel size of the points
    app.amplification = 1; // the amount to amplify the distance


    // initialise the reset button
    $('#reset').click(function(){
        app.context.clearRect(0, 0, canvas.width, canvas.height);
        app.init();
    });

    $(app.contextId).click(function(e){
        app.addPoint(e.pageX, e.pageY);
    });



    app.init();
});


var app = {};

app.init = function() {

    // initialise canvas
    this.log("initialised");
    this.canvasElement = document.getElementById("canvas");
    this.context = this.canvasElement.getContext("2d");


    // get canvas center
    var datum = {};
    datum.x = $(app.contextId).width() / 2;
    datum.y = $(app.contextId).height() / 2;

    // add grid
    app.renderGrid();
};

/**
 * renders the radial grid
 */
app.renderGrid = function() {

    x = $(app.contextId).width() / 2;
    y = $(app.contextId).height() / 2;

    for(var i=20; i > 0; i--) {
        gridSize = ((i * 50) * app.amplification);

        this.context.beginPath();
        this.context.arc(x, y, gridSize, 0, 2 * Math.PI, false);
        this.context.fillStyle = 'black';
        this.context.fill();
        this.context.lineWidth = 1;
        this.context.strokeStyle = '#003300';
        this.context.stroke();
    }



}



// ====== UTILITIES =======



app.plotGraphPoint = function(angle, distance)
{
    while(angle > 360) {
        angle = angle - 360;
    }

    // add point for this value
    this.addPoint(angle, distance, '#0000ff');
};


/*
 * plot a point from the center of the center of the canvas
 * at distance given
 */
app.plotPoint = function(angle, distance){

    // amplify distance
    distance = distance * app.amplification;;

    // get canvas center
    var datum = {};
    datum.x = $(app.contextId).width() / 2;
    datum.y = $(app.contextId).height() / 2;

    // get relative cords from datum
    // opp = sine * hyp
    y = Math.round(Math.sin(toRadians(angle)) * distance);
    x = Math.round(Math.cos(toRadians(angle)) * distance);

    // plot the point
    app.addPoint(datum.x + x, datum.y + y);

    this.log('angle: '+ angle +', distance: '+ distance +', plot: '+ x +', '+ y);

    // add point to graph
    app.plotGraphPoint(angle, distance);

};


// draw a single point on the canvas
app.addPoint = function(x, y, color)
{

    if(typeof(color) != 'undefined') {
        this.context.fillStyle = color;
    }else {
        this.context.fillStyle = this.pointColor;
    }

    this.log(x+', '+y);


    //this.context.fillRect(x,y,20,20);

    this.context.beginPath();
    this.context.arc(x, y, app.pointSize, 0, 2 * Math.PI, false);
    this.context.fill();
};


// enable logging
app.log = function(str){
    if(this.debug) {
        console.log(str);
    }
};


function toDegrees (angle) {
    return angle * (180 / Math.PI);
}


function toRadians (angle) {
    return angle * (Math.PI / 180);
}
