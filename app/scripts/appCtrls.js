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
var config = {
  headers: {
    Authorization: localStorage.accessToken
  }
}
var appCtrls = angular.module('appCtrls', []);
appCtrls.controller('navCtrl', ['$scope', '$http',
    function($scope, $http) {
        $scope.pages = pages;
        $scope.accessToken = localStorage.accessToken;
        console.log($scope.accessToken);

        $scope.login = function (login_details) {
          $http.post('/api/auth/login', login_details).success(function (res) {
            console.log(res.token);
            if (res.err) {
              console.log('Error:', res);
            } else {
              localStorage.accessToken = res.token;
              $scope.accessToken = localStorage.accessToken;
            }
          });
        }

        $scope.logout = function () {
          localStorage.removeItem('accessToken');
          $scope.accessToken = localStorage.accessToken;
        }
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
      $http.get('/api/player').success(function (res) {
        console.log(res);
        $scope.players = res.data;
      });
      $scope.removePlayer = function (player) {
        var container = $( ".players_container" );

        console.log('Deleting:', player);

        $http.delete("/api/player/" + player._id, config)
        .success(function (res) {
          console.log(res);
          if (res.err) {
            container.append('<div class="alert alert-warning fade in"><a href="" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>'+res.msg+'</strong></div>');
          } else if (res.err == 0) {
            container.append('<div class="alert alert-success fade in"><a href="" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>'+res.msg+'</strong></div>');
            $scope.players = res.data
          }
        })
        .error(function () {
          container.append('<div class="alert alert-warning fade in"><a href="" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>There was an error, you are most propably not authorized to do this action.</strong></div>');
        })
      }
    }
]);
//=============================================================================
appCtrls.controller('teamsCtrl', ['$scope', '$http',
    function($scope, $http) {
        $http.get("/api/team").success(function(res) {
            console.log(res.data);
            $scope.teams = res.data;
        });


        $scope.removeTeam = function (team) {
          var container = $( ".teams_container" );

          console.log('Deleting:', team);

          $http.delete("/api/team/" + team._id, config)
          .success(function (res) {
            console.log(res);
            if (res.err) {
              container.append('<div class="alert alert-warning fade in"><a href="" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>'+res.msg+'</strong></div>');
            } else if (res.err == 0) {
              container.append('<div class="alert alert-success fade in"><a href="" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>'+res.msg+'</strong></div>');
              $scope.teams = res.data
            }
          })
          .error(function () {
            container.append('<div class="alert alert-warning fade in"><a href="" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>There was an error, you are most propably not authorized to do this action.</strong></div>');
          })
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
                    $http.post("/api/team", val, config).then(function successCallback(res) {
                      console.log(res);
                      if (res.data.err) {
                        container.append('<div class="alert alert-error fade in"><a href="" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>'+res.data.msg+'</strong></div>');
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
