class TouchPlayerWrapper extends React.Component{
    render(){
        return <div className="touch-player-wrapper">
            {this.props.children}
        </div>
    }
}