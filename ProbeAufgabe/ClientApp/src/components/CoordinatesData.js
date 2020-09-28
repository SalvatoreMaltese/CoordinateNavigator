import React, { Component } from 'react';


export class CoordinatesData extends Component {
    //static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { coordinates: [], loading: true };
    }

    
   
 
    entry = (lat, lng, unit) => {
        this.props.changed(lat, lng, unit);
    }

    render() {
       /* let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : CoordinatesData.renderTable(this.state.coordinates);
            */
        //let contents = CoordinatesData.renderTable(this.state.coordinates);
        return (
            <div className="table-wrapper-scroll-y my-custom-scrollbar">
                <h1 id="tabelLabel" >Coordinates</h1>
                <p></p>
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Unit</th>
                            <th>Gps Timestamp</th>
                            <th>Milage</th>

                        </tr>
                    </thead>
                    <tbody>
                        {this.props.data.map(unitD =>
                            <tr onClick={() => this.entry(unitD.lat / 10000000, unitD.lon / 10000000, unitD.unit)}
                                key={unitD.unit}>
                                <td>{unitD.unit}</td>
                                <td>{unitD.gpsT}</td>
                                <td>{unitD.mil}</td>
                           
                        </tr>
                    )} 
                       
                       
                    </tbody>
                </table>
            </div>
        );
    }

    
}
