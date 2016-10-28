class VideoFullScreenWithPlaylist{
    constructor(touchPlayerWrapperContext){
        this.touchPlayerWrapperContext = touchPlayerWrapperContext;

        this.left = this.left.bind(this);
        this.right = this.right.bind(this);
        this.up = this.up.bind(this);
        this.down = this.down.bind(this);
        this.ok = this.ok.bind(this);
        this.back = this.back.bind(this);

        this.touchPlayerWrapperContext.setState({
            videoFileList_visible: true
        });


    }


    left(){
        this.touchPlayerWrapperContext.videoFileList.left();
        return this;
    }
    right(){
        this.touchPlayerWrapperContext.videoFileList.right();
        return this;
    }
    up(){
        this.touchPlayerWrapperContext.videoFileList.up();
        return this;
    }
    down(){
        this.touchPlayerWrapperContext.videoFileList.down();
        return this;
    }
    ok(){
        this.touchPlayerWrapperContext.videoFileList.ok();
        return this;
    }
    back(){
        this.touchPlayerWrapperContext.setState({
            videoFileList_visible: false
        })
        return new VideoFullScreenState(this.touchPlayerWrapperContext);
    }   
}