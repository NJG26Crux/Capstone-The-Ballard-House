(function() {
  'use strict';

  angular.module('app').component('detailsTest', {
    controller,
    templateUrl: '/js/components/details.template.html'
  })

  controller.$inject = ['$http', '$mdDialog', '$stateParams']

  function controller($http, $mdDialog, $stateParams, ) {
    const vm = this;

    vm.$onInit = function() {

      // $http.get('/text/location/1')
      //   .then(text1 => {
      //     console.log('text1: ', text1);
      //     vm.text1 = text1.data[0];
      //   })

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

      $http.get('/text/location/4')
        .then(text4 => {
          console.log('text4: ', text4);
          vm.text4 = text4.data[0];
        })

      $http.get('/pictures/location/1')
        .then(pic1 => {
          console.log('pic1: ', pic1);
          vm.pic1 = pic1.data[0];
        })

      $http.get('/pictures/location/2')
        .then(pic2 => {
          console.log('pic2: ', pic2);
          vm.pic2 = pic2.data[0];
        })

      $http.get('/pictures/location/3')
        .then(pic3 => {
          console.log('pic3: ', pic3);
          vm.pic3 = pic3.data[0];
        })

      $http.get('/pictures/location/4')
        .then(pic4 => {
          console.log('pic4: ', pic4);
          vm.pic4 = pic4.data[0];
        })

      $http.get('/pictures/location/5')
        .then(pic5 => {
          console.log('pic5: ', pic5);
          vm.pic5 = pic5.data[0];
        })

      $http.get('/pictures/location/6')
        .then(pic6 => {
          console.log('pic6: ', pic6);
          vm.pic6 = pic6.data[0];
        })

      $http.get('/pictures/location/7')
        .then(pic7 => {
          console.log('pic7 (map): ', pic7);
          vm.pic7 = pic7.data[0];
        })

    }
  }
}());
