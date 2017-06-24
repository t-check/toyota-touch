app.directive('toyotaSelectWidget', ['$rootScope', 'VideoPlayer', 'FileList', 'StateManager', 'UpdatePlayer',  function($rootScope, VideoPlayer, FileList, StateManager, UpdatePlayer){
        return{
            link: function(scope, element, attrs){
                scope.widgets = [
                    {name: 'Maps'},
                    {name: 'Folder select'},
                    {name: 'Update player'},
                    {name: 'Reboot player'}
                ]
                scope.selectedIndex  = 0;
                $rootScope.$watch(attrs.ngShow, function(showAttr){
                    if (showAttr){
                        StateManager.takeOver({
                            name: 'selectWidget',
                            ok: function(){
                                StateManager.back();
                                if (scope.widgets[scope.selectedIndex].name == 'Maps'){
                                    $rootScope.visibleWidget = 'map';
                                }
                                else if (scope.widgets[scope.selectedIndex].name == 'Folder select'){
                                    $rootScope.visibleWidget = 'folder-select'
                                }
                                else if (scope.widgets[scope.selectedIndex].name == 'Update player'){
                                    UpdatePlayer.update();
                                }
                                else if(scope.widgets[scope.selectedIndex].name == 'Reboot player'){
                                    UpdatePlayer.reboot();
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