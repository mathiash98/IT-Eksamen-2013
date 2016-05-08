var pages = [{
    name: 'Players',
    url: '#/players'
}, {
    name: 'Teams',
    url: '#/teams'
}, {
    name: 'Contact us',
    url: '#/contact'
}, {
}, {
    name: 'Events',
    url: '#/events'
}, {
    name: 'Registration',
    url: '#/registrate'
}];

var appCtrls = angular.module('appCtrls', []);
appCtrls.controller('navCtrl', ['$scope',
    function($scope) {
        $scope.pages = pages;
    }
]);

appCtrls.controller('hjemCtrl', ['$scope', '$http',
    function($scope, $http) {

    }
]);
//=============================================================================
appCtrls.controller('playersCtrl', ['$scope', '$http',
    function($scope, $http) {
      console.log('Hello from playersCtrl');
      $http.get('/api/player').success(function (data) {
        console.log(data);
        $scope.players = data;
      });
    }
]);
//=============================================================================
appCtrls.controller('teamsCtrl', ['$scope', '$http',
    function($scope, $http) {
        $http.get("/api/team").success(function(data) {
            console.log(data.data);
            $scope.teams = data.data;
        });

        var config = {
          headers: {
            Authorization: "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NzIzYzRjYTlhNGY1ODNjMTRjMDk4MTIiLCJuYW1lIjoiTWF0aGlhcyIsImFkbWluIjp0cnVlfQ.S9FIplzVio_N8Uw-iyvsn3tg8zDpXYUqQjcLnL_abJQ"
          }
        }
        $scope.removeTeam = function (team) {
          console.log('Deleting:', team);
          $http.delete("/api/team/" + team._id)
        }
    }
]);
//=============================================================================
appCtrls.controller('contactCtrl', ['$scope', '$http',
    function($scope, $http) {

    }
]);
//=============================================================================
appCtrls.controller('eventsCtrl', ['$scope', '$http',
    function($scope, $http) {

    }
]);
//=============================================================================
appCtrls.controller('registrateCtrl', ['$scope', '$http',
            function($scope, $http) {
              $scope.registrate = {};
              $scope.registrate.players = [{name: 'Kari Nordmann', number: 5}, {name: 'Ola Nordmann', number: 10}];
              $scope.addRegistratePlayer = function() {
                $scope.registrate.players.push({name: '', number: 0});
              }
                $http.get('/api/league').success(function(data) {
                    console.log(data.data);
                    $scope.leagues = data.data;
                });
                //find id for league in leagueer array and use that id in league_id
                console.log($scope.registrate);
                $scope.registrate_submit = function(val) {
                    console.log(val);
                    val._league = find_idByVal(val._league)
                    var container = $( ".registrate_container" );
                    var config = {
                      headers: {
                        Authorization: "JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1NzIzYzRjYTlhNGY1ODNjMTRjMDk4MTIiLCJuYW1lIjoiTWF0aGlhcyIsImFkbWluIjpmYWxzZX0.lMWjJYNIsyz86bQWf-4G6alAFDQ2KUbRY_zXejqZ5ME"
                      }
                    }
                    $http.post("/api/team", val, config).then(function successCallback(res) {
                      console.log(res);
                      if (res.data.err) {
                        container.append('<div class="alert alert-warning fade in"><a href="" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>'+res.data.msg+'</strong></div>');
                      } else if (res.data.err == 0) {
                        container.append('<div class="alert alert-success fade in"><a href="" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>'+res.data.msg+'</strong></div>');
                      }
                    },
                    function errorCallback(res) {
                      container.append('<div class="alert alert-warning fade in"><a href="" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Det var en error, vennligst prøv igjen senere eller kontakt oss på mail: mathiash98@gmail.com</strong></div>');
                    });;
                    }

                  function find_idByVal(val) {
                    for (var i = 0; i < $scope.leagues.length; i++) {
                        if ($scope.leagues[i].name === val) {
                            return $scope.leagues[i]._id;
                        }
                    }
                  }
            }
]);
            //=============================================================================
