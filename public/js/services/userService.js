angular.module('contactsApp').service('userService', function($http) {
  this.getUser = function(query) {
    return $http({
      method: 'GET',
      url: 'api/users',
    }).then(function(res) {
      return res.data;
    });
  };

  this.getUser_id = function(id) {
    return $http({
      method: 'GET',
      url: 'api/users/' + id,
    }).then(function(res) {
      return res.data;
    });
  };

  this.addUser = function(newUser) {
    return $http({
      method: 'POST',
      url: 'api/users',
      data: newUser
    });
  };

  this.updateUser = function(id, editField) {
    return $http({
      method: 'PATCH',
      url: 'api/users/' + id,
      data: editField
    });
  };

  this.removeUser = function(id) {
    return $http({
      method: 'DELETE',
      url: 'api/users/' + id
    });
  };

});
