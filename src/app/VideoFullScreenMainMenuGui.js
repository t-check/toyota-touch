class VideoFullScreenMainMenuGui extends React.Component{
     constructor(props){
        super(props);
       
    }

    render(){
        return <div className={"video-full-screen-main-menu-gui " + (this.props.visible == true ? "visible" : "hidden")}>
            <div className="google-maps-starter selected">Maps</div>
        </div>;
    }
}