import React from "react";
import loadingPic from '../images/Loading.gif'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class StationView extends React.Component {

    state = {
        month: 'Total',
        station_id: this.props.singleStation.map(station => (station.station_id)),
        load: this.props.load,
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.month !== this.state.month) {

            this.props.ChangeMonth(this.state.month)
        }
    }

    render() {

        if (this.props.loading) {
            return <div className='ResultOuter'><img src={loadingPic} alt='Loading symbol' /></div>
        }

        const bike_Id = (singleStation) => {
            var id = `${singleStation[0].station_id}`
            var bikeId = ''
            if (id.length === 1) { bikeId = '00' + id } else if (id.length === 2) { bikeId = '0' + id } else { bikeId = id }
            return (bikeId)
        }

        const x = this.props.singleStation.map(station => (station.x))
        const y = this.props.singleStation.map(station => (station.y))
        const departures = this.props.journeyData.filter(station => station.Departure_station_name == this.props.singleStation[0].Nimi)
        const returns = this.props.journeyData.filter(station => station.Return_station_name == this.props.singleStation[0].Nimi)
        const departureAmount = departures.length
        const returnAmount = returns.length
        const averageDepartDistance = Math.floor(departures.map(station => station.Covered_distance).reduce((a, b) => a + b, 0) / departureAmount)
        const averageReturnDistance = Math.floor(returns.map(station => station.Covered_distance).reduce((a, b) => a + b, 0) / returnAmount)
        const availability = this.props.bikesAvailable.filter(bikes => bikes.stationId == bike_Id(this.props.singleStation))
        const capacity = availability[0].bikesAvailable + availability[0].spacesAvailable
        const available = [...Array(availability[0].bikesAvailable)].map((elem, index) => <div className='bikesAvailable' key={index}>&nbsp;&nbsp;</div>)
        const spacesAvailable = [...Array(availability[0].spacesAvailable)].map((elem, index) => <div className='spacesAvailable' key={index}> &nbsp;&nbsp;</div>)


        return (
            <div>
                <div className='StationView_diviver'>
                    <div className='StationView_divider_left'>
                        {this.props.singleStation.map(station => (
                            <div key={station.id} className='ResultOuter_stationView'>
                                <div className='singlestationRow'><h2 style={{ fontWeight: '600' }}>{station.Nimi} - {station.Namn} </h2></div>
                                <div className='singlestationRow'>{station.Osoite}, {station.Kaupunki}</div>
                                <div className='singlestationRow'></div></div>))}

                        <div className='ResultOuter_stationView'>
                            <div className='singlestationRow'><h2 style={{ fontWeight: '600' }}>Bikes available {availability[0].bikesAvailable} / {capacity}</h2></div>
                            <div className='singlestationRow'><div className='availability'> {available} {spacesAvailable}</div></div>
                            <div className='singlestationRow'></div></div>


                        {this.props.singleStation.map(station => (
                            <div key={station.id} className='ResultOuter_stationView'>


                                <div className='singlestationRow'></div>
                                <div className='singlestationRow'>Number of journeys departing from this station in {this.state.month}: {departureAmount} </div>
                                <div className='singlestationRow'>Number of journeys returning to this station in {this.state.month}: {returnAmount}</div>
                                <div className='singlestationRow'>Average distance for journeys departing from this station in {this.state.month}: {averageDepartDistance}m </div>
                                <div className='singlestationRow'>Average distance for journeys returning to this station in {this.state.month}: {averageReturnDistance}m </div>
                                <div className='singlestationRow_down'><div className='daterow_item_month'>Show data for:
                                    <DropdownButton variant="light" size='sm' id="dropdown-basic-button" title={this.state.month}>
                                        <Dropdown.Item onClick={() => { this.setState({ month: 'Total' }) }}>Total</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ month: 'May' }) }}>May</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ month: 'June' }) }}>June</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ month: 'July' }) }}>July</Dropdown.Item>
                                    </DropdownButton>
                                </div></div>
                            </div>
                        ))}

                    </div>
                    <div>
                        <div className='ResultOuter_stationView_map'>
                            <iframe title='openStreetMap' className='gmaps' src={`https://www.openstreetmap.org/export/embed.html?bbox=${x}%2C${y}%2C${x}%2C${y}&amp;layer=mapnik&amp;marker=${y}%2C${x}`}></iframe>

                        </div>
                    </div>
                </div>
            </div >
        )
    }
}


export default StationView