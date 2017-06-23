var app = angular.module('toyota', []);

app.run(['$rootScope', 'FileList', 'VideoPlayer', 'StateManager', function( $rootScope, FileList, VideoPlayer, StateManager){
    $rootScope.playNextVideo = function(){
        if ($rootScope.selectedFileIndex == $rootScope.files.length-1){
            $rootScope.selectedFileIndex = 0;
        }
        else{
            $rootScope.selectedFileIndex++;
        }
        $rootScope.playVideo($rootScope.selectedFileIndex);
    }

    $rootScope.playPreviousVideo = function(){
        if ($rootScope.selectedFileIndex == 0){
            $rootScope.selectedFileIndex = $rootScope.files.length-1;
        }
        else{
            $rootScope.selectedFileIndex--;
        }
        $rootScope.playVideo($rootScope.selectedFileIndex);
    }

    FileList.init().then(function(files){
        var shuffleArray = function (array) {
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }
        $rootScope.files = shuffleArray(files);
        $rootScope.selectedFileIndex = 0;
        $rootScope.playVideo = function(index){
            $rootScope.selectedFileIndex = index;
            VideoPlayer.playVideo(index);
        }
        
        $rootScope.playVideo(0);


        document.body.addEventListener('keypress', function(event){
            console.log(event.keyCode);
            if (event.keyCode == 115 || event.keyCode == 111){
                // s key
                StateManager.getState().ok();
                $rootScope.$apply();
            }
            else if(event.keyCode == 119 || event.keyCode == 117){
                // w key
                StateManager.getState().up();
                $rootScope.$apply();
            }
            else if(event.keyCode == 97 || event.keyCode == 108){
                // a key
                StateManager.getState().left();
                $rootScope.$apply();
            }
            else if (event.keyCode == 114){
                // d key
                StateManager.getState().right();
                $rootScope.$apply();
            }
            else if (event.keyCode == 120 || event.keyCode == 100){
                // x key
                StateManager.getState().down();
                $rootScope.$apply();
            }
            else if (event.keyCode == 121 || event.keyCode == 98){
                // y key
                StateManager.back();
                $rootScope.$apply();
            }
        })
    })
}])