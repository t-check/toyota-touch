app.directive('toyotaApp', ['$rootScope', 'StateManager', 'VideoPlayer', function($rootScope, StateManager, VideoPlayer){
        return{
            link: function(scope, element, attrs){
                scope.visibleWidget = '';
                StateManager.takeOver({
                    name: 'root',
                    ok: function(){
                        $rootScope.visibleWidget = 'fileList';
                        //StateManager.moveToState('fileList');
                    },
                    up: function(){
                        $rootScope.playNextVideo();
                    },
                    down: function(){
                        $rootScope.playPreviousVideo();
                    },
                    right: function(){
                        VideoPlayer.getVideoElement().currentTime = VideoPlayer.getVideoElement().currentTime + 10;
                    },
                    left: function(){
                        VideoPlayer.getVideoElement().currentTime = VideoPlayer.getVideoElement().currentTime - 10;
                    }
                });
                /*StateManager.ok = function(){
                    scope.visibleWidget = 'fileList';
                } */        
            },
            template: '<toyota-video-player></toyota-video-player>\
                <toyota-video-file-list ng-show="visibleWidget==\'fileList\'"></toyota-video-file-list>\
                <toyota-map-viewer ng-show="visibleWidget==\'map\'"></toyota-map-viewer>\
                <toyota-select-widget ng-show="visibleWidget==\'selectWidget\'" class="fs-toyota"></toyota-select-widget>\
                <toyota-folder-select-widget ng-show="visibleWidget==\'folder-select\'" class="fs-toyota"></toyota-folder-select-widget>\
                <div>{{visibleWidget}}</div>'
        }
    }])