class VideoFileList extends React.Component{
    constructor(props){
        super(props);
        console.log(props);

        this.up = this.up.bind(this);
        this.down = this.down.bind(this);
        this.left = this.left.bind(this);
        this.right = this.right.bind(this);
        this.ok = this.ok.bind(this);

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

    }

    render(){
        return <div className={"video-file-list " + (this.props.visible == true ? "visible" : "hidden")}>
            <ul>
                {
                    this.props.files.map((file) =>
                    <li key={file.idx} value={file.name} className={(this.state.selectedIndex == file.idx ? "selected" : "not-selected")}>{file.name}</li>
                    )
                }
            </ul>
        </div>;

    }

}
