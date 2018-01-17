angular.module('app', ['ui.router','ngMaterial', 'md.data.table'])  // , 'material.svgAssetsCache' // , require('angular-material-data-table') //move this to new file called app.module.js and ref it first
.config(config)
// angular.module('myApp', ['ngMaterial', 'md.data.table']);

function config($stateProvider, $urlRouterProvider, $locationProvider){

    $locationProvider.html5Mode(true)

    $stateProvider
      .state({
        component: 'loginMenu',
        name: 'loginMenu',
        abstract: true,
      })
      .state({
        name: 'home',
        url: '/',
        component: 'home',
        parent: 'loginMenu'
      })
      .state({
        component: 'logoutMenu',
        name: 'logoutMenu',
        abstract: true,
      })
      .state({
        name: 'detailsTest',
        url: '/details',
        component: 'detailsTest',
        parent: 'logoutMenu'
      })
      .state({
        component: 'logoutMenuCal',
        name: 'logoutMenuCal',
        abstract: true,
      })
      .state({
        name: 'calendar',
        url: '/calendar',
        component: 'calendar',
        parent: 'logoutMenuCal'
      })
      .state({
        component: 'logoutMenuAdmin',
        name: 'logoutMenuAdmin',
        abstract: true,
      })
      .state({
        name: 'admin',
        url: '/admin',
        component: 'admin',
        parent: 'logoutMenuAdmin'
      })

  }
