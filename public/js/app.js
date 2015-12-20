angular.module('contactsApp', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: '/templates/login.html',
      controller: 'loginCtrl'
    })
    .state('logout', {
      url: '/login'
    })
    .state('home', {
      url: '/home',
      templateUrl: '/templates/home.html'
    })
      .state('home.overview', {
        url: '/overview',
        templateUrl: '/templates/overview.html',
        controller: 'overviewCtrl',
        resolve: {
          usersRef: function(userService) {
            return userService.getUser();
          }
        }
      })
      .state('home.admin', {
        url: '/admin',
        templateUrl: '/templates/admin.html',
        controller: 'adminCtrl'
      })
      .state('home.user', {
        url: '/users',
        templateUrl: '/templates/user.html',
        controller: 'userCtrl'
      })
      .state('home.contact', {
        url: '/contact',
        templateUrl: '/templates/contact.html',
        controller: 'contactCtrl'
      })
      .state('home.leadstatus', {
        url: '/leadstatus',
        templateUrl: '/templates/leadstatus.html',
        controller: 'leadCtrl'
      });

    $urlRouterProvider
      .otherwise('login');
});
