var pages = [{
    name: 'Spillere',
    url: '#/spillere'
}, {
    name: 'Lag',
    url: '#/lag'
}, {
    name: 'Kontakt oss',
    url: '#/kontakt'
}, {
}, {
    name: 'Hendelser',
    url: '#/hendelser'
}, {
    name: 'Påmelding',
    url: '#/pamelding'
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
appCtrls.controller('spillereCtrl', ['$scope', '$http',
    function($scope, $http) {
      console.log('Hello from spillereCtrl');
      $http.get('/api/spillere').success(function (data) {
        console.log(data);
        $scope.spillere = data;
      });
    }
]);
//=============================================================================
appCtrls.controller('lagCtrl', ['$scope', '$http',
    function($scope, $http) {
        $http.get("/api/lag").success(function(data) {
            console.log(data);
            $scope.lag = data;
        });
    }
]);
//=============================================================================
appCtrls.controller('kontaktCtrl', ['$scope', '$http',
    function($scope, $http) {

    }
]);
//=============================================================================
appCtrls.controller('hendelserCtrl', ['$scope', '$http',
    function($scope, $http) {

    }
]);
//=============================================================================
appCtrls.controller('pameldingCtrl', ['$scope', '$http',
            function($scope, $http) {
              $scope.pamelding_spillere = [{navn: 'Kari Nordmann', draktNr: 5}, {navn: 'Ola Nordmann', draktNr: 10}];
              $scope.addPameldingSpiller = function() {
                $scope.pamelding_spillere.push({navn: '', draktNr: 0});
              }
                $http.get('/api/liga').success(function(data) {
                    console.log(data);
                    $scope.ligaer = data;
                });
                //find id for liga in ligaer array and use that id in liga_id
                $scope.pamelding_submit = function(val) {
                    var tmp = {
                        navn: $scope.pamelding_navn,
                        _liga: find_idByVal($scope.pamelding_liga),
                        spillere: $scope.pamelding_spillere,
                        email: $scope.pamelding_email,
                        telefon: $scope.pamelding_telefon
                    };
                    console.log(tmp);
                    var container = $( ".pamelding_container" );
                    $http.post("/api/pamelding", tmp).then(function successCallback(res) {
                      if (res.data.success === false) {
                        container.append('<div class="alert alert-warning fade in"><a href="" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>'+res.data.data+'</strong></div>');
                      } else if (res.data.success === true) {
                        container.append('<div class="alert alert-success fade in"><a href="" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>'+res.data.data+'</strong></div>');
                      }
                    },
                    function errorCallback(res) {
                      container.append('<div class="alert alert-warning fade in"><a href="" class="close" data-dismiss="alert" aria-label="close">&times;</a><strong>Det var en error, vennligst prøv igjen senere eller kontakt oss på mail: mathiash98@gmail.com</strong></div>');
                    });;
                    }

                  function find_idByVal(val) {
                    for (var i = 0; i < $scope.ligaer.length; i++) {
                        if ($scope.ligaer[i].navn === val) {
                            return $scope.ligaer[i]._id;
                        }
                    }
                  }
            }
]);
            //=============================================================================
