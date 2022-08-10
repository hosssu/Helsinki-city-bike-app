import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingIcon from '../images/Loading.gif';
import axios from "axios";

class AddJourneyForm extends React.Component {

    state = {
        year: 'Year',
        month: 'Month',
        day: 'Day',
        loading: this.props.loading,
        station: this.props.stationList,
        departure: 'Choose a station',
        departureId: '',
        return: 'Choose a station',
        returnId: '',
        distance: 'Add distance',
        departureTime: '',
        returnTime: '',

    }

    render() {


        const CheckInput = () => {

            return true
        }

        const addJourney = (event) => {
            event.preventDefault()
            if (this.state.departure === 'Choose a station' || this.state.return === 'Choose a station') {
                return alert('Please select departure and return stations!')
            }

            if (this.state.month === 'Month' || this.state.day === 'Day') {
                return alert('Please select a date for your journey!')
            }

            if (this.state.departureTime.substring(0, 2) > 24 ||
                this.state.departureTime.substring(3, 5) > 59 ||
                this.state.returnTime.substring(0, 2) > 24 ||
                this.state.returnTime.substring(3, 5) > 59 ||
                this.state.departureTime.substring(2, 3) !== ':' ||
                this.state.returnTime.substring(2, 3) !== ':' ||
                this.state.departureTime.length > 5 ||
                this.state.returnTime.length > 5) { return alert('Please input time as HH:mm') }

            if (isNaN(this.state.departureTime.substring(0, 2)) ||
                isNaN(this.state.departureTime.substring(3, 5)) ||
                isNaN(this.state.returnTime.substring(0, 2)) ||
                isNaN(this.state.returnTime.substring(3, 5))) {
                return alert('Please input the time using numbers')
            }

            if (isNaN(this.state.distance)) {
                return alert('Please input the distance using numbers')
            }

            if ((this.state.returnTime.substring(0, 2) - this.state.departureTime.substring(0, 2)) < 0 || (this.state.returnTime.substring(3, 5) - this.state.departureTime.substring(3, 5)) < 0) {
                return alert('Nice try, Marty McFly! Please set a return time that is later than departure time.')
            }

            axios.post('https://helsinki-city-bike-app.herokuapp.com/post/station',
                {
                    departure: this.state.departure,
                    departureId: this.state.departureId,
                    return: this.state.return,
                    returnId: this.state.returnId,
                    month: this.state.month,
                    day: this.state.day,
                    distance: this.state.distance,
                    departureTime: this.state.departureTime,
                    returnTime: this.state.returnTime,
                    duration: (this.state.returnTime.substring(0, 2) - this.state.departureTime.substring(0, 2)) * 3600 + (this.state.returnTime.substring(3, 5) - this.state.departureTime.substring(3, 5)) * 60
                }
            )

            this.props.closeModal()
            alert('Journey added!')
        }


        return (
            <> {!this.state.loading ? (
                <form onSubmit={addJourney}>
                    <div className='addJourneyForm_outer'>
                        <h3 style={{ padding: '20px' }}>Add a custom city bike journey</h3>
                        <div className='addJourneyForm_inner' style={{ zIndex: '22' }}>
                            <div className='daterow_item' >Departure station
                                <DropdownButton variant="light" size='lg' id="dropdown-basic-button" title={this.state.departure}>

                                    <div className='addJourneyForm_dropdown'>
                                        {this.state.station.map(station => (<Dropdown.Item key={station.id} onClick={() => { this.setState({ departure: station.Name, departureId: station.station_id }) }}>{station.Name}</Dropdown.Item>))}
                                    </div>
                                </DropdownButton></div>
                        </div>
                        <div className='addJourneyForm_inner' style={{ zIndex: '21' }}>
                            <div className='daterow_item'>Return station
                                <DropdownButton variant="light" size='lg' id="dropdown-basic-button" title={this.state.return}>

                                    <div className='addJourneyForm_dropdown'>
                                        {this.state.station.map(station => (<Dropdown.Item key={station.id} onClick={() => { this.setState({ return: station.Name, returnId: station.station_id }) }}>{station.Name}</Dropdown.Item>))}
                                    </div>
                                </DropdownButton></div>

                        </div>
                        <div className='addJourneyForm_inner' style={{ zIndex: '20' }}>
                            <div className='daterow_item'>
                                Year
                                <DropdownButton variant="light" size='lg' id="dropdown-basic-button" title={this.state.year}>
                                    <Dropdown.Item onClick={() => { this.setState({ year: 2021 }) }}>2021</Dropdown.Item>
                                </DropdownButton>
                            </div>

                            <div className='daterow_item'>
                                Month
                                <DropdownButton variant="light" size='lg' id="dropdown-basic-button" title={this.state.month}>
                                    <Dropdown.Item onClick={() => { this.setState({ month: 'May' }) }}>May</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { this.setState({ month: 'June' }) }}>June</Dropdown.Item>
                                    <Dropdown.Item onClick={() => { this.setState({ month: 'July' }) }}>July</Dropdown.Item>
                                </DropdownButton>
                            </div>

                            <div className='daterow_item'>
                                Day
                                <DropdownButton variant="light" size='lg' id="dropdown-basic-button" title={this.state.day}>
                                    <div className='addJourneyForm_dropdown'>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 1 }) }}>1</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 2 }) }}>2</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 3 }) }}>3</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 4 }) }}>4</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 5 }) }}>5</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 6 }) }}>6</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 7 }) }}>7</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 8 }) }}>8</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 9 }) }}>9</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 10 }) }}>10</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 11 }) }}>11</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 12 }) }}>12</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 13 }) }}>13</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 14 }) }}>14</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 15 }) }}>15</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 16 }) }}>16</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 17 }) }}>17</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 18 }) }}>18</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 19 }) }}>19</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 20 }) }}>20</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 21 }) }}>21</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 22 }) }}>22</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 23 }) }}>23</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 24 }) }}>24</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 25 }) }}>25</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 26 }) }}>26</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 27 }) }}>27</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 28 }) }}>28</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 29 }) }}>29</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 30 }) }}>30</Dropdown.Item>
                                        <Dropdown.Item onClick={() => { this.setState({ day: 31 }) }}>31</Dropdown.Item>
                                    </div>
                                </DropdownButton>
                            </div>
                        </div>


                        <div className='addJourneyForm_inner' style={{ marginTop: '20px' }}>
                            <div className='daterow_item'>Time of departure
                                <div className='input'>
                                    <input type='text' placeholder="e.g., 12:00" onChange={(e) => this.setState({ departureTime: e.target.value })}></input>
                                </div>
                            </div>
                            <div className='daterow_item'>Time of return
                                <div className='input'>
                                    <input type='text' placeholder="e.g., 12:20" onChange={(e) => this.setState({ returnTime: e.target.value })}></input>
                                </div>
                            </div>
                        </div>


                        <div className='addJourneyForm_inner' >
                            <div className='daterow_item'>Distance
                                <div className='input'>
                                    <input type='text' placeholder="Add distance" onChange={(e) => this.setState({ distance: e.target.value })}></input> Meters
                                </div>
                            </div>
                        </div>

                        <div className='addJourneyForm_middle'>
                            <div className='addJourneyForm_inner' >
                                <Button size='lg' type='submit' variant="outline-light" id='basic-button'>Add journey</Button>
                                <Button size='lg' onClick={this.props.closeModal} variant="outline-danger" id='basic-button'>Close</Button>
                            </div>
                        </div>
                    </div>

                </form>

            ) : (<div><img src={LoadingIcon} /></div>)} </>
        )
    }
}

export default AddJourneyForm;