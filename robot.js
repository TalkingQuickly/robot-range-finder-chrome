var robot = {};

robot.onConnected = function(connectionInfo) {
  console.log("connected to robot");
  robot.serialID = connectionInfo.connectionId;
};

robot.connect = function() {
  chrome.serial.connect("/dev/tty.usbserial-A8004xq1", {bitrate: 9600}, robot.onConnected);
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

robot.dataCallbacks = [];

robot.processData = function(data) {
  robot.dataCallbacks.forEach(function(cb) {
    cb(data);
  })
};

robot.sendData = function(str) {
  var buf=new ArrayBuffer(str.length);
  var bufView=new Uint8Array(buf);
  for (var i=0; i<str.length; i++) {
    bufView[i]=str.charCodeAt(i);
  }
  chrome.serial.send(robot.serialID, buf, function() {console.log("sent");})
};

// actually do stuff
chrome.serial.onReceive.addListener(robot.handleData);
robot.connect();
