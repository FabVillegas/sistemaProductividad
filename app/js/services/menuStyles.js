angular.module('productividadUsaria').service('menuStyles', ['$state', function($state){
  this.updateStyles = function(){
    switch($state.$current.name){
        case 'dashboard.overview':
          $scope.overviewSelected = true;
          break;
      }
  };
}]);
