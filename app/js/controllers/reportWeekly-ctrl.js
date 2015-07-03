angular.module('productividadUsaria').controller('reportWeeklyCtrl', reportWeeklyCtrl);

reportWeeklyCtrl.$inject = ['$scope', '$http'];

function reportWeeklyCtrl ($scope, $http) {

  /* ====================================================
    objects
  ======================================================= */

  $scope.selected = {};
  $scope.responsables = [
    {id_user: 0, name: 'Elige un nombre', photo: 'none', notAnOption: true}
  ];

  $scope.selected.responsable = $scope.responsables[0];

  /* ====================================================
    arrays
  ======================================================= */

  $scope.users = [];

  /* ====================================================
    global variables
  ======================================================= */

  $scope.series = ['Planeado', 'Reportado', 'Extra'];
  $scope.labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  $scope.data = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
  ];
  $scope.someoneIsSelected = false;

  $scope.plan_hrs = [0,0,0,0,0];
  $scope.extra_hrs = [0,0,0,0,0];


  /* ====================================================
    $scope logic functions
  ======================================================= */

  $scope.getData = function() {

    /*

    NOTE TO SELF:
    MAKE A PROCEDURE TOMORROW TO OBTAIN THE WEEKLY REPORT

    */

    $scope.data = [];
    $scope.someoneIsSelected = true;
    /* pending */
    var hours_per_day = ( $scope.selected.responsable.hrs_per_week / 5 );
    var surrogate_planeado = [];
    for( var i = 0; i < 5; i++ ) {
      surrogate_planeado.push(hours_per_day);
    }
    $scope.data.push(surrogate_planeado);

    var test_monday_date = "2015-06-29";
    var test_friday_date = "2015-07-03";

    $http({
      url: './scripts/getters/get-weekly-report.php',
      method: 'GET',
      params: {
        id_user: $scope.selected.responsable.id,
        monday_date: test_monday_date,
        friday_date: test_friday_date,
      }
    })
    .success( function( response ) {
      angular.forEach( response, function( obj, key ) {
        if( obj.type === 'plan' ){
          $scope.plan_hrs.push( Number(obj.hrs_reported) + (Number(obj.minutes_reported)/60) );
        }
        else if( obj.type === 'extra' ){
          $scope.extra_hrs.push( Number(obj.hrs_reported) + (Number(obj.minutes_reported)/60) );
        }
      });
      $scope.data.push( $scope.plan_hrs );
      $scope.data.push( $scope.extra_hrs );
    });
  };

  /* ====================================================
    DOM functions
  ======================================================= */

  $scope.getUsers = function() {
    $http({
      url: './scripts/getters/get-subordinates.php',
    })
    .success( function( response ) {
      console.log( response );
      $scope.users = response;
      angular.forEach(response, function( obj, key ) {
        var surrogate = {id: obj.id_user, name: obj.name, photo: obj.photo, hrs_per_week: Number( obj.hrs_to_complete ) };
        $scope.responsables.push(surrogate);
      });
    });
  };

  /* ====================================================
    Calls on start
  ======================================================= */

  $scope.getUsers();

};
