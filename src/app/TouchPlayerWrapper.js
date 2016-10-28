class TouchPlayerWrapper extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            video:{
                visible: true
            },
            videoFileList_visible: false,
            videoFileList_selectedIndex: 0,
            videoFileList_files: [
                    {idx: 0, name: 'test'},
                    {idx: 1, name: 'test2'}
                ]
        }

        var state = new VideoFullScreenState(this);
        
        document.body.addEventListener('keypress', function(event){
            
            if (event.keyCode == 115){
                // s key
                state = state.ok();
            }
            else if(event.keyCode == 119){
                // w key
                state = state.up();
            }
            else if(event.keyCode == 97){
                // a key
                state = state.left();
            }
            else if (event.keyCode == 100){
                // d key
                state = state.right();
            }
            else if (event.keyCode == 120){
                // x key
                state = state.down();
            }
            else if (event.keyCode == 121){
                // y key
                state = state.back();
            }

            this.videoPlayer = null;
            this.videoFileList = null;
        })
    }

    render(){
        return <div className="touch-player-wrapper">
                <VideoPlayer ref={(e) => this.videoPlayer = e}/>
                <VideoFileList visible={this.state.videoFileList_visible} files={this.state.videoFileList_files} ref={(e) => this.videoFileList=e}/>
            </div>;
    }
}