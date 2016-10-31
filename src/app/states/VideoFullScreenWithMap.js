class VideoFullScreenWithMap{
    constructor(touchPlayerWrapperContext){
        this.touchPlayerWrapperContext = touchPlayerWrapperContext;

        this.left = this.left.bind(this);
        this.right = this.right.bind(this);
        this.up = this.up.bind(this);
        this.down = this.down.bind(this);
        this.ok = this.ok.bind(this);
        this.back = this.back.bind(this);


        this.touchPlayerWrapperContext.setState({
            videoFullScreenWithMapGui_visible: true
        });

        this.touchPlayerWrapperContext.videoFullScreenWithMap.activate();
    }

    left(){
        this.touchPlayerWrapperContext.videoFullScreenWithMap.left();
        return this;
    }
    right(){
        this.touchPlayerWrapperContext.videoFullScreenWithMap.right();
        return this;
    }
    up(){
        this.touchPlayerWrapperContext.videoFullScreenWithMap.up();
        return this;
    }
    down(){
        this.touchPlayerWrapperContext.videoFullScreenWithMap.down();
        return this;
    }
    ok(){
        this.touchPlayerWrapperContext.videoFullScreenWithMap.ok();
        return this;
    }
    back(){
        this.touchPlayerWrapperContext.setState({
            videoFullScreenWithMapGui_visible: false
        });
        return new VideoFullScreenState(this.touchPlayerWrapperContext);
    }
}