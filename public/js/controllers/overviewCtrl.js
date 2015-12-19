angular.module('contactsApp').controller('overviewCtrl', function($scope, userService, usersRef) {

  $scope.overview = 'Overview Page';

  $scope.users = usersRef;

});
