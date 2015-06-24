angular.module('productividadUsaria').controller('projectsCtrl', projectsCtrl);

projectsCtrl.$inject = ['$scope', '$http', '$state', '$stateParams', 'ngDialog'];

function projectsCtrl ($scope, $http, $state, $stateParams, ngDialog){

  $scope.Math = window.Math;

  /* ============================================
      objects
  =============================================== */

  $scope.project = {};

  /* ============================================
      arrays
  =============================================== */

  $scope.projects = [];

  /* ============================================
      true/false conditions
  =============================================== */

  $scope.selectBeginDate = false;
  $scope.selectEndDate = false;

  /* ============================================
      $scope functions
  =============================================== */

  $scope.saveProject = function(){
    $http({
      url: './scripts/adders/add-project.php',
      method: 'GET',
      params: {
        projectName: $scope.project.name,
        projectType: $scope.project.type,
        projectDescription: $scope.project.description,
        projectBeginDate: $scope.project.beginDate,
        projectEndDate: $scope.project.endDate,
      }
    })
    .then(function(response){
      ngDialog.close({
        template: 'templates/add-project-template.html',
      });
      $scope.getProjects();
      $scope.project = {};
    });
  };

  $scope.getUsersOfAProject = function(index, id){
    $http({
      url: './scripts/getters/get-user-by-project-id.php',
      method: 'GET',
      params: {
        id_project: id,
      },
    })
    .then(function(response){
      $scope.projects[index].employees = response.data;
    });
  };

  $scope.getProjects = function(){
    $http({
      url: './scripts/getters/get-projects.php',
    })
    .then(function(response){
      $scope.projects = response.data;
      angular.forEach($scope.projects, function(object, key) {
        $scope.getUsersOfAProject(key, object.id_project);
        object.sum_hrs_planned = Number(object.total_hrs_planned) + Number(object.total_minutes_planned/60);
        object.sum_hrs_reported = Number(object.total_hrs_reported) + Number(object.total_minutes_reported/60) + Number(object.total_extra_hrs) + Number(object.total_extra_minutes/60);
      });
    });
  };

  $scope.addActivities = function(index){
    $state.go('dashboard.activities',{email:$stateParams.email, projectId: $scope.projects[index].id_project});
  };

  /* ============================================
      DOM functions
  =============================================== */

  $scope.open_addProjectTemplate = function(){
    ngDialog.open({
      template: 'templates/add-project-template.html',
      closeByDocument: true,
      closeByEscape: true,
      scope: $scope
    });
  };

  $scope.switchDatePicker = function(objName, limitName){
    switch(objName){
      case 'project':
        if( limitName === 'begin'){
          $scope.project_beginDate = !$scope.project_beginDate;
        }
        else if( limitName === 'end' ){
          $scope.project_endDate = !$scope.project_endDate;
        }
        break;
    }
  };

  $scope.formatDate = function(date){
    function pad(n) {
        return n < 10 ? '0' + n : n;
    }
    return date && date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
  };

  $scope.parseDate = function(s){
      var tokens = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
      return tokens && new Date(tokens[1], tokens[2] - 1, tokens[3]);
  };

  /* ============================================
      Calls on start
  =============================================== */

  $scope.getProjects();

};
