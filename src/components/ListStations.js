import React from "react";
import axios from "axios";
import StationSelector from "./StationSelector";
import StationResults from "./StationResults";
import StationView from "./StationView";
import hsl_bikesPic from '../images/hsl_bikes.jpg'
import Modal from 'react-modal'
import AddStationForm from "./AddStationForm";



class ListStations extends React.Component {

    state = {
        stationList: [],
        loading: false,
        activeView: false,
        singleStation: [],
        journeyData: [],
        journeyDataAll: [],
        load: false,
        display: '',
        bikesAvailable: []
    }


    render() {


        window.localStorage.removeItem('stationName')
        window.localStorage.removeItem('stationId')

        const listStations = async () => {
            this.setState({ activeView: false })
            this.setState({ loading: true })
            await axios.get('http://localhost:3301/get/stations'
            ).then((result) => {
                this.setState({ stationList: result.data });
            })
            this.setState({ loading: false })
        }

        const searchStations = async (stationName) => {
            this.setState({ activeView: false })
            this.setState({ loading: true })
            await axios.get('http://localhost:3301/get/stations'
            ).then((result) => {
                const search = result.data.filter(stations =>
                    stations.Nimi.toLowerCase().includes(`${stationName.toLowerCase()}`) ||
                    stations.Namn.toLowerCase().includes(`${stationName.toLowerCase()}`) ||
                    stations.Kaupunki.toLowerCase().includes(`${stationName.toLowerCase()}`)
                )
                this.setState({ stationList: search })
                this.setState({ loading: false });
            })
        }

        const graphQLQuery = {
            query: `query {
                bikeRentalStations {
                stationId
                bikesAvailable
                spacesAvailable
                }
              }`
        }

        const viewStation = async () => {
            this.setState({ singleStation: this.state.stationList.filter(station => station.id == window.localStorage.getItem('stationId')) })
            this.setState({ activeView: true, loading: true, display: 'none' })
            await axios.get('http://localhost:3301/get/allstations', {
                params: {
                    station_id: this.state.stationList.filter(station => station.id == window.localStorage.getItem('stationId'))[0].station_id,
                }
            }).then((result) => {
                this.setState({ journeyData: result.data, journeyDataAll: result.data })
            })
            if (window.localStorage.getItem('station_id') > 902) { this.setState({ bikesAvailable: [{ stationId: window.localStorage.getItem('station_id'), bikesAvailable: 0, spacesAvailable: 0 }] }) }
            else {

                await axios('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    data: graphQLQuery
                })
                    .then((res) => {
                        if (res.data.data[0] !== null) {
                            this.setState({ bikesAvailable: res.data.data.bikeRentalStations })
                        }
                    })
            }
            this.setState({ loading: false })
        }



        const sortCityAsc = () => {
            this.setState({ stationList: [...this.state.stationList].sort((a, b) => a.Kaupunki > b.Kaupunki ? 1 : -1) })
        }

        const sortCityDesc = () => {
            this.setState({ stationList: [...this.state.stationList].sort((a, b) => b.Kaupunki > a.Kaupunki ? 1 : -1) })
        }

        const sortStationAsc = () => {
            this.setState({ stationList: [...this.state.stationList].sort((a, b) => a.Nimi > b.Nimi ? 1 : -1) })
        }

        const sortStationDesc = () => {
            this.setState({ stationList: [...this.state.stationList].sort((a, b) => b.Nimi > a.Nimi ? 1 : -1) })
        }

        const sortStationIdAsc = () => {
            this.setState({ stationList: [...this.state.stationList].sort((a, b) => a.station_id - b.station_id) })
        }

        const sortStationIdDesc = () => {
            this.setState({ stationList: [...this.state.stationList].sort((a, b) => b.station_id - a.station_id) })
        }

        const ChangeMonth = async (month, station_id) => {
            if (month == 'May') { month = '5' } else if (month == 'June') { month = 6 } else if (month == 'July') { month = 7 } else { return this.setState({ journeyData: this.state.journeyDataAll }) }
            const filterMonth = this.state.journeyDataAll.filter(station => station.Departure.substring(6, 7) == month)
            this.setState({ journeyData: filterMonth })
        }

        const openModal = async () => {
            this.setState({ loading: true })
            await axios.get('http://localhost:3301/get/stations'
            ).then((result) => {
                this.setState({ stationList: result.data });
                this.setState({ loading: false });
            })
            this.setState({ modal: true })
        }

        const closeModal = () => {
            this.setState({ modal: false })
        }

        return (
            <div><img className='hsl_bikesPic' style={{ display: `${this.state.display}` }} src={hsl_bikesPic} alt='City bike background' />
                <div className='container'>
                    <StationSelector searchStations={searchStations} listStations={listStations} viewStation={viewStation} openModal={openModal} />
                </div>
                <div className='ResultOuter_station' style={{ display: `${this.state.display}` }}>
                    Search for a Helsinki city bike station or list all stations by clicking the 'List all stations' button. <br />
                    If you want to see details of the station and bike availability, select a station from the list and press 'View station info'.<br />
                    To add a custom city bike station, click the 'Add a station' button.</div>
                <div>
                    <Modal className='Modal' overlayClassName="Overlay" isOpen={this.state.modal} onRequestClose={closeModal}>
                        <AddStationForm loading={this.state.loading} closeModal={closeModal} stationList={this.state.stationList} />
                    </Modal>

                    {!this.state.activeView ?
                        <StationResults
                            loading={this.state.loading}
                            results={this.state.stationList}
                            sortCityAsc={sortCityAsc}
                            sortCityDesc={sortCityDesc}
                            sortStationAsc={sortStationAsc}
                            sortStationDesc={sortStationDesc}
                            sortStationIdAsc={sortStationIdAsc}
                            sortStationIdDesc={sortStationIdDesc}

                        /> : <StationView
                            singleStation={this.state.singleStation}
                            bikesAvailable={this.state.bikesAvailable}
                            journeyData={this.state.journeyData}
                            loading={this.state.loading}
                            ChangeMonth={ChangeMonth}
                            load={this.state.load} />}
                </div>

            </div>
        )
    }
}

Modal.setAppElement('#modal')
export default ListStations
