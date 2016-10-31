class VideoFullScreenWithMapGui extends React.Component{
     constructor(props){
        super(props);
        this.isActive = false;
        this.map = null;
        this.lon = 15.9540166;
        this.lat = 45.793876;
        this.zoom = 16;

        this.activate = this.activate.bind(this);
        this.up = this.up.bind(this);
        this.down = this.down.bind(this);
        this.left = this.left.bind(this);
        this.right = this.right.bind(this);
        this.ok = this.ok.bind(this);
    }
    

    activate(){
        if (this.isActive == false){
            this.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: this.lat, lng: this.lon},
            scrollwheel: false,
            zoom: this.zoom
            });

             var trafficLayer = new google.maps.TrafficLayer();
            trafficLayer.setMap(this.map);
        }
    }


    up(){
        this.lat = this.lat + (1/(Math.pow(this.zoom, 2)/2));
        this.map.panTo(new google.maps.LatLng(this.lat, this.lon));
    }
    down(){
        this.lat = this.lat - (1/(Math.pow(this.zoom, 2)/2));
        this.map.panTo(new google.maps.LatLng(this.lat, this.lon));
    }

    left(){
        this.lon = this.lon - (1/(Math.pow(this.zoom, 2)/8));
        this.map.panTo(new google.maps.LatLng(this.lat, this.lon));
    }

    right(){
        this.lon = this.lon + (1/(Math.pow(this.zoom, 2)/8));
        this.map.panTo(new google.maps.LatLng(this.lat, this.lon));
    }

    ok(){

    }

    render(){
        return <div className={"video-full-screen-with-map " + (this.props.visible == true ? "visible" : "hidden")}>
            <div className="google-maps-map" id="map"></div>
        </div>;
    }
}