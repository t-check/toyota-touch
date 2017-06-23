app.factory('UpdatePlayer', ['$http', '$q', function($http, $q){
        

        return {
            update: function(){
                $http.get('get-latest').then(function(response){
                    resolve(response.data);
                })
            }
        }
    }])