angular.module('productividadUsaria').controller('projectActivitiesCtrl', projectActivitiesCtrl);

projectActivitiesCtrl.$inject = ['$scope', '$http', '$state', '$stateParams', 'ngDialog', 'xmlToJson'];

function projectActivitiesCtrl ($scope, $http, $state, $stateParams, ngDialog, xmlToJson){

  /* ============================================
      objects
  =============================================== */

  $scope.project = {};
  $scope.activity = {};
  $scope.editableActivity = {};
  $scope.selected = {};
  $scope.dataSet = {};

  /* ============================================
      arrays
  =============================================== */

  $scope.activities = [];
  $scope.extraActivities = [];
  $scope.responsables = [
    {id_user: 0, name: 'Responsable', notAnOption: true}
  ];
  $scope.selected.responsable = $scope.responsables[0];

  /* ============================================
      true/false conditions
  =============================================== */

  $scope.notNumber = false;
  $scope.emptyName = false;
  $scope.emptyResponsable = false;
  $scope.showPlanned = true;
  $scope.showExtras = false;

  /* ============================================
      $scope functions
  =============================================== */

  $scope.findProjectById = function() {
    $http({
      url: './scripts/getters/get-project-by-id.php',
      method: 'GET',
      params: {
        id_project: $stateParams.projectId,
      }
    })
    .then( function( response ) {
      $scope.project = response.data[0];
    });
  };

  $scope.updateProject = function() {
    $http({
      url: './scripts/updaters/update-project.php',
      method: 'GET',
      params: {
        id_project: $scope.project.id_project,
        project_name: $scope.project.name,
        project_status: $scope.project.status,
        project_begin_date: $scope.project.begin_date,
        project_end_date: $scope.project.end_date
      }
    })
    .success( function( response ) {
      $scope.findProjectById();
    });
  };

  $scope.getUsers = function() {
    $http({
      url: './scripts/getters/get-users.php'
    })
    .then( function( response ) {
      angular.forEach( response.data, function( value, key ) {
        $scope.responsables.push(value);
      });
    });
  };

  $scope.getActivities = function() {
    $http({
      url: './scripts/getters/get-activities-by-project-id.php',
      method: 'GET',
      params: {
        id_project: $stateParams.projectId
      }
    })
    .success( function( response ) {
      $scope.activities = response;
      angular.forEach( $scope.activities, function( obj, key ) {
        obj.responsable = {};
        obj.responsable = { id_user: obj.id_user, name: obj.employee };
        for( var i = 0; i < $scope.responsables.length; i++ ) {
          if( obj.responsable.id_user === $scope.responsables[i].id_user ) {
            obj.responsable = $scope.responsables[i];
            i = $scope.responsables.length;
          }
        }
      });
    });
  };

  $scope.getExtraActivities = function(){
    $http({
      url: './scripts/getters/get-project-extra-activities.php',
      method: 'GET',
      params: {
        id_project: $stateParams.projectId
      }
    })
    .success( function( response ) {
      $scope.extraActivities = response;
    });
  };

  // Callback functions that xmlToJson has as parameter
  setData = function(data) {
      $scope.dataSet = data;
      $scope.addGantt($scope.dataSet);
  };

  $scope.addBunchOfActivities = function() {
    var target = document.getElementById('a_file');
    var files = angular.element(target)[0].files;
    for( var i = 0; i < files.length; i++ ){
      if( files[i].type === "text/xml" ){
        var reader = new FileReader();
        reader.onload = function(e) {
          var xmlText = reader.result;
          xmlToJson.get(setData, xmlText)
        };
        reader.readAsText(files[i]);
      }
      else{
        ngDialog.open({
          template: 'xmlError',
          closeByDocument: true,
          closeByEscape: true,
        });
      }
    }
  };

  $scope.addGantt = function( project ){
    var tasks_array = project.Project.Tasks.Task;
    $scope.addGanttActivity(0,tasks_array);
  };

  $scope.addGanttActivity = function( i, tasks_array ){
    if( i === tasks_array.length ){
      $scope.getActivities();
      return 0;
    }
    else{
      var days = Math.floor( ( new Date(tasks_array[i].ActualFinish) - new Date(tasks_array[i].ActualStart) )/( 8.64e+7 ) );
      var hrs = days*8;
      if( hrs <= 0 )
        hrs = 8;
      $http({
        url: './scripts/adders/add-activity.php',
        method: 'GET',
        params: {
          id_project: $stateParams.projectId,
          name_user: 'Aron',
          begin_date: tasks_array[i].ActualStart,
          end_date: tasks_array[i].ActualFinish,
          name_activity: tasks_array[i].Name,
          comments: '',
          hrs_planned: hrs,
          mins_planned: 0
        }
      })
      .success( function( response ){
        return $scope.addGanttActivity( (i+1),tasks_array );
      });
    }
  };

  $scope.deleteActivity = function( index ) {
    $http({
      url: './scripts/deleters/delete-activity.php',
      method: 'GET',
      params: {
        id_activity: $scope.activities[index].id_activity
      }
    })
    .success( function( response ) {
      $scope.getActivities();
    });
  };

  $scope.deleteExtraActivity = function( index ) {
    $http({
      url: './scripts/deleters/delete-extra-activity.php',
      method: 'GET',
      params: {
        id_activity: $scope.extraActivities[index].id_activity,
      }
    })
    .success( function( response ) {
      $scope.getExtraActivities();
    });
  };

  $scope.updateActivity = function() {
    $scope.editableActivity.activity_name === undefined ? $scope.emptyName = true : $scope.emptyName = false;
    $scope.editableActivity.responsable.name === 'Responsable' ? $scope.emptyResponsable = true : $scope.emptyResponsable = false;
    if( $scope.editableActivity.comments === undefined ) {
      $scope.editableActivity.comments = '';
    }
    isNaN( $scope.editableActivity.hrs_planned ) === true || $scope.editableActivity.hrs_planned < 0 ? $scope.notNumber = true : $scope.notNumber = false;
    if( $scope.emptyName === false && $scope.emptyResponsable === false && $scope.notNumber === false ) {
      $http({
        url: './scripts/updaters/update-activity.php',
        method: 'GET',
        params: {
          id_activity: $scope.editableActivity.id_activity,
          activity_name: $scope.editableActivity.activity_name,
          id_user: $scope.editableActivity.responsable.id_user,
          activity_comments: $scope.editableActivity.comments,
          activity_hrs_planned: $scope.editableActivity.hrs_planned,
          activity_mins_planned: $scope.editableActivity.minutes_planned,
          activity_begin_date: $scope.editableActivity.begin_date,
          activity_status: $scope.editableActivity.status,
          activity_end_date: $scope.editableActivity.end_date,
        }
      })
      .success( function( response ) {
        $scope.editableActivity = {};
        ngDialog.close({
          template: 'templates/updateActivity-template.html'
        });
        $scope.getActivities();
      });
    }
  };

  $scope.saveActivity = function() {
    $scope.activity.responsable = $scope.selected.responsable;
    $scope.activity.name === undefined ? $scope.emptyName = true : $scope.emptyName = false;
    $scope.activity.responsable.name === 'Responsable' ? $scope.emptyResponsable = true : $scope.emptyResponsable = false;
    if( $scope.activity.comments === undefined ) {
      $scope.activity.comments = '';
    }
    isNaN( $scope.activity.estimatedHours ) === true || $scope.activity.estimatedHours < 0 ? $scope.notNumber = true : $scope.notNumber = false;
    isNaN( $scope.activity.estimatedMinutes ) === true || $scope.activity.estimatedMinutes < 0 ? $scope.notNumber = true : $scope.notNumber = false;
    if( $scope.emptyName === false && $scope.emptyResponsable === false && $scope.notNumber === false ) {
      $http({
        url: './scripts/adders/add-activity.php',
        method: 'GET',
        params: {
          id_project: $stateParams.projectId,
          name_user: $scope.activity.responsable.name,
          begin_date: $scope.activity.beginDate,
          end_date: $scope.activity.endDate,
          name_activity: $scope.activity.name,
          comments: $scope.activity.comments,
          hrs_planned: $scope.activity.estimatedHours,
          mins_planned: $scope.activity.estimatedMinutes
        }
      })
      .success( function( response ) {
        $scope.activity = {};
        ngDialog.close({
          template: 'templates/add-activity-template.html'
        });
        $scope.getActivities();
      });
    }
  };

  /* ============================================
      DOM functions
  =============================================== */

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
      case 'activity':
        if( limitName === 'begin'){
          $scope.activity_beginDate = !$scope.activity_beginDate;
        }
        else if( limitName === 'end' ){
          $scope.activity_endDate = !$scope.activity_endDate;
        }
        break;
      case 'editableActivity':
        if( limitName === 'begin'){
          $scope.editableActivity_beginDate = !$scope.editableActivity_beginDate;
        }
        else if( limitName === 'end' ){
          $scope.editableActivity_endDate = !$scope.editableActivity_endDate;
        }
        break;
    }
  };

  $scope.addActivity = function(){
    ngDialog.open({
      template: 'templates/add-activity-template.html',
      closeByDocument: true,
      closeByEscape: true,
      scope: $scope
    });
  };

  $scope.openUpdateActivityTemplate = function( index ){
    $scope.editableActivity = $scope.activities[index];
    $scope.editableActivity.hrs_planned = +$scope.editableActivity.hrs_planned;
    $scope.editableActivity.minutes_planned = +$scope.editableActivity.minutes_planned;
    $scope.editableActivity.responsable = {};
    $scope.editableActivity.responsable = {id_user: $scope.editableActivity.id_user, name: $scope.editableActivity.employee};
    for( var i = 0; i < $scope.responsables.length; i++ ){
      if( $scope.editableActivity.responsable.id_user === $scope.responsables[i].id_user ){
        $scope.editableActivity.responsable = $scope.responsables[i];
        i = $scope.responsables.length;
      }
    }
    ngDialog.open({
      template: 'templates/updateActivity-template.html',
      closeByDocument: true,
      closeByEscape: true,
      scope: $scope
    });
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

  $scope.showActivities = function(selection){
    if( selection === 'planned' ){
      $scope.showPlanned = true;
      $scope.showExtras = false;
      var target = document.getElementById('planned');
      angular.element(target).addClass('selected');
      var target = document.getElementById('extras');
      angular.element(target).removeClass('selected');
    }
    else if( selection === 'extras' ){
        $scope.showPlanned = false;
        $scope.showExtras = true;
        var target = document.getElementById('extras');
        angular.element(target).addClass('selected');
        var target = document.getElementById('planned');
        angular.element(target).removeClass('selected');
    }
  };

  /* ============================================
      Calls on start
  =============================================== */

  $scope.getUsers();
  $scope.findProjectById();
  $scope.getActivities();
  $scope.getExtraActivities();
};
