angular.module('productividadUsaria').controller('recordsCtrl', recordsCtrl);

recordsCtrl.$inject = ['$scope', '$http', 'ngDialog'];

function recordsCtrl ($scope, $http, ngDialog){

  /* ============================================
      objects
  =============================================== */

  $scope.newExtraActivity = {};
  $scope.editable_extraActivity = {};
  $scope.selected = {};
  $scope.user = {};

  /* ============================================
      arrays
  =============================================== */

  $scope.activities = [];
  $scope.activities_extra = [];
  $scope.projects = [];

  /* ============================================
      global variables
  =============================================== */

  $scope.totalHoursRecorded = 0;

  /* ============================================
     true/false conditions
  =============================================== */

  $scope.showPlanned = true;
  $scope.showExtras = false;
  $scope.newExtraActivity_beginDate = false;
  $scope.newExtraActivity_endDate = false;
  $scope.editable_extraActivity_beginDate = false;
  $scope.editable_extraActivity_endDate = false;

  /* ============================================
     $scope logic functions
  =============================================== */

  $scope.getPlannedActivities = function(){
    $http({
      url: './scripts/getters/get-planned-activities.php',
      method: 'GET',
      params: {
        begin: $scope.selected.week.begin,
        end: $scope.selected.week.end,
        id_user: $scope.user.id_user,
      }
    })
    .success( function( response ) {
      $scope.activities = response;
      angular.forEach( $scope.activities, function( obj, key ) {
        obj.hrs_reported = +obj.hrs_reported;
        obj.minutes_reported = +obj.minutes_reported;
        obj.hrs_already_reported = +obj.hrs_reported;
        obj.minutes_already_reported = +obj.minutes_reported;
        obj.type = 'plan';
      });
      $scope.getExtraActivities();
    });
  };

  $scope.getExtraActivities = function(){
    $http({
      url: './scripts/getters/get-extra-activities.php',
      method : 'GET',
      params: {
        id_user: $scope.user.id_user, begin_date: $scope.newExtraActivity.beginDate,
        begin_date: $scope.selected.week.begin,
        end_date: $scope.selected.week.end,
      }
    })
    .then( function( response ) {
      $scope.activities_extra = response.data;
      angular.forEach( $scope.activities_extra, function( obj, key ) {
        obj.hrs_reported = +obj.hrs_reported;
        obj.minutes_reported = +obj.minutes_reported;
        obj.hrs_already_reported = +obj.hrs_reported;
        obj.minutes_already_reported = +obj.minutes_reported;
        obj.type = 'extra';
      });
      $scope.getTotalHoursReported();
    });
  };

  $scope.getProjects = function(){
    $http({
      url: './scripts/getters/get-all-projects.php',
    })
    .then( function( response ) {
      angular.forEach( response.data, function( obj, key ) {
        var surrogate = { name: obj.name, id: obj.id_project };
        $scope.projects.push( surrogate );
      });
      $scope.selected.project = $scope.projects[0];
    });
  };

  $scope.getCurrentUser = function(){
    $http({
      url: './scripts/getters/get-user-by-name.php',
    })
    .then( function( response ) {
      $scope.user = response.data[0];
      $scope.getUnlockedWeeks();
      $scope.getPlannedActivities();
    });
  };

  $scope.getUnlockedWeeks = function(){
    $http({
      url: './scripts/getters/get-unlocked-weeks.php',
      method: 'GET',
      params: {
        id_user: $scope.user.id_user,
      }
    })
    .then( function( response ) {
      angular.forEach( response.data, function( row, key ) {
        var rowRange = row.begin_date + ' al ' + row.end_date;
        $scope.weeks.push( { range: rowRange, begin: row.begin_date, end: row.end_date } );
      });
    });
  };

  $scope.getTotalHoursReported = function() {
    $scope.totalHoursRecorded = 0;
    var today_date = new Date();
    var today_date_string = today_date.getFullYear() + '-' + (today_date.getMonth()+1) + '-' + today_date.getDate();
    $http({
      url: './scripts/getters/get-daily-records.php',
      method: 'GET',
      params: {
        id_user: $scope.user.id_user,
        today_date: today_date_string,
      }
    })
    .success( function( response ) {
      angular.forEach( response, function( obj, key ) {
        $scope.totalHoursRecorded += (Number(obj.hrs_reported) + (Number(obj.minutes_reported)/60));
      });
    });
  };

  $scope.saveRecord = function(index){
    if( isNaN($scope.activities[index].hrs_reported) || isNaN($scope.activities[index].minutes_reported) ){
      ngDialog.open({
        template: 'templates/error-invalid-record-template.html',
        closeByDocument: true,
        closeByEscape: true,
      });
    }
    else{
      if( $scope.activities[index].comments === undefined ){
        $scope.activities[index].comments = '';
      }
      $scope.recordedActivity = $scope.activities[index];
      $http({
        url: './scripts/updaters/update-activity-on-record.php',
        method: 'GET',
        params: {
          id_activity: $scope.recordedActivity.id_activity,
          activity_comments: $scope.recordedActivity.comments,
          hrs_reported: $scope.recordedActivity.hrs_reported,
          mins_reported: $scope.recordedActivity.minutes_reported,
          activity_status: $scope.recordedActivity.status,
        },
      })
      .success( function( response ) {
        $scope.saveDailyRecord($scope.recordedActivity);
        $scope.getPlannedActivities();
        $scope.recordedActivity = {};
      });
    }
  };

  $scope.add_extraActivity = function() {
    $scope.newExtraActivity.project = $scope.selected.project;
    /* condiciones de que los campos se llenaron correctamente */
    $scope.newExtraActivity.name === undefined ? $scope.emptyName = true : $scope.emptyName = false;
    $scope.newExtraActivity.beginDate === undefined ? $scope.emptyBeginDate = true : $scope.emptyBeginDate = false;
    $scope.newExtraActivity.endDate === undefined ? $scope.emptyEndDate = true : $scope.emptyEndDate = false;
    if( $scope.newExtraActivity.comments === undefined ){
      $scope.newExtraActivity.comments = '';
    }
    isNaN($scope.newExtraActivity.hrs_reported) === true || $scope.newExtraActivity.hrs_reported < 0 ? $scope.notNumber = true : $scope.notNumber = false;
    isNaN($scope.newExtraActivity.minutes_reported) === true || $scope.newExtraActivity.minutes_reported < 0 ? $scope.notNumber = true : $scope.notNumber = false;
    /* si todo esta en orden, realiza query */
    if( $scope.emptyName === false && $scope.notNumber === false && $scope.emptyBeginDate === false && $scope.emptyEndDate === false ){
      $scope.newExtraActivity.hrs_already_reported = $scope.newExtraActivity.hrs_reported;
      $scope.newExtraActivity.minutes_already_reported = $scope.newExtraActivity.minutes_reported;
      $scope.newExtraActivity.type = 'extra';
      /* query */
      $http({
        url: './scripts/adders/add-extra-activity.php',
        method : 'GET',
        params: {
          id_project: $scope.newExtraActivity.project.id,
          id_user: $scope.user.id_user,
          begin_date: $scope.newExtraActivity.beginDate,
          end_date: $scope.newExtraActivity.endDate,
          name: $scope.newExtraActivity.name,
          hrs_reported: $scope.newExtraActivity.hrs_reported,
          minutes_reported: $scope.newExtraActivity.minutes_reported,
          comments: $scope.newExtraActivity.comments
        }
      })
      .success( function( response ) {
        $scope.newExtraActivity.id_activity = response;
        /* se guarda el daily record */
        $scope.saveDailyRecord( $scope.newExtraActivity );
        ngDialog.close({
          template: 'templates/add-extra-activity-template.html',
        });
        $scope.newExtraActivity = {};
        $scope.getExtraActivities();
      });
    }
  };

  $scope.saveExtraActivityRecord = function( index ){
    /* Si se capturaron bien las horas/minutos, se hace consulta
    Si no, se muestra el error */
    if( isNaN($scope.activities_extra[index].hrs_reported) || isNaN($scope.activities_extra[index].minutes_reported) ){
      ngDialog.open({
        template: 'templates/error-invalid-record-template.html',
        closeByDocument: true,
        closeByEscape: true,
      });
    }
    else{
      if( $scope.activities_extra[index].comments === undefined ){
        $scope.activities_extra[index].comments = '';
      }
      $scope.recordedActivity = $scope.activities_extra[index];
      /* query */
      $http({
        url: './scripts/updaters/update-extra-activity-on-record.php',
        method: 'GET',
        params: {
          id_activity: $scope.recordedActivity.id_activity,
          activity_comments: $scope.recordedActivity.comments,
          hrs_reported: $scope.recordedActivity.hrs_reported,
          mins_reported: $scope.recordedActivity.minutes_reported,
        },
      })
      .success( function( response ) {
        $scope.saveDailyRecord( $scope.recordedActivity );
        $scope.recordedActivity = {};
        $scope.getPlannedActivities();
      });
    }
  };

  $scope.deleteExtraActivity = function() {
    $http({
      url: './scripts/deleters/delete-extra-activity.php',
      method: 'GET',
      params: {
        id_activity: $scope.editable_extraActivity.id_activity,
      }
    })
    .success( function( response ) {
      $scope.editable_extraActivity = {};
      ngDialog.close({
        template: 'templates/update-extra-activity-template.html',
      });
      $scope.getExtraActivities();
    });
  };

  $scope.saveDailyRecord = function( activity ) {
    if( activity.activity_name !== undefined ){
      activity.name = activity.activity_name;
    }
    var today_date = new Date();
    var today_date_string = today_date.getFullYear() + '-' + (today_date.getMonth()+1) + '-' + today_date.getDate();
    var hrs_daily;
    var minutes_daily;
    /* condiciones para las horas */
    if( activity.hrs_reported !== activity.hrs_already_reported ){
      hrs_daily = activity.hrs_reported - activity.hrs_already_reported;
    }
    else{
      hrs_daily = activity.hrs_reported;
    }
    /* condiciones para los minutos */
    if( activity.minutes_reported !== activity.minutes_already_reported ){
      minutes_daily = activity.minutes_reported - activity.minutes_already_reported;
    }
    else{
      minutes_daily = activity.minutes_reported;
    }
    /* query */
    $http({
      url: './scripts/adders/add-daily-record.php',
      method: 'GET',
      params: {
        id_user : $scope.user.id_user,
        today : today_date_string,
        id_activity: activity.id_activity,
        name_activity : activity.name,
        hrs_reported : hrs_daily,
        minutes_reported : minutes_daily,
        type: activity.type,
      }
    })
    .success( function( response ) {
      console.log( response );
    });
  };

  $scope.update_ExtraActivityInfo = function() {
    if( $scope.editable_extraActivity.comments === undefined ) {
      $scope.editable_extraActivity.comments = '';
    }
    $scope.editable_extraActivity.name === undefined ? $scope.emptyName = true : $scope.emptyName = false;
    $scope.editable_extraActivity.begin_date === undefined ? $scope.emptyBeginDate = true : $scope.emptyBeginDate = false;
    $scope.editable_extraActivity.end_date === undefined ? $scope.emptyEndDate = true : $scope.emptyEndDate = false;
    if( $scope.emptyName === false && $scope.emptyBeginDate === false && $scope.emptyEndDate === false ) {
      $http({
        url: './scripts/updaters/update-extra-activity-info.php',
        method : 'GET',
        params: {
          id_activity: $scope.editable_extraActivity.id_activity,
          begin_date: $scope.editable_extraActivity.begin_date,
          end_date: $scope.editable_extraActivity.end_date,
          name: $scope.editable_extraActivity.name,
          comments: $scope.editable_extraActivity.comments
        }
      })
      .then( function( response ) {
        $scope.editable_extraActivity = {};
        ngDialog.close({
          template: 'templates/update-extra-activity-template.html',
        });
        $scope.getExtraActivities();
      });
    }
  };

  /* ============================================
     DOM functions
  =============================================== */

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

  function getWeeks(){
    var todayDate = new Date();
    var currentDayOfTheWeek = todayDate.getDay();
    var monday,friday,prevMonth,nextMonth;
    monday = todayDate.getDate() - currentDayOfTheWeek + 1;
    friday = monday + 4;
    prevMonth = todayDate.getMonth() + 1;
    nextMonth = prevMonth;
    var previousMonthDate = new Date(todayDate.getFullYear(),todayDate.getMonth(),0);
    var nextMonthDate = new Date(todayDate.getFullYear(),todayDate.getMonth()+1,0);
    if( monday < 1 ){
      monday = previousMonthDate.getDate() + monday;
      prevMonth = previousMonthDate.getMonth() + 1;
    }
    if( friday > nextMonthDate.getDate() ){
      friday = friday - nextMonthDate.getDate();
      nextMonth = todayDate.getMonth() + 2;
    }
    var beginDate = todayDate.getFullYear() + '-' + prevMonth + '-' + monday;
    var endDate = todayDate.getFullYear() + '-' + nextMonth + '-' + friday;
    $scope.weeks = [
      {range: beginDate + ' al ' + endDate, begin: beginDate, end: endDate}
    ];
    $scope.selected.week = $scope.weeks[0];
  };

  $scope.switchDatePicker = function(objName, limitName){
    switch(objName){
      case 'newExtraActivity':
        if( limitName === 'begin'){
          $scope.newExtraActivity_beginDate = !$scope.newExtraActivity_beginDate;
        }
        else if( limitName === 'end' ){
          $scope.newExtraActivity_endDate = !$scope.newExtraActivity_endDate;
        }
        break;
      case 'editable_extraActivity':
        if( limitName === 'begin'){
          $scope.editable_extraActivity_beginDate = !$scope.editable_extraActivity_beginDate;
        }
        else if( limitName === 'end' ){
          $scope.editable_extraActivity_endDate = !$scope.editable_extraActivity_endDate;
        }
        break;
    }
  };

  $scope.open_extraActivityTemplate = function(){
    ngDialog.open({
      template: 'templates/add-extra-activity-template.html',
      closeByDocument: true,
      closeByEscape: true,
      scope: $scope
    });
  };

  $scope.open_updateExtraActivity = function( selectedItem ) {
    $scope.editable_extraActivity = selectedItem;
    ngDialog.open({
      template: 'templates/update-extra-activity-template.html',
      closeByDocument: true,
      closeByEscape: true,
      scope: $scope
    });
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
     calls on start
  =============================================== */

  getWeeks();
  $scope.getProjects();
  $scope.getCurrentUser();
};
