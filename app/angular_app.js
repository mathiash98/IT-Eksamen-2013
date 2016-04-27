var myApp = angular.module('myApp', [
  'ngRoute',
  'appCtrls'
]);

myApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: './partials/hjem.html',
          controller: 'hjemCtrl'
        })
        .when('/lag', {
          templateUrl: 'partials/lag.html',
          controller: 'lagCtrl'
        })
        .when('/lag/:lagId', {
          templateUrl: 'partials/lag-detail.html',
          controller: 'lagDetailCtrl'
        })
        .when('/spillere', {
          templateUrl: 'partials/spillere.html',
          controller: 'spillereCtrl'
        })
        .when('/kontakt', {
          templateUrl: 'partials/kontakt.html',
          controller: 'kontaktCtrl'
        })
        .when('/pamelding', {
          templateUrl: 'partials/pamelding.html',
          controller: 'pameldingCtrl'
        })
        .when('/spillere', {
          templateUrl: 'partials/spillere.html',
          controller: 'spillereCtrl'
        })
        .when('/maal', {
          templateUrl: 'partials/maal.html',
          controller: 'maalCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
      // use the HTML5 History API

}]);
