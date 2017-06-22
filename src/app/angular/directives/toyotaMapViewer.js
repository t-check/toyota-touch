app.directive('toyotaMapViewer', ['$rootScope', 'VideoPlayer', 'FileList', 'StateManager',  function($rootScope, VideoPlayer, FileList, StateManager){
        var mapLoaded = false;
        var map = null;
        var lat = 45.793876;
        var lon = 15.9540166;
        var zoom = 16;

        return{
            link: function(scope, element, attrs){
                scope.$watch(attrs.ngShow, function(showAttr){
                    if (showAttr && !mapLoaded){
                        map = new google.maps.Map(document.getElementById('google-map'), {
                            center: {lat: lat, lng: lon},
                            scrollwheel: false,
                            zoom: zoom
                        });

                        var trafficLayer = new google.maps.TrafficLayer();
                        trafficLayer.setMap(map);

                        mapLoaded = true;
                    }

                    if (showAttr){
                        StateManager.takeOver({
                            name: 'map',
                            ok: function(){
                                StateManager.back();
                                if (scope.widgets[scope.selectedIndex].name == 'Maps'){
                                    $rootScope.visibleWidget = 'map';
                                }
                            },
                            up: function(){
                                //lat = lat + 150.55 / (591657550.500000 / Math.pow(2, zoom-1));
                                
                                map.panBy(0, -200);

                            },
                            down: function(){
                                map.panBy(0, 200);
                            },
                            left: function(){
                                map.panBy(-200, 0);
                            },
                            right: function(){
                                map.panBy(200, 0);
                            }
                        });
                    }
                    
                })

                
            },
            template: '<div id="google-map"></div>'
        }
    }])