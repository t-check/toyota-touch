app.factory('FileList', ['$http', '$q', '$rootScope', function($http, $q, $rootScope){
        var files = [];
        var selectedFolderName = 'USA';
        var folders = [];
        var drives = [];

        return {
            init: function(){
                return $q(function(resolve){
                    $http.get('get-drives').then(function(response){
                        drives = response.data;
                        
                        $http.get('get-default-drive').then(function(result){
                            $rootScope.defaultDrive = result.data.defaultDrive;

                            $http.get('files/' + result.defaultDrive + '/' + selectedFolderName).then(function(response){
                                files = response.data;
                                resolve(files);
                            })
                        })
                    });
                })
                
            },
            getFiles: function(){
                return files
            },
            randomize: function(){

            },
            getDrives: function(){
                return drives;
            },
            getFolders: function(){
                return $q(function(resolve){
                    $http.get('folders/' + $rootScope.defaultDrive).then(function(response){
                        folders = response.data;
                        resolve(folders);
                    })
                })
            },
            selectFolder: function(folder){
                selectedFolderName = folder;
            },
            getFolder: function(){
                return selectedFolderName;
            }
        }
    }])