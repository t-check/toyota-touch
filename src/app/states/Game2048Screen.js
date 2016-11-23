class Game2048Screen{
    constructor(touchPlayerWrapperContext){
        this.touchPlayerWrapperContext = touchPlayerWrapperContext;

        this.left = this.left.bind(this);
        this.right = this.right.bind(this);
        this.up = this.up.bind(this);
        this.down = this.down.bind(this);
        this.ok = this.ok.bind(this);
        this.back = this.back.bind(this);

        this.touchPlayerWrapperContext.setState({
            game2048_visible: true
        });


    }


    left(){
        this.touchPlayerWrapperContext.game2048.left();
        return this;
    }
    right(){
        this.touchPlayerWrapperContext.game2048.right();
        return this;
    }
    up(){
        this.touchPlayerWrapperContext.game2048.up();
        return this;
    }
    down(){
        this.touchPlayerWrapperContext.game2048.down();
        return this;
    }
    ok(){
        this.touchPlayerWrapperContext.game2048.ok();
        return this;
    }
    back(){
        this.touchPlayerWrapperContext.setState({
            game2048_visible: false
        })
        return new VideoFullScreenState(this.touchPlayerWrapperContext);
    }   
}