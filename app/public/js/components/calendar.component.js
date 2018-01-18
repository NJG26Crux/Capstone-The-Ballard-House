(function() {
  'use strict';

  angular.module('app').component('calendar', {
    controller,
    templateUrl: '/js/components/calendar.template.html'
  })

  controller.$inject = ['$http', '$mdDialog', '$stateParams', 'auth']  //, 'editTextServ'

  function controller($http, $mdDialog, $stateParams, auth) { // , editTextServ
    const vm = this;

    vm.BookingForm = function(ev) {
      $mdDialog.show({
        controller: 'booking as $ctrl',
        templateUrl: 'js/components/requestBooking.template.html',
        parent: angular.element(document.body),
        // targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: this.customFullscreen
      });
    };
  }

  angular.module('app').controller('booking', ['$mdDialog', '$http', 'auth', '$scope', '$state', function($mdDialog, $http, auth, $scope, $state) {
    const vm = this;

    vm.closeBooking = function() {
      console.log('close')
      $mdDialog.cancel();
    };

    vm.requestBooking = function() {
      let postMsg = {};
      console.log('auth: ', auth);
      // console.log('vm.form: ', vm.form);
      console.log('requestMsg: ', vm.requestMsg);
      postMsg.text = vm.requestMsg;
      // postMsg.email = auth.user.email;
      postMsg.read = false;
      postMsg.urgent = false;
      console.log('postMsg: ', postMsg);
      $http.post('/message', postMsg).then(data => {
        console.log(data);
      })
    }

  }])

}());
// angular.module('datepickerBasicUsage', ['ngMaterial', 'ngMessages']).controller('AppCtrl', function() {
//   this.myDate = new Date();
//   this.isOpen = false;
// });
