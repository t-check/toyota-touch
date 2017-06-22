class VideoFileList extends React.Component{
    constructor(props){
        super(props);
        console.log(props);

        this.up = this.up.bind(this);
        this.down = this.down.bind(this);
        this.left = this.left.bind(this);
        this.right = this.right.bind(this);
        this.ok = this.ok.bind(this);
        this.maxVisibleElements = 5;
        this.topVisibleElements = Math.floor(this.maxVisibleElements/2);
        this.files = props.files;
        this.selectedIndex = props.selectedIndex;

        this.state = {selectedIndex: 0};
    }

    up(){
        this.setState({selectedIndex: (this.state.selectedIndex == 0 ? (this.props.files.length -1) : (this.state.selectedIndex-1))});
    }
    down(){
        this.setState({selectedIndex: (this.state.selectedIndex+1)%this.props.files.length});
    }

    left(){
    }

    right(){
    }

    ok(){
        this.props.playVideo(this.state.selectedIndex);
        //this.props.setSelectedIndex(this.state.selectedIndex);
    }



    render(){
        let liElements = [];

        for(var i=0; i<this.maxVisibleElements; i++){
            var startIndex = this.state.selectedIndex - this.topVisibleElements;
            var currentFile = null;

            if(startIndex +i >= this.props.files.length){
                currentFile = this.props.files[(startIndex+i)%(this.props.files.length)];
            }
            else if (startIndex + i >= 0){
                currentFile = this.props.files[startIndex + i];
            } 
            else{
                currentFile = this.props.files[startIndex +i + this.props.files.length];
            }
            liElements.push(<li key={currentFile.idx} value={currentFile.name} className={(this.state.selectedIndex == currentFile.idx ? "selected" : "not-selected")}>{currentFile.name}</li>)
        }

        return <div className={"video-file-list " + (this.props.visible == true ? "visible" : "hidden")}>
            <ul>
                {liElements}
            </ul>
        </div>;

    }

}
