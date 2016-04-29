var myApp = angular.module('myApp', [
  'ngRoute',
  'appCtrls'
]);

myApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: './partials/home.html',
          controller: 'homeCtrl'
        })
        .when('/teams', {
          templateUrl: 'partials/teams.html',
          controller: 'teamsCtrl'
        })
        .when('/teams/:teamId', {
          templateUrl: 'partials/team-detail.html',
          controller: 'teamDetailCtrl'
        })
        .when('/players', {
          templateUrl: 'partials/players.html',
          controller: 'playersCtrl'
        })
        .when('/contact', {
          templateUrl: 'partials/contact.html',
          controller: 'contactCtrl'
        })
        .when('/registrate', {
          templateUrl: 'partials/registrate.html',
          controller: 'registrateCtrl'
        })
        .when('/events', {
          templateUrl: 'partials/events.html',
          controller: 'eventsCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
      // use the HTML5 History API

}]);
