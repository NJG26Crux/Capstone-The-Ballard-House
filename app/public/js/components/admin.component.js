(function() {
  'use strict';

  angular.module('app').component('admin', {
    controller,
    templateUrl: '/js/components/admin.template.html'
  })

  controller.$inject = ['$http', '$mdDialog', '$stateParams']  //, 'editTextServ'

  function controller($http, $mdDialog, $stateParams) { // , editTextServ
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

      $http.get('/message/')
        .then(message => {
          console.log('message: ', message);
          vm.message = message.data;
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

    vm.lockUser = function(id) {
      console.log('user id; ', id);
      $http.patch('/user/' + id)
        .then(usr => {
          console.log('usr: ', usr);
          vm.users[id-1].locked = usr.data.locked;
        })
    };

    // vm.editDate = function(id) {
    //   // patch dates ??? *****************
    // }

    // vm.deleteDate = function(id) {
    //   // delete dates snd user_dates ******************
    // }

    vm.editMsgForm = function(id) {
      console.log('msg id; ', id);
      $http.patch('/message/' + id)
        .then(msg => {
          console.log('.then msg: ', msg);
          vm.messages[id-1].read = msg.data.read;
        })
      // $mdDialog.show({
      //   controller: 'editMsg as $ctrl',
      //   templateUrl: 'js/components/editMsg.template.html',
      //   parent: angular.element(document.body),
      //   // targetEvent: ev,
      //   clickOutsideToClose: true,
      //   fullscreen: this.customFullscreen,
      //   locals: {msg:vm.message.filter(e => e.id === id)} //
      // })
    };

    vm.editTextForm = function(id) {
      $mdDialog.show({
        controller: 'editText as $ctrl',
        templateUrl: 'js/components/editText.template.html',
        parent: angular.element(document.body),
        // targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: this.customFullscreen,
        locals: {text:vm.texts.filter(e => e.id === id)}
      })
    };

    vm.editPicForm = function(id) {
      console.log('@ editPicForm');
      $mdDialog.show({
        controller: 'editPic as $ctrl',
        templateUrl: 'js/components/editPic.template.html',
        parent: angular.element(document.body),
        // targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: this.customFullscreen,
        locals: {pic:vm.pictures.filter(e => e.id === id)}
      })
    };

  }

  angular.module('app').controller('editText', ['$mdDialog', '$http', '$scope', 'text', function($mdDialog, $http, $scope, text) { //'auth', '$scope', '$state', - , auth, $scope, $state -  'editTextServ', - , editTextServ
    const vm = this;
    console.log(text);

    vm.closeEdit = function() {
      console.log('close')
      $mdDialog.cancel();
    };

    vm.text = text[0].text;
    vm.textId = text[0].id;
    vm.submitEditText = function(id){
      text[0].text = vm.text;
      console.log('@ submitEditText');
      console.log('text[0]: ', text[0]);
      $http.patch('/text/' + id, text[0])
        .then(text => {
          console.log('.then text: ', text)
          $mdDialog.hide();
          delete vm.form;
        })
    }

  }])

  angular.module('app').controller('editPic', ['$mdDialog', '$http', '$scope', 'pic', function($mdDialog, $http, $scope, pic) { //'auth', '$scope', '$state', - , auth, $scope, $state -  'editTextServ', - , editTextServ
    const vm = this;
    console.log('pic: ', pic);

    vm.closeEdit = function() {
      console.log('close')
      $mdDialog.cancel();
    };

    vm.picUrl = pic[0].url;
    console.log('vm: ', vm);
    vm.picId = pic[0].id;
    vm.submitEditPic = function(id, picUrl){
      console.log('picUrl: ', picUrl);
      pic[0].url = vm.picUrl;
      console.log('vm: ', vm);
      console.log('@ submitEditPic');
      console.log('pic[0]: ', pic[0]);
      $http.patch('/pictures/' + id, pic[0])
        .then(pic => {
          console.log('.then pic: ', pic)
          $mdDialog.hide();
          delete vm.form;
        })
    }

  }])

}());
