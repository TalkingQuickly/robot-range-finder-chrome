$(document).ready(function() {

    app.debug = false;
    app.init();
});


var app = {};

app.init = function() {

    // initialise canvas
    this.log("initialised");
    this.canvasElement = document.getElementById("canvas");
    this.canvas = this.canvasElement.getContext("2d");


    // get click events
    $("#canvas").click(function(e){
        app.addPoint(e.pageX, e.pageY);
    });

    // draw profile
    this.drawProfileGraph(this.circleProfile());

};


// ======== PROFILES ==========

app.circleProfile = function(){
    profile = Array();

    // regular circle
    for(var i=0; i< 360; i++) {
       // profile[i] = 400;
    }

    radius = 300;
    offsetY = 10;
    offsetX = 0;

    for(var angle=0; angle< 365; angle++) {

        // calculate how much of the Y offset is relevant
        var relativeOffsetY = offsetY - ( offsetY * Math.sin(toRadians(angle)) );

        profile[angle] = radius - relativeOffsetY;
    }

    return profile;
}



// ====== UTILITIES =======


/*
 * draw a graph from a profile
 * profile is arr of 365 integers
 */

app.drawProfileGraph = function(profile){

    this.log(profile);

    // get highest point
    var highestPoint = 0;
    for(var i=0; i< profile.length; i++) {
        if(highestPoint < profile[i]) {
            highestPoint = profile[i];
        }
    }

    var graphHeight = highestPoint + 10;

    for(var i=0; i< profile.length; i++) {

        var y = graphHeight - profile[i];
        var x = (i+1)*2;

        // add point for this value
        this.addPoint(x, y);

        // add datum
        this.addPoint(x, graphHeight);
    }
};


// draw a single point on the canvas
app.addPoint = function(x, y)
{
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
