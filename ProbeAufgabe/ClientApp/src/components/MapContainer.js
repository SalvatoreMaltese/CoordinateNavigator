
import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker  } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%'
};

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,  // Hides or shows the InfoWindow
            activeMarker: {},          // Shows the active marker upon click
            selectedPlace: {}         // Shows the InfoWindow to the selected place upon a marker
        };   
    }


    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onInfoWindowClose = () => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    setCoordinates = (props, marker, e) => {
        //this.setState({ initialPosition : { lat: lat, lng: long }})
        this.onMarkerClick(props, marker, e);
    };
    
    componentDidUpdate() {
       /* if (this.props.actived && this.semaforo === false) {
            var marker = this.refs.map.props.children[0].find(e => e.key == this.props.markerKey);
            marker.props.onClick();
            this.semaforo = true;
        }*/
    }

    render() {
        var marker = {};
        
        var visibleInfo = false;
        if (this.props.actived && !this.state.showingInfoWindow) {

            var mf = this.refs.map.props.children[0].find(e => e.key == this.props.markerKey);
            marker = new this.props.google.maps.Marker({
                position: mf.props.position,
                map: this.refs.map
            });

            visibleInfo = true;

        }
        else if (this.state.showingInfoWindow) {
            marker = this.state.activeMarker;
            visibleInfo = this.state.showingInfoWindow;
        }
        else {
            visibleInfo = false;
        }
        return (
            <Map ref='map'
                google={this.props.google}
                zoom={10}
                style={mapStyles}
                initialCenter={this.props.initialPosition}
                center={this.props.initialPosition}
            >
                {
                    this.props.data.map(unitD => 
                        <Marker
                            position={{ lat: unitD.lat / 10000000, lng: unitD.lon / 10000000  }}
                            key={unitD.unit}
                            name={unitD.gpsT}
                            onClick={this.onMarkerClick}
                        />
                    )
                }
                
                <InfoWindow onClose={this.onInfoWindowClose}

                    marker={marker}
                    visible={visibleInfo}
                >
                    <div>
                        
                    </div>
                </InfoWindow>

               
               
            </Map>

        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCtIwH-7rVZSFzgGdMJyuqiu3xHdZp35Pw'
    
})(MapContainer);

