require.config({
  shim: {
  },
  waitSeconds : 5,
  paths: {
    hm: 'vendor/hm',
    esprima: 'vendor/esprima',
    jquery: 'vendor/jquery.min',
    goog: 'vendor/gapi',
  }
});
 
require(['app'], function(app) {
  
  var clientId = '209530071831.apps.googleusercontent.com';
  var apiKey = 'AIzaSyAkjYItOVeHw_tufB9NooNdtOBo_KObPZQ';

  var auth = app.Auth(clientId, apiKey);
  auth.authorize();
  console.log("Hola como andas?");
});