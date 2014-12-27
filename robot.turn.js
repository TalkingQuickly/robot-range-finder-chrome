robot.turn = {};

robot.turn.isTurning = false;

robot.turn.callback = function(data) {
  if (robot.turn.isTurning === true) {
    console.log(data);
    $("#distance").html(data);
    var t = Date.now() - robot.turn.started;
    var rCount = t/$("#one_turn").val();
    $("#angle").html(360* (rCount % 1));
  }
};

robot.turn.startTurn = function() {
  console.log("starting turn");
  robot.turn.started = Date.now();
  robot.sendData("a");
  robot.turn.isTurning = true;
  robot.dataCallbacks.push(robot.turn.callback);
};

robot.turn.stopTurn = function() {
  console.log("stopping turn");
  robot.sendData("z");
  robot.turn.isTurning = false;
};
