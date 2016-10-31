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
                    {idx: 1, name: 'test2'},
                    {idx: 2, name: 'fdas'},
                    {idx: 3, name: 'fdas'},
                    {idx: 4, name: 'gre gfsd'},
                    {idx: 5, name: 'gsdf '},
                    {idx: 6, name: 'fdsgsdf'},
                    {idx: 7, name: 'jzzjtr'},
                    {idx: 8, name: 'jzjtzrj'},
                    {idx: 9, name: 'ztrj jztz'},
                    {idx: 10, name: 'ztrj jjjjtr zjr'},
                    {idx: 11, name: 'test2'},
                    {idx: 12, name: 'test2'},
                    {idx: 13, name: 'test2'},
                    {idx: 14, name: 'test2'},
                    {idx: 15, name: 'test2'},
                    {idx: 16, name: 'test2'},
                    {idx: 17, name: 'test2'},
                    {idx: 18, name: 'test2'},
                    {idx: 19, name: 'test2'},
                    {idx: 20, name: 'test2'},
                    {idx: 21, name: 'test2'},
                    {idx: 22, name: 'test2'},
                    {idx: 23, name: 'test2'},
                    {idx: 24, name: 'test2'},
                    {idx: 25, name: 'test2'},
                ]
            ,videoFullScreenMainMenuGui_visible: false
            ,videoFullScreenWithMapGui_visible: false
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
            this.videoFullScreenWithMap = null
        })
    }

    render(){
        return <div className="touch-player-wrapper">
                <VideoPlayer ref={(e) => this.videoPlayer = e}/>
                <VideoFileList visible={this.state.videoFileList_visible} files={this.state.videoFileList_files} ref={(e) => this.videoFileList=e}/>
                <VideoFullScreenMainMenuGui visible={this.state.videoFullScreenMainMenuGui_visible}/>
                <VideoFullScreenWithMapGui visible={this.state.videoFullScreenWithMapGui_visible} ref={(e)=> this.videoFullScreenWithMap=e}/>
            </div>;
    }
}