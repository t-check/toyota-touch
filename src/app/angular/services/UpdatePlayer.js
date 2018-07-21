app.factory('UpdatePlayer', ['$http', '$q', '$rootScope', function($http, $q, $rootScope){
        

        return {
            update: function(){
                $http.get('get-latest').then(function(response){
                    resolve(response.data);
                })
            },
            reboot: function(){
                $http.get('reboot').then(function(response){
                    resolve(response.data);
                })
            },
            getNewSongs: function() {
                $http.get('update-songs/' + $rootScope.defaultDrive).then(function(response) {
                    resolve(response.data);
                })
            },
            getSongStatus: function() {
                var p = new Promise(function(resolve, reject) {
                    $http.get('get-update-songs-progress' ).then(function(response) {
                        resolve(response.data);
                    })
                });

                return p;
            }
        }
    }])