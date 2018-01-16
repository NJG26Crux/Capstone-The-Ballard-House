(function() {
  'use strict';

  angular.module('app').component('home', {
    controller,
    templateUrl: '/js/components/home.template.html'
  })

  controller.$inject = ['$http', '$mdDialog', '$stateParams']

  function controller($http, $mdDialog, $stateParams,){
    const vm = this;

    vm.$onInit = function() {

      $http.get('/text/location/1')
        .then(text1 => {
          console.log('text1: ', text1);
          vm.text1 = text1.data[0];
        })

      $http.get('/text/location/2')
        .then(text2 => {
          console.log('text2: ', text2);
          vm.text2 = text2.data[0];
        })

      $http.get('/text/location/3')
        .then(text3 => {
          console.log('text3: ', text3);
          vm.text3 = text3.data[0];
        })

      // $http.get('/text/location/4')
      //   .then(text4 => {
      //     console.log('text4: ', text4);
      //     vm.text4 = text4.data[0];
      //   })

    }
  }
}());
