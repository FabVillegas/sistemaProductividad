angular.module('productividadUsaria').controller('unlockCtrl', unlockCtrl);

unlockCtrl.$inject = ['$scope', '$http', '$state', 'ngDialog'];

function unlockCtrl ($scope, $http, $state, ngDialog){

  /* ============================================
      objects
  =============================================== */

  $scope.unlockToThisUser = {};
  var todayDate = new Date();
  $scope.unlockedWeek = {};

  /* ============================================
      arrays
  =============================================== */

  $scope.months = [
    {name: 'Enero', value: 1},
    {name: 'Febrero', value: 2},
    {name: 'Marzo', value: 3},
    {name: 'Abril', value: 4},
    {name: 'Mayo', value: 5},
    {name: 'Junio', value: 6},
    {name: 'Julio', value: 7},
    {name: 'Agosto', value: 8},
    {name: 'Septiembre', value: 9},
    {name: 'Octubre', value: 10},
    {name: 'Noviembre', value: 11},
    {name: 'Diciembre', value: 12},
  ];
  $scope.employees = [];
  $scope.unlockedWeek.month = $scope.months[todayDate.getMonth()];
  $scope.weeks = [];

  /* ============================================
      $scope functions
  =============================================== */

  $scope.saveWeek = function() {
    $http.get('./scripts/adders/add-week.php?id_user='+$scope.unlockToThisUser.id_user+
    '&begin_date='+$scope.unlockedWeek.week.beginDate+
    '&end_date='+$scope.unlockedWeek.week.endDate).success(function(response){
      ngDialog.close({
        template: 'templates/add-week-template.html',
      });
    });
  };

  $scope.getEmployees = function(){
    $http.get('./scripts/getters/get-users.php').success(function(response){
      $scope.employees = response;
    });
  };

  /* ============================================
      DOM functions
  =============================================== */

  $scope.getMondays = function() {
    $scope.weeks = [];
    var lookingForFirstMonday = true;
    var surrogateDate;
    var i = 1;
    while( lookingForFirstMonday ){
      surrogateDate = new Date(todayDate.getFullYear(),$scope.unlockedWeek.month.value - 1, i);
      if( surrogateDate.getDay() === 1 ){
        lookingForFirstMonday = false
      }
      else{
        i++;
      }
    };
    var j = 0;
    var beginning,ending;
    var begin_date,end_date;
    var nextDate,nextMonth,nextYear;
    var selectedMonth = new Date(surrogateDate.getFullYear(),surrogateDate.getMonth() + 1,0);
    while( surrogateDate.getMonth() === $scope.unlockedWeek.month.value - 1 ){
      beginning = surrogateDate.getDate() + '/' + (surrogateDate.getMonth()+1) + '/' + surrogateDate.getFullYear();
      nextDate = surrogateDate.getDate()+4;
      nextMonth = surrogateDate.getMonth()+1;
      nextYear = surrogateDate.getFullYear();
      if( nextDate > selectedMonth.getDate() ){
        nextDate = nextDate - selectedMonth.getDate();
        nextMonth++;
        if(nextMonth > 12){
          nextMonth = 1;
          nextYear = surrogateDate.getFullYear() + 1;
        }
      }
      ending = nextDate + '/' + nextMonth + '/' + nextYear;
      begin_date = surrogateDate.getFullYear() + '-' + (surrogateDate.getMonth()+1) + '-' + surrogateDate.getDate();
      end_date = nextYear + '-' + nextMonth + '-' + nextDate;
      $scope.weeks.push(
        { dateToShow: beginning + ' al ' + ending,
          beginDate: begin_date,
          endDate: end_date
        }
      );
      surrogateDate.setDate(surrogateDate.getDate()+7);
    };
    $scope.unlockedWeek.week = $scope.weeks[0];
  };

  $scope.unlockWeek = function(index){
    $scope.unlockToThisUser = $scope.employees[index];
    ngDialog.open({
      template: 'templates/add-week-template.html',
      scope: $scope
    });
  };

  /* ============================================
      Calls on start
  =============================================== */

  $scope.getMondays();
  $scope.getEmployees();

};
