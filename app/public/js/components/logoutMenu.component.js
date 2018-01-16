(function() {
  'use strict';

  angular.module('app').component('logoutMenu', {
    controller,
    templateUrl: 'js/components/logoutMenu.template.html'
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

  // angular.module('app').controller('login', ['$mdDialog', '$http', 'auth', '$scope', function($mdDialog, $http, auth, $scope) {
  //   const vm = this;
  //   $scope.form = {};
  //
  //   vm.footer = true; //***************** NEW
  //   console.log('vm.footer: ',vm.footer); //***************** NEW
  //   vm.logIn = true;
  //   vm.loggedin = false; // for nav bar
  //
  //   vm.close = function() {
  //     console.log('close')
  //     $mdDialog.cancel();
  //   };
  //
  //   vm.login = function() {
  //     $http.post('/token', vm.form).then(data => {
  //       console.log('@ login data: ', data);
  //         $http.get('/users/firstName')
  //           .then((user) => {
  //             console.log('@ component.root login get/firstname user: ', user.data[0]);
  //             if (user.data[0]) {
  //               user.data[0].hello_first_name = ('Hello ' + user.data[0].first_name);
  //               auth.user = user.data[0] /// vm.
  //             }
  //           })
  //         $mdDialog.hide();
  //         delete vm.form;
  //       },
  //       err => {
  //         vm.err = 'Incorect User Name or Password'
  //         return err;
  //       })
  //   };
  //
  //   vm.signup = function() {
  //     console.log('fun.signup: ', vm.form)
  //     $http.post('/users', vm.form).then(user => {
  //         console.log('signup.user.data: ', user.data);
  //         console.log('user.data.firstName: ', user.data.firstName);
  //         user.data.hello_first_name = ('Hello ' + user.data.firstName);
  //         auth.user = user.data /// vm.
  //         $mdDialog.hide();
  //         delete vm.form;
  //       },
  //       err => {
  //         console.log('err: ', err)
  //         vm.err = 'Email already exists'
  //         return err;
  //       })
  //   };
  //
  //   vm.switchToSignup = function(ev) {
  //     console.log('clicked on switch to signupForm fun');
  //     vm.close();
  //     console.log('clicked on signupForm fun');
  //     $mdDialog.show({
  //       controller: 'login as $ctrl',
  //       templateUrl: 'js/components/signup.template.html',
  //       parent: angular.element(document.body),
  //       targetEvent: ev,
  //       clickOutsideToClose: true,
  //       fullscreen: this.customFullscreen
  //     });
  //   };
  //
  //   vm.switchToLogin = function(ev) {
  //     console.log('clicked on switch to loginForm fun');
  //     vm.close();
  //     $mdDialog.show({
  //       controller: 'login as $ctrl',
  //       templateUrl: 'js/components/login.template.html',
  //       parent: angular.element(document.body),
  //       targetEvent: ev,
  //       clickOutsideToClose: true,
  //       fullscreen: this.customFullscreen
  //     });
  //   };
  //
  // }])

}());
