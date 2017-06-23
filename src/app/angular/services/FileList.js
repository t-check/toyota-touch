app.factory('FileList', ['$http', '$q', function($http, $q){
        var files = [];
        var selectedFolderName = 'USA';
        var folders = [];

        return {
            init: function(){
                return $q(function(resolve){
                    $http.get('files/' + selectedFolderName).then(function(response){
                        files = response.data;
                        resolve(files);
                    })
                })
                
            },
            getFiles: function(){
                return files
            },
            randomize: function(){

            },
            getFolders: function(){
                return $q(function(resolve){
                    $http.get('folders').then(function(response){
                        folders = response.data;
                        resolve(folders);
                    })
                })
            },
            selectFolder: function(folder){
                selectedFolderName = folder;
            }
        }
    }])