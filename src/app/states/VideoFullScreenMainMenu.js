class VideoFullScreenStateMainMenu{
    constructor(touchPlayerWrapperContext){
        this.touchPlayerWrapperContext = touchPlayerWrapperContext;

        this.left = this.left.bind(this);
        this.right = this.right.bind(this);
        this.up = this.up.bind(this);
        this.down = this.down.bind(this);
        this.ok = this.ok.bind(this);
        this.back = this.back.bind(this);

        this.touchPlayerWrapperContext.setState({
            videoFullScreenMainMenuGui_visible: true
        });
    }

    left(){
        this.touchPlayerWrapperContext.setState({
            videoFullScreenMainMenuGui_visible: false
        });
        return new Game2048Screen(this.touchPlayerWrapperContext);
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
        this.touchPlayerWrapperContext.setState({
            videoFullScreenMainMenuGui_visible: false
        });
        return new VideoFullScreenWithMap(this.touchPlayerWrapperContext);
        //return this;
    }
    back(){
        this.touchPlayerWrapperContext.setState({
            videoFullScreenMainMenuGui_visible: false
        });
        return new VideoFullScreenState(this.touchPlayerWrapperContext);
    }
}