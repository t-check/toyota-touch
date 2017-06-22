class TouchPlayerWrapper extends React.Component{
    constructor(props){
        super(props);

        for(var i=0; i<window.files.length; i++){
            window.files[i].idx = i;
        }

        this.state = {
            visibleState: 'videoplayer',
            video:{
                visible: true
            },
            videourl: ''
            ,videoFileList_visible: false,
            videoFileList_selectedIndex: 0,
            videoFileList_files: window.files
            ,videoFullScreenMainMenuGui_visible: false
            ,videoFullScreenWithMapGui_visible: false
            ,game2048_visible: false
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
            this.game2048 = null;
        })

        this.playFile = this.playFile.bind(this);
        this.playNext = this.playNext.bind(this);
        this.playPrevious = this.playPrevious.bind(this);
        this.setSelectedIndex = this.setSelectedIndex.bind(this);
    }

    setSelectedIndex(index){
        this.setState({videoFileList_selectedIndex: index})
    }

    playFile(index){
        this.videoPlayer.playFile(window.files[index])
        this.setState({videoFileList_selectedIndex: index});
    }

    playNext(){
        this.videoPlayer.playFile(window.files[(this.state.videoFileList_selectedIndex+1)% window.files.length])
        this.setState({videoFileList_selectedIndex: (this.state.videoFileList_selectedIndex+1)% window.files.length});
    }

    playPrevious(){
        this.videoPlayer.playFile(window.files[(this.state.videoFileList_selectedIndex-1)% window.files.length])
        this.setState({videoFileList_selectedIndex: (this.state.videoFileList_selectedIndex-1)% window.files.length});
    }

    render(){
        return <div className="touch-player-wrapper">
                <VideoPlayer ref={(e) => this.videoPlayer = e} files={this.state.videoFileList_files} playNext={this.playNext} playPrevious={this.playPrevious}/>
                <VideoFileList visible={this.state.videoFileList_visible} files={this.state.videoFileList_files} ref={(e) => this.videoFileList=e} playVideo={this.playFile} selectedIndex={this.state.videoFileList_selectedIndex} setSelectedIndex={this.setSelectedIndex}/>
                <VideoFullScreenMainMenuGui visible={this.state.videoFullScreenMainMenuGui_visible}/>
                <VideoFullScreenWithMapGui visible={this.state.videoFullScreenWithMapGui_visible} ref={(e)=> this.videoFullScreenWithMap=e}/>
                <BoardView visible={this.state.game2048_visible} ref={(e)=> this.game2048=e}/>
            </div>;
    }
}