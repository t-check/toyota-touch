app.factory('VideoPlayer', ['FileList', '$rootScope', function(FileList, $rootScope){
        var videoElement = null;
        var getVideoElement = function(){
            return videoElement;
        }
        var setVideoElement = function(element){
            videoElement  = element;
        }
        var currentIndex = 0;
        return {
            getVideoElement: getVideoElement,
            setVideoElement: setVideoElement,
            playVideo: function(index){
                currentIndex = index;
                videoElement.src = '/media-file/' + $rootScope.defaultDrive + '/' + FileList.getFolder() + '/'  + FileList.getFiles()[index].name;
            },
            getCurrentIndex: function(){
                return currentIndex;
            }

        }
    }])