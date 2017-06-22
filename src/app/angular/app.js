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
        $rootScope.files = files;
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