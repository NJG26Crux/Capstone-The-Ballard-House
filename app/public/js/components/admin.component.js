(function() {
  'use strict';

  angular.module('app').component('admin', {
    controller,
    templateUrl: '/js/components/admin.template.html'
  })

  controller.$inject = ['$http', '$mdDialog', '$stateParams']

  function controller($http, $mdDialog, $stateParams,) {
    const vm = this;

    vm.$onInit = function() {

      $http.get('/users/')
        .then(users => {
          console.log('users: ', users);
          vm.users = users.data;
        })

      $http.get('/dates/')
        .then(dates => {
          console.log('dates: ', dates);
          vm.dates = dates.data;
        })

      $http.get('/messages/')
        .then(messages => {
          console.log('messages: ', messages);
          vm.messages = messages.data;
        })

      $http.get('/texts/')
        .then(texts => {
          console.log('texts: ', texts);
          vm.texts = texts.data;
        })

      $http.get('/pictures/')
        .then(pictures => {
          console.log('pictures: ', pictures);
          vm.pictures = pictures.data;
        })

    }
  }
}());
