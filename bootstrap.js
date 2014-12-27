$(document).ready(function() {

    // config
    app.debug = false;
    app.canvasId = '#canvas';
    app.pointColor = '#000000';

    // initialise the reset button
    $('#reset').click(function(){
        app.canvas.clearRect(0, 0, canvas.width, canvas.height);
        app.init();
    });

    $(app.canvasId).click(function(e){
        app.addPoint(e.pageX, e.pageY);
    });



    app.init();
});


var app = {};

app.init = function() {

    // initialise canvas
    this.log("initialised");
    this.canvasElement = document.getElementById("canvas");
    this.canvas = this.canvasElement.getContext("2d");


    // get canvas center
    var datum = {};
    datum.x = $(app.canvasId).width() / 2;
    datum.y = $(app.canvasId).height() / 2;

    // add datum
    this.addPoint(datum.x, datum.y, '#0000ff');


    // draw profile
    //this.drawProfileGraph(this.circleProfile());

    // draw the actual profile
    //this.drawProfile(this.circleProfile());

};





// ======== PROFILES ==========

app.circleProfile = function(){
    var profile = Array();

    var radius = 300;
    var offsetY = 100;// how far (y) from the center of the circle is the origin?

    for(var angle=0; angle< 365; angle++) {

        // calculate how much of the Y offset is relevant
        var relativeOffsetY = offsetY - ( offsetY * Math.sin(toRadians(angle)) );

        profile[angle] = radius - relativeOffsetY;
    }

    return profile;
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

    distance = distance * 1;

    // get canvas center
    var datum = {};
    datum.x = $(app.canvasId).width() / 2;
    datum.y = $(app.canvasId).height() / 2;

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
        this.canvas.fillStyle = color;
    }else {
        this.canvas.fillStyle = this.pointColor;
    }

    this.log(x+', '+y);


    this.canvas.fillRect(x,y,2,2);
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
