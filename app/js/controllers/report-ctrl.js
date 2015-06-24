angular.module('productividadUsaria').controller('reportCtrl', reportCtrl);

reportCtrl.$inject = ['$scope', '$http'];

function reportCtrl ($scope, $http){

  /* ============================================
      objects
  =============================================== */

  $scope.selected = {};
  $scope.responsables = [
    {id_user: 0, name: 'Elige un nombre', photo: 'none', notAnOption: true}
  ];
  $scope.selected.responsable_one = $scope.responsables[0];
  $scope.selected.responsable_two = $scope.responsables[0];
  $scope.selected.responsable_three = $scope.responsables[0];
  $scope.myoptions = { scaleBeginAtZero : true, responsive: true, maintainAspectRatio: true, scaleShowGridLines: false };
  $scope.selectedMonth = "";

  /* ============================================
      arrays
  =============================================== */

  $scope.users = [];
  $scope.months = [
    { num: 0, name: 'Enero' },
    { num: 1, name: 'Febrero' },
    { num: 2, name: 'Marzo' },
    { num: 3, name: 'Abril' },
    { num: 4, name: 'Mayo' },
    { num: 5, name: 'Junio' },
    { num: 6, name: 'Julio' },
    { num: 7, name: 'Agosto' },
    { num: 8, name: 'Septiembre' },
    { num: 9, name: 'Octubre' },
    { num: 10, name: 'Noviembre' },
    { num: 11, name: 'Diciembre' },
  ];
  $scope.colors = ['#464646', '#0147BD', '#FF6700'];
  $scope.labels = [];
  $scope.data = [];
  $scope.planned = [];
  $scope.reported = [];
  $scope.extras = [];
  $scope.extraActivities = [];
  $scope.plannedActivities = [];

  /* ============================================
    conditionals true / false
  =============================================== */

  $scope.oneIsSelected = false;
  $scope.showDetail = false;

  /* ============================================
      $scope functions
  =============================================== */

  $scope.getUsers = function(){
    $http({
      url: './scripts/getters/get-subordinates.php',
    })
    .then( function( response ) {
      $scope.users = response.data;
      angular.forEach(response.data, function( obj, key ) {
        var surrogate = {id: obj.id_user, name: obj.name, photo: obj.photo};
        $scope.responsables.push(surrogate);
      });
    });
  };

  /* ============================================
      DOM functions
  =============================================== */

  $scope.getData =  function() {
    $scope.showDetail = false;
    if( $scope.selected.responsable_one.name !== 'Elige un nombre' ){
      $scope.oneIsSelected = true;
      $scope.data = [];
      $scope.labels = [];
      $scope.planned = [];
      $scope.reported = [];
      $scope.extras = [];
      var today = new Date();
      var surrogateDate = new Date(today.getFullYear(), 0, 1);
      $http({
        url: './scripts/getters/report.php',
        method: 'GET',
        params: {
          firstDay: surrogateDate,
          id_user: $scope.selected.responsable_one.id
        }
      })
      .success( function( response ) {
        $scope.series = ['Planeado', 'Reportado', 'Extra'];
        angular.forEach( response, function( obj, key ) {
          $scope.labels.push($scope.months[key].name);
          if( obj.hrs_planned === null )
            obj.hrs_planned = 0;
          if( obj.hrs_reported === null )
            obj.hrs_reported = 0;
          if( obj.hrs_extra === null)
            obj.hrs_extra = 0;
          $scope.planned.push( obj.hrs_planned );
          $scope.reported.push( obj.hrs_reported );
          $scope.extras.push( obj.hrs_extra );
        });
        $scope.data.push( $scope.planned );
        $scope.data.push( $scope.reported );
        $scope.data.push( $scope.extras );
      });
    }
  };

  $scope.onClick = function (points, evt, index) {
    $scope.showDetail = true;
    $scope.plannedActivities = [];
    $scope.extraActivities = [];
    var monthKey = 0;
    for( var i = 0; i < $scope.months.length; i++ ) {
      if( $scope.months[i].name === points[0].label ) {
        monthKey = $scope.months[i].num;
        $scope.selectedMonth = $scope.months[i].name;
      }
    }
    var surrogateDate = new Date();
    var beginDate = new Date(surrogateDate.getFullYear(), monthKey, 1);
    var endDate = new Date(surrogateDate.getFullYear(), monthKey + 1, 0);
    $http({
      url: './scripts/getters/get-planned-activities.php',
      method: 'GET',
      params: {
        id_user: $scope.selected.responsable_one.id,
        begin: beginDate,
        end: endDate,
      }
    })
    .success( function( response ) {
      $scope.plannedActivities = response;
    });
    $http({
      url: './scripts/getters/get-extra-activities.php',
      method: 'GET',
      params: {
        id_user: $scope.selected.responsable_one.id,
        begin_date: beginDate,
        end_date: endDate,
      }
    })
    .success( function( response ) {
      $scope.extraActivities = response;
    });
  };

  $scope.configChart = function() {
    $scope.chartType = 'bar';
    $scope.config = { // config chart
      title: 'Progreso semanal',
      tooltips: true,
      labels: false,
      mouseover: function() {},
      mouseout: function() {},
      click: function() {},
      legend: {
        display: true,
        position: 'right' //puede ser 'left, right'
      },
    };
  };

  /* ============================================
      Calls on start
  =============================================== */

  $scope.configChart();
  $scope.getUsers();
};
