angular.module('productividadUsaria').controller('loginCtrl', loginCtrl);

loginCtrl.$inject = ['$scope', '$http', '$state', 'ngDialog'];

function loginCtrl ($scope, $http, $state, ngDialog){
  /* ===================================================
    objects
  ====================================================== */

  $scope.user = {};

  /* ===================================================
    $scope functions
  ====================================================== */

  $scope.login = function() {
    $http({
      url: './scripts/login.php',
      method: 'GET',
      params: {
        name: $scope.user.name,
        password: $scope.user.password
      }
    })
    .success( function( response ) {
      if( response.logged === true ) {
        switch( response.privilege ) {
          case 'Administrador de Proyecto':
            $state.go('dashboard.projects');
            break;
          case 'Administrador de Sistema':
            $state.go('dashboard.users');
            break;
          case 'Empleado':
            $state.go('dashboard.records');
            break;
        }
      }
      else{
        ngDialog.open({
          template: 'loginErrorMessage',
          closeByDocument: true,
          closeByEscape: true,
        });
      }
    });
  };

};
