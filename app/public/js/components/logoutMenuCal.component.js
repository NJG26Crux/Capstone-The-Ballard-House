(function() {
  'use strict';

  angular.module('app').component('logoutMenuCal', {
    controller,
    templateUrl: 'js/components/logoutMenuCal.template.html'
  })
  controller.$inject = ['$mdDialog', '$http', 'auth', '$state']

  function controller($mdDialog, $http, auth, $state) {
    const vm = this;


    vm.auth = auth;

    vm.$onInit = function() {

      $http.get('/users/firstName')
        .then((user) => {
          console.log('@ component.root get/firstname user: ', user.data[0]);
          if (user.data[0]) {
            user.data[0].hello_first_name = ('Hello ' + user.data[0].first_name);
            vm.auth.user = user.data[0]
          } else {
            $state.go('home') // ************ does not work ***************
          }
        })
        .catch((err) => {
        });
    }

    vm.logout = function() {
      $http.delete('/token').then(data => {
        vm.auth.user.hello_first_name = '';
        vm.auth.user = '';
        vm.auth.firstName = '';
        vm.auth.err = '';
      });
      $state.go('home') // ************ does not work ***************
    }
  }

}());
