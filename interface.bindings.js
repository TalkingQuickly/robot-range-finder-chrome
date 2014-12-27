$(document).ready(function() {
  $("#start_turn").click(function() {
    robot.turn.startTurn();
  });

  $("#stop_turn").click(function() {
    robot.turn.stopTurn();
  });
});
