class VideoFullScreenState{
    constructor(touchPlayerWrapperContext){
        this.touchPlayerWrapperContext = touchPlayerWrapperContext;

        this.left = this.left.bind(this);
        this.right = this.right.bind(this);
        this.up = this.up.bind(this);
        this.down = this.down.bind(this);
        this.ok = this.ok.bind(this);
        this.back = this.back.bind(this);
    }

    left(){
        return this;
    }
    right(){
        return this;
    }
    up(){
        return this;
    }
    down(){
        return this;
    }
    ok(){
        //this.touchPlayerWrapperContext.videoPlayer.play('file:///Users/tomislavhorvaticek/Downloads/Aventura%20-%20Obsesion.mp4');
        return new VideoFullScreenWithPlaylist(this.touchPlayerWrapperContext);
    }
    back(){
        return new VideoFullScreenStateMainMenu(this.touchPlayerWrapperContext)
    }
}