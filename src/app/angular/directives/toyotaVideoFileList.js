app.directive('toyotaVideoFileList', ['$rootScope', 'VideoPlayer', 'FileList', 'StateManager',  function($rootScope, VideoPlayer, FileList, StateManager){
        return{
            link: function(scope, element, attrs){
                scope.selectedIndex  = 0;
                scope.isRandomized = true;
                $rootScope.$watch(attrs.ngShow, function(showAttr){
                    if (showAttr){
                        scope.selectedIndex = VideoPlayer.getCurrentIndex();
                        StateManager.takeOver({
                            name: 'fileList',
                            ok: function(){
                                $rootScope.playVideo(scope.selectedIndex);
                                StateManager.back();
                            },
                            up: function(){
                                scope.selectedIndex--;
                                if (scope.selectedIndex < 0){
                                    scope.selectedIndex = $rootScope.files.length -1;
                                }
                            },
                            down: function(){
                                scope.selectedIndex++;
                                if (scope.selectedIndex == $rootScope.files.length){
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
                                if (scope.isRandomized){
                                    $rootScope.files.sort(function(a,b){
                                        if (a.name.toLowerCase()[0] > b.name.toLowerCase()[0]){
                                            return 1
                                        }
                                        else{
                                            return -1;
                                        }
                                    });
                                    scope.isRandomized = false;
                                }
                                else{
                                    $rootScope.files = shuffleArray($rootScope.files);
                                    scope.isRandomized = true;
                                }
                            }
                        });
                    }
                 })
            },
            scope: {
            },
            template: '<select-list selected-index="selectedIndex" all-items="$parent.files"></select-list>'
            //template: '<ul><li ng-repeat="file in visibleFiles track by $index" ng-class="{\'selected\': $index== 2}">{{file.name}}</li></ul>'
        }
    }])