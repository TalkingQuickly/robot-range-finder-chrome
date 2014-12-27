var onConnect = function(connectionInfo) {
   // The serial port has been opened. Save its id to use later.
  //_this.connectionId = connectionInfo.connectionId;
  console.log(connectionInfo.connectionId);
  console.log("onConnect");
  // Do whatever you need to do with the opened port.
}

var ab2str = function(buf) {
  var bufView = new Uint8Array(buf);
  var encodedString = String.fromCharCode.apply(null, bufView);
  return decodeURIComponent(escape(encodedString));
};

var stringReceived = '';

var onReceiveCallback = function(info) {
    if (info.data) {
      var str = ab2str(info.data);
      console.log(str);
      if (str.charAt(str.length-1) === '\n') {
        stringReceived += str.substring(0, str.length-1);
        onLineReceived(stringReceived);
        stringReceived = '';
      } else {
        stringReceived += str;
      }
    }
  };

chrome.serial.onReceive.addListener(onReceiveCallback);

// Connect to the serial port /dev/ttyS01
chrome.serial.connect("/dev/tty.usbserial-A8004xq1", {bitrate: 9600}, onConnect);

console.log("connection code run");
