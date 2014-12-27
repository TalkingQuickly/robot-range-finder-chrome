var robot = {};

robot.connect = function() {
  chrome.serial.connect("/dev/tty.usbserial-A8004xq1", {bitrate: 9600}, function() {console.log("connected to robot!")});
};

robot._dataBuffer = '';

robot.handleData = function(data) {
  if (data.data) {
    var bufView = new Uint8Array(data.data);
    var encodedString = String.fromCharCode.apply(null, bufView);
    var str = decodeURIComponent(escape(encodedString));
    if (str.charAt(str.length-1) === '\n') {
      robot._dataBuffer += str.substring(0, str.length-1);
      robot.processData(robot._dataBuffer);
      robot._dataBuffer = '';
    } else {
      robot._dataBuffer += str;
    }
  }
};

robot.processData = function(data) {
  console.log(data);
};


// actually do stuff
chrome.serial.onReceive.addListener(robot.handleData);
robot.connect();
