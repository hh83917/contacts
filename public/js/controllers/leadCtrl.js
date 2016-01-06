angular.module('contactsApp').controller('leadCtrl', function($scope) {

  $scope.test = 'Lead Status Page';

  $scope.sortableList = [
      {
          id : "id-000",
          title : "item 000"
      },
      {
          id : "id-001",
          title : "item 001"
      },
      {
          id : "id-002",
          title : "item 002"
      }
  ];

});
