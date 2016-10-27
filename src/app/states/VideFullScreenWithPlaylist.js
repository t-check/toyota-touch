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
        return this;
    }
    right(){
        return this;
    }
    up(){
        debugger;
        this.touchPlayerWrapperContext.setState({
            videoFileList_selectedIndex: this.touchPlayerWrapperContext.state.videoFileList_selectedIndex - 1
        });

        return this;
    }
    down(){
        this.touchPlayerWrapperContext.setState({
            videoFileList_selectedIndex: this.touchPlayerWrapperContext.state.videoFileList_selectedIndex + 1
        });

        return this;
    }
    ok(){
        return this;
    }
    back(){
        this.touchPlayerWrapperContext.setState({
            videoFileList_visible: false
        })
        return new VideoFullScreenState(this.touchPlayerWrapperContext);
    }   
}