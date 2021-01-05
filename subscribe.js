let awsiot = require("aws-iot-device-sdk");
const topic = require("./const.js").topic;
const endpoint = require("./const.js").endpoint;

let device = awsiot.device({
  region: 'ap-northeast-1',
  host: endpoint,
  privateKey: '../certs/private.pem.key',
  clientCert: '../certs/device.pem.crt',
  caCert: '../certs/Amazon-root-CA-1.pem',
});

device.on('connect', function() {
  console.log('connect');
  device.subscribe(topic);
});

device.on('message', function(topic, payload) {
  console.log('message');
  console.log(payload.toString());
});
