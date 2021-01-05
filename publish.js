let awsiot = require("aws-iot-device-sdk");
const con = require("./const.js");
const topic = con.topic;
var count = 0;

let device = awsiot.device({
  region: 'ap-northeast-1',
  host: con.endpoint,
  privateKey: '../certs/private.pem.key',
  clientCert: '../certs/device.pem.crt',
  caCert: '../certs/Amazon-root-CA-1.pem',
});


device.on('connect', function() {
  setInterval( function(){
    count++;
    var led = count % 2;
    if (led === 0){
      con.states.on = false;
      con.states.start = false;
    }else{
      con.states.on = true;
      con.states.start = true;
    }
    console.log('connect');
    console.log(con.states);
    device.publish(topic, JSON.stringify(con.states));
  }, 8000)
});
