app.directive('toyotaSelectWidget', ['$rootScope', 'VideoPlayer', 'FileList', 'StateManager',  function($rootScope, VideoPlayer, FileList, StateManager){
        return{
            link: function(scope, element, attrs){
                scope.widgets = [
                    {name: 'Maps'},
                    {name: 'Folder select'},
                    {name: 'None'},
                    {name: 'None'}
                ]
                scope.selectedIndex  = 0;
                scope.$watch(attrs.ngShow, function(showAttr){
                    if (showAttr){
                        scope.selectedIndex = VideoPlayer.getCurrentIndex();
                        StateManager.takeOver({
                            name: 'selectWidget',
                            ok: function(){
                                StateManager.back();
                                if (scope.widgets[scope.selectedIndex].name == 'Maps'){
                                    $rootScope.visibleWidget = 'map';
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
                                if (scope.selectedIndex == scope.widgets.length){
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
            template: '<select-list selected-index="selectedIndex" all-items="widgets"></select-list>'
            //template: '<ul><li ng-repeat="file in visibleFiles track by $index" ng-class="{\'selected\': $index== 2}">{{file.name}}</li></ul>'
        }
    }])