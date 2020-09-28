
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

        this.click = false;
    }


    onMarkerClick = (props, marker, e) => {
        this.click = true;

        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
        
    }


    onInfoWindowClose = () => {
        this.click = false;
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };
    
    componentDidUpdate() {
      
    }
    
    
    render() {
        
        
        var selectedmarker = {};
        var selectedData = null;
        var content = '';
        var visibleInfo = false;

        if (this.props.actived && !this.click) {

            var mapcurrent = new this.props.google.maps.Map(this.refs.map.mapRef.current, {
                zoom: 13,
                center: this.props.initialPosition
            })

            var markers = [];
            this.props.data.forEach(item => {
                var marker = new this.props.google.maps.Marker({
                    position: {
                        lat: item.lat / 10000000,
                        lng: item.lon / 10000000
                    },
                    label: item.unit,
                    map: mapcurrent
                });
                marker.addListener("click", () => this.onMarkerClick({ name: item.unit }, marker, {} ));
                markers.push(marker);
            })

            selectedmarker = markers.find(e => e.position.equals(new this.props.google.maps.LatLng(this.props.markerKey.lat, this.props.markerKey.lng)))
            selectedData = this.props.data.find(e => e.lat / 10000000 === this.props.markerKey.lat && e.lon / 10000000 === this.props.markerKey.lng);
            
            content = selectedData.unit;
            visibleInfo = true;
            this.click = false;
            //this.props.google.maps.event.trigger(selectedmarker, 'click');
        } 
        /*else if (this.state.showingInfoWindow) {
            selectedmarker = this.state.activeMarker;
            this.visibleInfo = this.state.showingInfoWindow;
        }
        else {
            this.visibleInfo = false;
            
        }*/

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
                            name={unitD.unit}
                            onClick={this.onMarkerClick}
                        />
                    )
                }
                
                <InfoWindow onClose={this.onInfoWindowClose}

                    marker={this.click ? this.state.activeMarker : selectedmarker}
                    visible={this.click ? this.state.showingInfoWindow : visibleInfo}
                >
                    <div>
                        {this.click ? this.state.selectedPlace.name : content}
                        {/*{(selectedData !== null) ? selectedData.unit : this.state.selectedPlace.name}*/}
                    </div>
                </InfoWindow>

               
               
            </Map>

        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCtIwH-7rVZSFzgGdMJyuqiu3xHdZp35Pw'
    
})(MapContainer);

