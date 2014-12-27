$(document).ready(function() {

    app.canvasId = '#canvas';
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
    $(app.canvasId).click(function(e){
        app.addPoint(e.pageX, e.pageY);
    });

    // draw profile
    this.drawProfileGraph(this.circleProfile());

    // draw the actual profile
    this.drawProfile(this.circleProfile());

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


/*
 * draws a profile from the center of the canvas
 */
app.drawProfile = function(profile){

    // get canvas center
    var datum = {};
    datum.x = $(app.canvasId).width() / 2;
    datum.y = $(app.canvasId).height() / 2;

    // add datum
    this.addPoint(datum.x, datum.y);


    // loop through profile and render
    for(var i=0; i< profile.length; i++) {
        // add point for this value
        this.plotPoint(i, profile[i]);
    }


};


/*
 * plot a point from the center of the center of the canvas
 * at distance given
 */
app.plotPoint = function(angle, distance){

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

    console.log('angle: '+ angle +', distance: '+ distance +', plot: '+ x +', '+ y);

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
