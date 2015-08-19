angular.module('app', ['ionic'])


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('page2', {
      url: '/login',
      templateUrl: 'page2.html'
    })

    .state('page3', {
      url: '/main',
      templateUrl: 'page3.html'
    })

    .state('page4', {
      url: '/details',
      templateUrl: 'page4.html'
    })
    ;

  // if none of the above states are matched, use this as the fallback

  $urlRouterProvider.otherwise('/login');


});
