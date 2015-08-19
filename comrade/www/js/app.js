angular.module('app', ['ionic', 'app.controllers'])


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: 'login.html'
    })

    .state('main', {
      url: '/main',
      controller: 'MainCtrl',
      templateUrl: 'main.html'
    })

    .state('details', {
      url: '/details',
      templateUrl: 'details.html'
    })
    ;

  // if none of the above states are matched, use this as the fallback

  $urlRouterProvider.otherwise('/login');


});
