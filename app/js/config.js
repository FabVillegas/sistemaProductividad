angular.module('productividadUsaria', [
  'ui.router',
  'skeleton',
  'ngEnter',
  'ngDialog',
  'mp.datePicker',
  'chart.js'
]).
config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('login');
	$stateProvider.
	state('login', {
		url: '/login',
		templateUrl: 'views/login-view.html',
		controller: 'loginCtrl',
    resolve: {
      checkAuth: isLoggedIn
    }
	}).
	state('dashboard', {
		url: '/dashboard',
		templateUrl: 'views/dashboard-view.html',
		controller: 'dashboardCtrl',
	}).
  state('dashboard.projects', {
		url: '/projects/',
		templateUrl: 'views/projects-view.html',
		controller: 'projectsCtrl',
	}).
  state('dashboard.activities', {
		url: '/projects/:projectId/activities',
		templateUrl: 'views/projectActivities-view.html',
		controller: 'projectActivitiesCtrl',
	}).
  state('dashboard.records', {
		url: '/records/',
		templateUrl: 'views/records-view.html',
		controller: 'recordsCtrl',
	}).
  state('dashboard.employee', {
		url: '/pending/',
		templateUrl: 'views/employee-view.html',
		controller: 'employeeCtrl',
	}).
  state('dashboard.users', {
		url: '/users/',
		templateUrl: 'views/users-view.html',
		controller: 'usersCtrl',
	}).
  state('dashboard.unlock', {
		url: '/unlock/',
		templateUrl: 'views/unlock-view.html',
		controller: 'unlockCtrl',
	}).
  state('dashboard.progress', {
		url: '/progress/',
		templateUrl: 'views/progress-view.html',
		controller: 'progressCtrl',
	}).
  state('dashboard.report', {
		url: '/report/',
		templateUrl: 'views/report-view.html',
		controller: 'reportCtrl',
	});
}]);


var isLoggedIn = function($http, $state) {
  $http.get('./scripts/auth.php').success(function(response){
    console.log(response);
    if(response.logged === true){
      switch(response.privilege){
        case 'Administrador de Proyecto':
          $state.go('dashboard.projects');
          break;
        case 'Administrador de Sistema':
          $state.go('dashboard.employee');
        case 'Empleado':
          $state.go('dashboard.employee');
      }
    }
    else{
      $state.go('login');
    }
  });
};
