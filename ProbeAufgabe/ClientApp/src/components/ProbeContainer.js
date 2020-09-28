import React, { Component } from 'react';
import MapX, { MapContainer } from './MapContainer';
import { CoordinatesData } from './CoordinatesData';

export class ProbeContainer extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            posmsg: [],
            init: { lat: 8, lng: 45 },
            selectedCoordinate: false,
            unit: 0
        };
        //this.MapRef = React.createRef();
    }

    componentDidMount() {
        this.populateData();
        
    }

    changedCoordinate = (lat, lng, unit) => {
       
        this.setState({ selectedCoordinate: true, init: { lat: lat, lng: lng }, unit: unit });
        
        /*this.MapRef.current.setState({
            selectedPlace: {
                name: 'jkjkjk'
            },
            activeMarker: {
                lat: lat, lng: lng
            },
            showingInfoWindow: true
        });*/
        //MapContainer.setCoordinates({
       /* this.refs.MapRef.mapRef.current.setCoordinates({
            selectedPlace: {
                name: 'jkjkjk'
            }
        }, {
            lat: lat, lng: lng
        }, {}
        )*/
    
        
    }

    render() {
       
        return (  
            <div className="d-md-flex h-md-100 align-items-center" >
                <div className="col-md-6 p-0 bg-indigo h-md-100">
                    <CoordinatesData
                        changed={this.changedCoordinate}
                        data={this.state.posmsg}
                    />
            </div>
                {/* <MapX ref={instance}/> */}
                
                {/* <MapContainer initialCenter={this.state.initialCoordinates} /> */}
                <div className="col-md-6 p-0 bg-white h-md-100 loginarea">
                    <MapX ref='MapRef' initialPosition={this.state.init}
                        actived={this.state.selectedCoordinate}
                        markerKey={this.state.unit}
                        data={this.state.posmsg} />  
                </div>
            </div>

        );
    }

    async populateData() {
        const response = await fetch('posmsgs');
        const data = await response.json();
        this.setState({ posmsg: data });
        this.setState({ init: { lat: data[0].lat / 10000000, lng: data[0].lon / 10000000} }) 
    }
    
}
