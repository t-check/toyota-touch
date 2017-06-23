app.directive('selectList', ['$rootScope',  function($rootScope){
        return{
            link: function(scope, element, attrs){
                scope.selectedIndex  = 0;

                var maxVisibleElements = 5
                var topVisibleElements = Math.floor(maxVisibleElements/2);
                scope.items = [];

                var calculateVisibleItems = function(){
                    if (isNaN(scope.selectedIndex)){
                        scope.selectedIndex = 0;
                    }
                    scope.items = [];
                    if (scope.allItems && scope.allItems.length > 0){
                        for(var i=0; i<maxVisibleElements; i++){
                            var startIndex = scope.selectedIndex - topVisibleElements;
                            var currentFile = null;

                            if(startIndex +i >= scope.allItems.length){
                                currentFile = scope.allItems[(startIndex+i)%(scope.allItems.length)];
                            }
                            else if (startIndex + i >= 0){
                                currentFile = scope.allItems[startIndex + i];
                            } 
                            else {
                                currentFile = scope.allItems[startIndex +i + scope.allItems.length];
                            }
                            scope.items.push(currentFile);
                        }
                    }
                }

                scope.$watch('selectedIndex', function(selectedIndex){
                    //scope.selectedIndex = selectedIndex;
                    calculateVisibleItems();
                })

                scope.$watchCollection('allItems', function(allItems){
                    scope.allItems = allItems;
                    calculateVisibleItems();
                })
            },
            scope:{
                allItems: '=',
                selectedIndex: '='
            },
            template: '<ul><li ng-repeat="item in items track by $index" ng-class="{\'selected\': $index== 2}">{{item.name}}</li></ul>'
        }
    }])