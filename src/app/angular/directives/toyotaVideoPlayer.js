app.directive('toyotaVideoPlayer', ['$rootScope', 'VideoPlayer', function($rootScope, VideoPlayer){
        return{
            link: function(scope, element, attrs){
                VideoPlayer.setVideoElement(element.children()[0]);

                VideoPlayer.getVideoElement().onended = function(){
                    $rootScope.playNextVideo();
                    // play next file
                }
            },
            template: '<video autoplay>\
                <source type="video/mp4"/>\
            </video>'
        }
    }])