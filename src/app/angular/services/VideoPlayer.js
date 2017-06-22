app.factory('VideoPlayer', ['FileList', function(FileList){
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
                videoElement.src = '/media-file/' + FileList.getFiles()[index].name;
            },
            getCurrentIndex: function(){
                return currentIndex;
            }

        }
    }])