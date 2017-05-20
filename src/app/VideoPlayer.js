class VideoPlayer extends React.Component{
    constructor(props){
        super(props);
        console.log(props);

        this.up = this.up.bind(this);
        this.down = this.down.bind(this);
        this.left = this.left.bind(this);
        this.right = this.right.bind(this);
        this.ok = this.ok.bind(this);
        this.playFile = this.playFile.bind(this);

        this.state = {selectedIndex: 0};
    }

    up(){
    }
    down(){
    }

    left(){
    }

    right(){
    }

    ok(){

    }

    playFile(file){
        this.videoElement.src = '/media-file/' + file.name;
    }


    render(){
        return <video autoPlay controls ref={(e) => this.videoElement=e}>
            <source src="file:///media/pi/9CC8BB5BC8BB327E/USA/Lana%20Jurcevic%20-%20VRTI%20MI%20SE%20feat.%20Ante%20Cash.mp4" type="video/mp4"/>
        </video>
    }
}