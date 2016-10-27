class VideoFileList extends React.Component{
    constructor(props){
        super(props);
        console.log(props);
    }
    render(){
        return <div className={"video-file-list " + (this.props.visible == true ? "visible" : "hidden")}>
            <ul>
                {
                    this.props.files.map((file) =>
                    <li key={file.idx} value={file.name} className={(this.props.selectedIndex == file.idx ? "selected" : "not-selected")}>{file.name}</li>
                    )
                }
            </ul>
        </div>;

    }

}
