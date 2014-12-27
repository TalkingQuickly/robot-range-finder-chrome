robot.turn = {};

robot.turn.isTurning = false;

robot.turn.callback = function(data) {
  if (robot.turn.isTurning === true) {
    app.log(data);
    $("#distance").html(data);
    var t = Date.now() - robot.turn.started;
    var rCount = t/$("#one_turn").val();
    $("#angle").html(360* (rCount % 1));

    // plot point
    angle = 360* (rCount % 1);
    app.plotPoint(angle, data);
  }
};

robot.turn.startTurn = function() {
  app.log("starting turn");
  robot.turn.started = Date.now();
  robot.sendData("a");
  robot.turn.isTurning = true;
  robot.dataCallbacks.push(robot.turn.callback);
};

robot.turn.stopTurn = function() {
  app.log("stopping turn");
  robot.sendData("z");
  robot.turn.isTurning = false;
};
