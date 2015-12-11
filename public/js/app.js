angular.module('contactsApp', ['ui-router'])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('login', {

  })
  .state('logout', {
    url: '/login'
  })
  .state('admin', {

  })
  .state('manager', {

  })
  .state('sales', {

  })
  .state('register' {

  });

  $urlRouterProvider
    .otherwise('/login');
});
