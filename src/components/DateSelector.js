import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import timesIcon from '../images/times_icon.png';
import axios from 'axios';



class BasicButtonExample extends React.Component {

    state = {
        year: '2021',
        month: 'Month',
        day: 'Day',
        id: 'Station ID',
        show: 1000,
        reset: [],
        buttonShow: 'none',
        entry: '',
        slider: true,
        stationList: []

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.show !== this.state.show) {
            this.props.setResultAmount(this.state.show)
        }
    }


    render() {

        const onFilterStation = (event) => {
            event.preventDefault()
            if (this.state.slider) { this.props.onFilterDeparture(this.state.entry) }
            else { this.props.onFilterReturn(this.state.entry) }

        }

        const OnListJourneys = () => {
            if (this.state.day === 'Month' || this.state.day === 'Day') {
                return alert('You need to select a date first!')
            }
            this.props.OnSearchSubmit(this.state.year, this.state.month, this.state.day,)
        }

        const Reset = () => {
            this.props.Reset(this.state.reset, this.state.buttonShow)
            this.setState({ day: 'Day' })
            this.setState({ show: 1000 })
        }

        const onClickSlider = () => {
            if (this.state.slider) {
                this.setState({ slider: false })
            } else { this.setState({ slider: true }) }

        }

        const openModal = async () => {
            this.props.openModal()
        }


        return (

            <div className="ListJourneys_outer">
                <div className='dateselector'>

                    <div className='daterow_item'>
                        Year
                        <DropdownButton variant="outline-light" size='lg' id="dropdown-basic-button" title={this.state.year}>
                            <Dropdown.Item onClick={() => { this.setState({ year: 2021 }) }}>2021</Dropdown.Item>
                        </DropdownButton>
                    </div>

                    <div className='daterow_item'>
                        Month
                        <DropdownButton variant="outline-light" size='lg' id="dropdown-basic-button" title={this.state.month}>
                            <Dropdown.Item onClick={() => { this.setState({ month: 'May' }) }}>May</Dropdown.Item>
                            <Dropdown.Item onClick={() => { this.setState({ month: 'June' }) }}>June</Dropdown.Item>
                            <Dropdown.Item onClick={() => { this.setState({ month: 'July' }) }}>July</Dropdown.Item>
                        </DropdownButton>
                    </div>

                    <div className='daterow_item'>
                        Day
                        <DropdownButton variant="outline-light" size='lg' id="dropdown-basic-button" title={this.state.day}>
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
                        </DropdownButton>
                    </div>

                    <div className='daterow_item' style={{ minWidth: '100px' }}>
                        Results / page
                        <DropdownButton variant="outline-light" size='lg' id="dropdown-basic-button" title={this.state.show}>
                            <Dropdown.Item onClick={() => { this.setState({ show: 100 }) }}>100</Dropdown.Item>
                            <Dropdown.Item onClick={() => { this.setState({ show: 200 }) }}>200</Dropdown.Item>
                            <Dropdown.Item onClick={() => { this.setState({ show: 500 }) }}>500</Dropdown.Item>
                            <Dropdown.Item onClick={() => { this.setState({ show: 1000 }) }}>1000</Dropdown.Item>
                            <Dropdown.Item onClick={() => { this.setState({ show: 5000 }) }}>5000</Dropdown.Item>
                            <Dropdown.Item onClick={() => { this.setState({ show: 10000 }) }}>10000</Dropdown.Item>
                        </DropdownButton>
                    </div>

                    <div className='daterow_item_slider'>
                        <div>
                            Departure <label className='switch'> <input type="checkbox" onClick={onClickSlider}></input><span className='slider round'></span></label> Return
                        </div>
                        <div className='daterow_item'>
                            <div className='input'>
                                <form onSubmit={onFilterStation}>
                                    <input type='search' onChange={(e) => this.setState({ entry: e.target.value })} placeholder='Filter results..'>
                                    </input>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='listSelector_right'>
                    <div className='daterow_item'>
                        <Button size='lg' onClick={OnListJourneys} variant="outline-light" id='basic-button'>List journeys</Button>
                    </div>
                    <div className='daterow_item_times'>
                        <img className='timesIcon' style={{ display: this.props.buttonShow }} src={timesIcon} alt='Clear search results' onClick={Reset} />
                    </div>
                </div>


                <div className='daterow_item_addjourney'>
                    <Button size='sm' variant="outline-light" id='basic-button'
                        onClick={openModal}>Add a journey</Button>
                </div>

            </div>


        );
    }
}

export default BasicButtonExample;