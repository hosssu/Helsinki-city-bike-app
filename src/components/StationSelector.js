import React from "react";
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

class StationSelector extends React.Component {

    state = {
        stationName: '',
        selectedStation: '',

    }

    render() {

        var originalSetItem = localStorage.setItem;
        localStorage.setItem = function () {
            const event = new Event('storage');
            originalSetItem.apply(this, arguments);
            document.dispatchEvent(event);
        }

        const localStorageSetHandler = (e) => {
            this.setState({ selectedStation: window.localStorage.getItem('stationName') })
        };

        document.addEventListener("storage", localStorageSetHandler, false);


        const searchStations = (event) => {
            event.preventDefault()
            this.props.searchStations(this.state.stationName)
        }

        const listStations = (event) => {
            event.preventDefault();
            this.props.listStations()
        }

        const handleclick = () => {
            if (window.localStorage.getItem('stationName') == null) {
                return alert('You need to select a station first.')
            }
            this.props.viewStation()
        }



        return (
            <div className="ListJourneys_outer" >
                <div className='dateselector'>

                    <div className='daterow_item'>
                        <div className='input'>
                            <form onSubmit={searchStations}>
                                <input type='search' onChange={(e) => this.setState({ stationName: e.target.value })} placeholder='Search for a station...'>
                                </input>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='listSelector_left'>
                    <div className='daterow_item'>
                        <Button size='lg' variant='outline-light' id='basic-button' onClick={listStations}>List all stations</Button>
                    </div></div>



                <div className='listSelector_right'>
                    <div className='daterow_item'>Selected station: {window.localStorage.getItem('stationName')}</div>
                    <div className='daterow_item'><Button size='lg' variant='outline-light' id='basic-button' onClick={handleclick}>View station info</Button> </div>
                </div>





            </div >
        )
    }
}



export default StationSelector;