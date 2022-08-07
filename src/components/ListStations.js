import React from "react";
import axios from "axios";
import StationSelector from "./StationSelector";
import StationResults from "./StationResults";
import StationView from "./StationView";


class ListStations extends React.Component {

    state = {
        stationList: [],
        loading: false,
        activeView: false,
        singleStation: [],
        journeyData: [],
        journeyDataAll: [],
        load: false,
        display: ''
    }


    render() {

        window.localStorage.removeItem('stationId')
        window.localStorage.removeItem('stationName')

        const listStations = async () => {
            this.setState({ activeView: false, display: '' })
            this.setState({ loading: true })
            await axios.get('http://localhost:3301/get/stations'
            ).then((result) => {
                this.setState({ stationList: result.data });
                this.setState({ loading: false });
                console.log(this.state.activeView)
            })
        }

        const searchStations = async (stationName) => {
            this.setState({ activeView: false, show: 'none' })
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
            this.setState({ loading: false })
        }

        const ChangeMonth = async (month, station_id) => {
            if (month == 'May') { month = '5' } else if (month == 'June') { month = 6 } else if (month == 'July') { month = 7 } else { return this.setState({ journeyData: this.state.journeyDataAll }) }
            const filterMonth = this.state.journeyDataAll.filter(station => station.Departure.substring(6, 7) == month)
            this.setState({ journeyData: filterMonth })

        }


        return (
            <div>
                <div className='container'>
                    <StationSelector searchStations={searchStations} listStations={listStations} viewStation={viewStation} />
                </div>
                <div className='ResultOuter' style={{ display: `${this.state.display}` }}>
                    Search for Helsinki City Bike station or list all stations by clickig the 'List all stations' button. <br />
                    If you want to see details of the station, select a station from the list by clicking it and then press 'View station info'.</div>

                <div>
                    {!this.state.activeView ?
                        <StationResults results={this.state.stationList}
                            sortCityAsc={sortCityAsc}
                            sortCityDesc={sortCityDesc}
                            sortStationAsc={sortStationAsc}
                            sortStationDesc={sortStationDesc}
                            sortStationIdAsc={sortStationIdAsc}
                            sortStationIdDesc={sortStationIdDesc}
                        /> : <StationView singleStation={this.state.singleStation}
                            journeyData={this.state.journeyData}
                            loading={this.state.loading}
                            ChangeMonth={ChangeMonth}
                            load={this.state.load} />}
                </div>
            </div>
        )
    }
}

export default ListStations
