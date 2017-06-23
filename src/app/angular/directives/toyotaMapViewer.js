app.directive('toyotaMapViewer', ['$rootScope', 'VideoPlayer', 'FileList', 'StateManager',  function($rootScope, VideoPlayer, FileList, StateManager){
        var mapLoaded = false;
        var map = null;
        var lat = 45.793876;
        var lon = 15.9540166;
        var zoom = 16;

        return{
            link: function(scope, element, attrs){
                scope.zoomMapVisible = false;
                $rootScope.$watch(attrs.ngShow, function(showAttr){
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
                                scope.zoomMapVisible = !scope.zoomMapVisible;
                            },
                            up: function(){
                                //lat = lat + 150.55 / (591657550.500000 / Math.pow(2, zoom-1));
                                if (!scope.zoomMapVisible){
                                    map.panBy(0, -200);
                                }
                                else{
                                    zoom++;
                                    map.setZoom(zoom);
                                }

                            },
                            down: function(){
                                if (!scope.zoomMapVisible){
                                    map.panBy(0, 200);
                                }
                                else{
                                    zoom--;
                                    map.setZoom(zoom);
                                }
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
            scope:{},
            template: '<div ng-show="zoomMapVisible" style="z-index: 999;background-color: rgba(0,0,0,0.4);">UP: Zoom in<br/>DOWN: Zoom out<br/>OK: return</div><div id="google-map"></div>'
        }
    }])