angular.module('productividadUsaria').controller('dashboardCtrl', dashboardCtrl);

dashboardCtrl.$inject = ['$scope', '$http', '$state', 'ngDialog'];

function dashboardCtrl ($scope, $http, $state, ngDialog){

  /* ============================================
      objects
  =============================================== */

  $scope.password = {};
  $scope.currentState = {
    'background-color': '#333',
  };

  /* ============================================
      true/false conditions
  =============================================== */

  $scope.privilegeE = true;
  $scope.privilegePM = false;
  $scope.privilegeADMIN = false;
  $scope.projectsSelected = false;
  $scope.recordsSelected = false;
  $scope.passwordMissed = false;
  $scope.progressSelected = false;
  $scope.reportSelected =  false;

  /* ============================================
     $scope functions
  =============================================== */

  $scope.logout = function(){
    $http.get('./scripts/logout.php').success(function(response){
        if(response.logged ===  false){
          $state.go('login');
        }
    });
  };

  $scope.changePassword = function(){
    if($scope.password.new !== undefined || $scope.password.new !== ' '){
      $scope.passwordMissed = false;
      $http({
        url: './scripts/updaters/update-password.php',
        method: 'GET',
        params: {
          new_password: $scope.password.new,
        }
      })
      .then( function( response ) {
        console.log(response);
        ngDialog.close({
          template: 'templates/changePassword-template.html'
        });
        $scope.password = {};
      });
    }
    else{
      $scope.passwordMissed = true;
    }
  };

  $scope.checkAuth = function(){
    $http.get('./scripts/auth.php').success(function(response){
      $scope.privilege = response.privilege;
      $scope.email = response.user;
      $scope.photo = response.photo;
      if(response.logged ===  false){
        $state.go('login');
      }
      else{
        if(response.privilege === 'Administrador de Proyecto'){
          $scope.privilegeE = false;
          $scope.privilegePM = true;
          $scope.privilegeADMIN = false;
        }
        else if (response.privilege === 'Administrador de Sistema'){
          $scope.privilegeE = false;
          $scope.privilegePM = false;
          $scope.privilegeADMIN = true;
        }
      }
    });
  };

  /* ============================================
     DOM functions
  =============================================== */

  $scope.updateOnRefresh = function(){
    switch($state.$current.name){
      case 'dashboard.projects':
        $scope.projectsSelected = true;
        $scope.recordsSelected = false;
        $scope.unlockSelected = false;
        $scope.progressSelected = false;
        $scope.reportSelected =  false;
        break;
      case 'dashboard.records':
        $scope.projectsSelected = false;
        $scope.recordsSelected = true;
        $scope.unlockSelected = false;
        $scope.progressSelected = false;
        $scope.reportSelected =  false;
        break;
      case 'dashboard.activities':
        $scope.projectsSelected = false;
        $scope.recordsSelected = false;
        $scope.unlockSelected = false;
        $scope.progressSelected = false;
        $scope.reportSelected =  false;
        break;
      case 'dashboard.unlock':
        $scope.projectsSelected = false;
        $scope.recordsSelected = false;
        $scope.unlockSelected = true;
        $scope.progressSelected = false;
        $scope.reportSelected =  false;
        break;
      case 'dashboard.employee':
        $scope.projectsSelected = true;
        $scope.recordsSelected = false;
        $scope.unlockSelected = false;
        $scope.progressSelected = false;
        $scope.reportSelected =  false;
        break;
      case 'dashboard.users':
        $scope.projectsSelected = true;
        $scope.recordsSelected = false;
        $scope.unlockSelected = false;
        $scope.progressSelected = false;
        $scope.reportSelected =  false;
        break;
      case 'dashboard.progress':
        $scope.projectsSelected = false;
        $scope.recordsSelected = false;
        $scope.unlockSelected = false;
        $scope.progressSelected = true;
        $scope.reportSelected =  false;
        break;
      case 'dashboard.report':
        $scope.projectsSelected = false;
        $scope.recordsSelected = false;
        $scope.unlockSelected = false;
        $scope.progressSelected = false;
        $scope.reportSelected =  true;
        break;
    }
  };

  $scope.updateMenu = function(state){
    switch(state){
      case 'projects':
        $scope.projectsSelected = true;
        $scope.recordsSelected = false;
        $scope.unlockSelected = false;
        $scope.progressSelected = false;
        $scope.reportSelected =  false;
        break;
      case 'records':
        $scope.projectsSelected = false;
        $scope.recordsSelected = true;
        $scope.unlockSelected = false;
        $scope.progressSelected = false;
        $scope.reportSelected =  false;
        break;
      case 'activities':
        $scope.projectsSelected = false;
        $scope.recordsSelected = false;
        $scope.unlockSelected = false;
        $scope.progressSelected = false;
        $scope.reportSelected =  false;
        break;
      case 'unlock':
        $scope.projectsSelected = false;
        $scope.recordsSelected = false;
        $scope.unlockSelected = true;
        $scope.progressSelected = false;
        $scope.reportSelected =  false;
        break;
      case 'progress':
        $scope.projectsSelected = false;
        $scope.recordsSelected = false;
        $scope.unlockSelected = false;
        $scope.progressSelected = true;
        $scope.reportSelected =  false;
        break;
      case 'users':
        $scope.projectsSelected = true;
        $scope.recordsSelected = false;
        $scope.unlockSelected = false;
        $scope.progressSelected = false;
        $scope.reportSelected =  false;
        break;
      case 'report':
        $scope.projectsSelected = false;
        $scope.recordsSelected = false;
        $scope.unlockSelected = false;
        $scope.progressSelected = false;
        $scope.reportSelected =  true;
        break;
    }
  };

  $scope.openPasswordTemplate = function(){
    ngDialog.open({
      template: 'templates/changePassword-template.html',
      closeByEscape: true,
      closeByDocument: true,
      scope: $scope
    });
  };

  /* ============================================
     calls on start
  =============================================== */

  $scope.checkAuth();
  $scope.updateOnRefresh();
};
