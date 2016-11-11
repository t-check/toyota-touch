class TouchPlayerWrapper extends React.Component{
    constructor(props){
        super(props);

        for(var i=0; i<window.files.length; i++){
            window.files[i].idx = i;
        }

        this.state = {
            video:{
                visible: true
            },
            videourl: ''
            ,videoFileList_visible: false,
            videoFileList_selectedIndex: 0,
            videoFileList_files: window.files
            ,videoFullScreenMainMenuGui_visible: false
            ,videoFullScreenWithMapGui_visible: false
        }

        var state = new VideoFullScreenState(this);
    
        document.body.addEventListener('keypress', function(event){
            console.log(event.keyCode);
            if (event.keyCode == 115 || event.keyCode == 111){
                // s key
                state = state.ok();
            }
            else if(event.keyCode == 119 || event.keyCode == 117){
                // w key
                state = state.up();
            }
            else if(event.keyCode == 97 || event.keyCode == 108){
                // a key
                state = state.left();
            }
            else if (event.keyCode == 114){
                // d key
                state = state.right();
            }
            else if (event.keyCode == 120 || event.keyCode == 100){
                // x key
                state = state.down();
            }
            else if (event.keyCode == 121 || event.keyCode == 98){
                // y key
                state = state.back();
            }

            this.videoPlayer = null;
            this.videoFileList = null;
            this.videoFullScreenWithMap = null;

        })

        this.playFile = this.playFile.bind(this);
    }

    playFile(file){
        this.videoPlayer.playFile(file);
    }

    render(){
        return <div className="touch-player-wrapper">
                <VideoPlayer ref={(e) => this.videoPlayer = e} />
                <VideoFileList visible={this.state.videoFileList_visible} files={this.state.videoFileList_files} ref={(e) => this.videoFileList=e} playVideo={this.playFile}/>
                <VideoFullScreenMainMenuGui visible={this.state.videoFullScreenMainMenuGui_visible}/>
                <VideoFullScreenWithMapGui visible={this.state.videoFullScreenWithMapGui_visible} ref={(e)=> this.videoFullScreenWithMap=e}/>
            </div>;
    }
}