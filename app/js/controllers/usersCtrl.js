angular.module('productividadUsaria').controller('usersCtrl', usersCtrl);

usersCtrl.$inject = ['$scope', '$http', '$state', 'ngDialog'];

function usersCtrl ($scope, $http, $state, ngDialog){

  /* ============================================
      objects
  =============================================== */

  $scope.newUser = {
    privilege: 'Empleado',
    hrs_to_complete: '40',
  };
  $scope.selectedUser = {};
  $scope.selected = {};
  $scope.responsables = [
    {id_user: 0, name: 'Elige un nombre', notAnOption: true}
  ];
  $scope.selected.responsable = $scope.responsables[0];

  /* ============================================
      arrays
  =============================================== */

  $scope.users = [];

  /* ============================================
      global variables
  =============================================== */

  /* ============================================
     true/false conditions
  =============================================== */

  $scope.nameIsMissed = false;
  $scope.lastnameIsMissed = false;
  $scope.emailIsMissed = false;

  /* ============================================
     $scope functions
  =============================================== */

  $scope.getUsers = function(){
    $http({
      url: './scripts/getters/get-users.php',
    })
    .then(function(response){
      $scope.users = response.data;
      angular.forEach(response.data, function(obj,key){
        var surrogate = {id: obj.id_user, name: obj.name};
        $scope.responsables.push(surrogate);
      });
    });
  };

  $scope.open_addUserTemplate = function(){
    ngDialog.open({
      template: 'templates/add-user-template.html',
      scope: $scope,
      closeByDocument: true,
      closeByEscape: true,
    });
  };

  $scope.open_updateUserTemplate = function(index){
    $scope.selectedUser = $scope.users[index];
    $scope.selectedUser.id_boss = $scope.responsables[$scope.selectedUser.id_superior];
    ngDialog.open({
      template: 'templates/updateUser-template.html',
      scope: $scope,
      closeByDocument: true,
      closeByEscape: true,
    });
  };

  $scope.saveUser = function(){
    $scope.newUser.name === undefined ? $scope.nameIsMissed = true :$scope.nameIsMissed = false;
    $scope.newUser.lastname === undefined ? $scope.lastnameIsMissed = true :$scope.lastnameIsMissed = false;
    $scope.newUser.email === undefined ? $scope.emailIsMissed = true :$scope.emailIsMissed = false;
    if($scope.nameIsMissed === false && $scope.lastnameIsMissed === false && $scope.emailIsMissed === false){
      if($scope.newUser.photo === undefined){
        $scope.newUser.photo = 'http://www.usaria.mx/sites/all/themes/usaria/logo.png';
      }
      $scope.newUser.superior = {};
      $scope.newUser.superior = $scope.selected.responsable;
      $http({
        url: './scripts/adders/add-user.php',
        method: 'GET',
        params: {
          email: $scope.newUser.email,
          name: $scope.newUser.name,
          lastname: $scope.newUser.lastname,
          photo: $scope.newUser.photo,
          hrs_to_complete: $scope.newUser.hrs_to_complete,
          id_superior: $scope.newUser.superior.id,
          privilege: $scope.newUser.privilege,
        }
      })
      .then(function(response){
        $scope.getUsers();
        $scope.newUser = {};
        $scope.newUser = {
          privilege: 'Empleado',
        };
        ngDialog.close({
          template: 'templates/add-user-template.html'
        });
      });
    }
  };

  $scope.updateUser = function(){
    $scope.selectedUser.name === undefined ? $scope.nameIsMissed = true :$scope.nameIsMissed = false;
    $scope.selectedUser.lastname === undefined ? $scope.lastnameIsMissed = true :$scope.lastnameIsMissed = false;
    $scope.selectedUser.email === undefined ? $scope.emailIsMissed = true :$scope.emailIsMissed = false;
    if($scope.nameIsMissed === false && $scope.lastnameIsMissed === false && $scope.emailIsMissed === false){
      if($scope.selectedUser.photo === undefined){
        $scope.selectedUser.photo = 'http://www.usaria.mx/sites/all/themes/usaria/logo.png';
      }
      $http({
        url: './scripts/updaters/update-user.php',
        method: 'GET',
        params: {
          email: $scope.selectedUser.email,
          id: $scope.selectedUser.id_user,
          hrs_to_complete: $scope.selectedUser.hrs_to_complete,
          name: $scope.selectedUser.name,
          lastname: $scope.selectedUser.lastname,
          photo: $scope.selectedUser.photo,
          privilege: $scope.selectedUser.privilege,
          id_superior: $scope.selectedUser.id_boss.id,
        },
      })
      .then(function(response){
        $scope.getUsers();
        $scope.selectedUser = {};
        ngDialog.close({
          template: 'templates/add-user-template.html'
        });
      });
    }
  };

  $scope.resetPassword = function(){
    $http({
      url: './scripts/updaters/reset-password.php',
      method: 'GET',
      params: {
        id_user: $scope.selectedUser.id_user,
      }
    })
    .then(function(response){
        ngDialog.close({
          template: 'templates/updateUser-template.html'
        });
        $scope.getUsers();
    });
  };

  $scope.deleteUser = function(index){
    $http({
      url: './scripts/deleters/delete-user.php',
      method: 'GET',
      params: {
        id_user: $scope.users[index].id_user,
      }
    })
    .then(function(response){
      $scope.getUsers();
    });
  };

  /* ============================================
     calls on start
  =============================================== */
  $scope.getUsers();

};
