import React from "react";
import Button from 'react-bootstrap/Button'
import axios from "axios";

class AddJourneyForm extends React.Component {

    state = {
        stationName: '',
        stationAddress: '',
        stationCity: '',
        x: '',
        y: '',
    }

    render() {


        const addStation = () => {

            if (this.props.stationList.filter((station) => station.Nimi.toLowerCase() === this.state.stationName.toLowerCase())[0] == null) {
                axios.post('http://localhost:3301/post/station',
                    {
                        stationId: (this.props.stationList[this.props.stationList.length - 1].station_id) + 1,
                        stationName: this.state.stationName,
                        stationAddress: this.state.stationAddress,
                        stationCity: this.state.stationCity,
                        x: this.state.x,
                        y: this.state.y
                    })
                this.props.closeModal()
                alert('New station added!')
            }
            else { alert('That station already exists!') }
        }

        return (
            <>
                <form onSubmit={addStation}>
                    <div className='addJourneyForm_outer'>
                        <h3 style={{ padding: '20px' }}>Add a new city bike station</h3>

                        <div className='daterow_item'>Station name
                            <div className='input'>
                                <input type='text' style={{ width: '300px' }} onChange={(e) => this.setState({ stationName: e.target.value })} required value={this.state.stationName}></input>
                            </div>
                        </div>

                        <div className='daterow_item'>Address
                            <div className='input'>
                                <input type='text' style={{ width: '300px' }} onChange={(e) => this.setState({ stationAddress: e.target.value })} required value={this.state.stationAddress}></input>
                            </div>
                        </div>

                        <div className='daterow_item'> City
                            <div className='input'>
                                <input type='text' style={{ width: '300px' }} onChange={(e) => this.setState({ stationCity: e.target.value })} required value={this.state.stationCity}></input>
                            </div>
                        </div>

                        <div className='daterow_item'> Latitude Y*
                            <div className='input'>
                                <input type='text' onChange={(e) => this.setState({ y: e.target.value })} required ></input>
                            </div>
                        </div>

                        <div className='daterow_item'> Longitude X*
                            <div className='input'>
                                <input type='text' onChange={(e) => this.setState({ x: e.target.value })} required ></input>
                            </div>
                        </div>

                        <p className='footnote'>*You can easily acquire the coordinates with e.g., google maps, just by clicking the right mouse button over a location.</p>

                        <div className='addJourneyForm_middle'>
                            <div className='addJourneyForm_inner' >
                                <Button size='lg' onClick={addStation} variant="outline-light" id='basic-button'>Add station</Button>
                                <Button size='lg' onClick={this.props.closeModal} variant="outline-danger" id='basic-button'>Close</Button>
                            </div>
                        </div>
                    </div>
                </form>
            </>
        )
    }
}

export default AddJourneyForm;