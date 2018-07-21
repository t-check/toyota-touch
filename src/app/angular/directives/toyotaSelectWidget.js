app.directive('toyotaSelectWidget', ['$rootScope', '$timeout', 'VideoPlayer', 'FileList', 'StateManager', 'UpdatePlayer',  function($rootScope, $timeout, VideoPlayer, FileList, StateManager, UpdatePlayer){
        return{
            link: function(scope, element, attrs){
                scope.widgets = [
                    {name: 'Maps'},
                    {name: 'Folder select'},
                    {name: 'Update player'},
                    {name: 'Reboot player'},
                    {name: 'Get new songs'}
                ]
                scope.selectedIndex  = 0;
                let checkStatus = function() {
                    $timeout(function() {
                        UpdatePlayer.getSongStatus().then(function(r) {
                            if (!r.downloadComplete) {
                                scope.widgets[4].name = 'Get new songs - ' + r.downloadedSongs + '/' + r.songsToDownload;
                                checkStatus();
                            }
                            else {
                                scope.$apply(function() {
                                    scope.widgets[4].name = 'Get new songs';
                                });
                            }
                        });
                    }, 1000);
                }
                $rootScope.$watch(attrs.ngShow, function(showAttr){
                    if (showAttr){
                        StateManager.takeOver({
                            name: 'selectWidget',
                            ok: function(){
                                
                                if (scope.widgets[scope.selectedIndex].name == 'Maps'){
                                    StateManager.back();
                                    $rootScope.visibleWidget = 'map';
                                }
                                else if (scope.widgets[scope.selectedIndex].name == 'Folder select'){
                                    StateManager.back();
                                    $rootScope.visibleWidget = 'folder-select'
                                }
                                else if (scope.widgets[scope.selectedIndex].name == 'Update player'){
                                    StateManager.back();
                                    UpdatePlayer.update();
                                }
                                else if(scope.widgets[scope.selectedIndex].name == 'Reboot player'){
                                    StateManager.back();
                                    UpdatePlayer.reboot();
                                }
                                else if(scope.widgets[scope.selectedIndex].name == 'Get new songs'){
                                    UpdatePlayer.getNewSongs();
                                    checkStatus();
                                }
                            },
                            up: function(){
                                scope.selectedIndex--;
                                if (scope.selectedIndex < 0){
                                    scope.selectedIndex = scope.widgets.length -1;
                                }
                            },
                            down: function(){
                                scope.selectedIndex++;
                                if (scope.selectedIndex >= scope.widgets.length){
                                    scope.selectedIndex = 0;
                                }
                            },
                            left: function(){
                            },
                            right: function(){
                            }
                        });
                    }
                 })

            },
            scope: {},
            template: '<select-list selected-index="selectedIndex" all-items="widgets"></select-list>'
            //template: '<ul><li ng-repeat="file in visibleFiles track by $index" ng-class="{\'selected\': $index== 2}">{{file.name}}</li></ul>'
        }
    }])