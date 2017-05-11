// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'routes', 'ionic-material', 'ngCordova', 'ionMdInput', 'firebase', 'angular.filter', 'angularGeoFire', 'ngMap', 'angular.viacep', 'ionic-datepicker', 'ionic-timepicker', 'ngStorage'])
.run(function($ionicPlatform, $rootScope, NgMap) {

  $ionicPlatform.ready(function() {
      NgMap.getMap().then(function(map) {
          $rootScope.map = map;
        });
    //facebookConnectPlugin.browserInit("1677347842587839")
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

}).app.filter('encodeURIComponent', function() {
    return window.encodeURIComponent;
});;