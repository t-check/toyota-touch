app.factory('FileList', ['$http', '$q', function($http, $q){
        var files = [];
        
        return {
            init: function(){
                return $q(function(resolve){
                    $http.get('files').then(function(response){
                        files = response.data;
                        resolve(files);
                    })
                })
                
            },
            getFiles: function(){
                return files
            },
            randomize: function(){

            }
        }
    }])