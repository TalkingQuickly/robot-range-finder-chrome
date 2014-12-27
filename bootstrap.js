$(document).ready(function() {

    app.debug = true;
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

    for(var i=0; i< 365; i++) {
        profile[i] = 400;
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


    for(var i=0; i< profile.length; i++) {

        var graphHeight = highestPoint + 10;

        // add point for this value
        this.addPoint(i+1, graphHeight - profile[i]);

        // add datum
        this.addPoint(i+1, graphHeight);
    }
};


// draw a single point on the canvas
app.addPoint = function(x, y)
{
    this.log(x+', '+y);
    this.canvas.fillRect(x,y,2,2);
}


// enable logging
app.log = function(str){
    if(this.debug) {
        console.log(str);
    }
}
