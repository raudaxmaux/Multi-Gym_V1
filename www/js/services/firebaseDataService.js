(function() {
  'use strict';

  angular
    .module('starter')
    .factory('firebaseDataService', firebaseDataService);

  function firebaseDataService() {
    var root = firebase.database().ref();

    var service = {
      root: root,
      usuarios: root.child('usuarios'),
      academias: root.child('academias'),
      agendamentos: root.child('agendamentos')
    };
    return service;
  }

 })(); 