app.directive('toyotaFolderSelectWidget', ['$rootScope', 'FileList', 'StateManager',  function($rootScope, FileList, StateManager){
        return{
            link: function(scope, element, attrs){
                scope.selectedIndex  = 0;
                scope.folders = [];
                FileList.getFolders().then(function(d){
                    scope.folders = d;
                })

                $rootScope.$watch(attrs.ngShow, function(showAttr){
                    if (showAttr){
                        FileList.getFolders().then(function(d){
                            scope.folders = d;
                        })
                        StateManager.takeOver({
                            name: 'folder-select',
                            ok: function(){
                                //$rootScope.playVideo(scope.selectedIndex);
                                StateManager.back();
                                FileList.selectFolder(scope.folders[scope.selectedIndex].name);
                                FileList.init().then(function(f){
                                    var shuffleArray = function (array) {
                                        for (var i = array.length - 1; i > 0; i--) {
                                            var j = Math.floor(Math.random() * (i + 1));
                                            var temp = array[i];
                                            array[i] = array[j];
                                            array[j] = temp;
                                        }
                                        return array;
                                    }
                                    $rootScope.files = shuffleArray(f);
                                    $rootScope.selectedFileIndex = 0;
                                    $rootScope.playVideo(0);
                                    //$rootScope.files = f;
                                })
                            },
                            up: function(){
                                scope.selectedIndex--;
                                if (scope.selectedIndex < 0){
                                    scope.selectedIndex = scope.folders.length -1;
                                }
                            },
                            down: function(){
                                scope.selectedIndex++;
                                if (scope.selectedIndex >= scope.folders.length){
                                    scope.selectedIndex = 0;
                                }
                            },
                            left: function(){
                                StateManager.back();
                                $rootScope.visibleWidget = 'selectWidget';
                            },
                            right: function(){
                                var shuffleArray = function (array) {
                                    for (var i = array.length - 1; i > 0; i--) {
                                        var j = Math.floor(Math.random() * (i + 1));
                                        var temp = array[i];
                                        array[i] = array[j];
                                        array[j] = temp;
                                    }
                                    return array;
                                }

                                $rootScope.files = shuffleArray($rootScope.files);
                            }
                        });
                    }
                 })
            },
            scope: {
            },
            template: '<select-list selected-index="selectedIndex" all-items="folders"></select-list>'
            //template: '<ul><li ng-repeat="file in visibleFiles track by $index" ng-class="{\'selected\': $index== 2}">{{file.name}}</li></ul>'
        }
    }])