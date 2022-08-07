import React from "react";
import DateSelector from './DateSelector'
import axios from "axios";
import JourneyResults from "./JourneyResults";
import Pagination from "./Pagination";

class ListJourneys extends React.Component {

    state = {
        result: [],
        renderedResult: [],
        loading: false,
        currentPage: 1,
        postsPerPage: 1000,
        buttonshow: 'none',
        show: ''

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.result !== this.state.result) {
            return this.state.result
        }
    }

    render() {

        const OnSearchSubmit = async (year, month, day) => {
            this.setState({ loading: true })
            await axios.get('http://localhost:3301/get/journeys',
                {
                    params: {
                        year: year,
                        month: month,
                        day: day,
                    }
                }).then((result) => {
                    this.setState({ result: result.data })
                    this.setState({ renderedResult: result.data })
                    this.setState({ loading: false })
                    this.setState({ buttonshow: '' })
                })
        }

        const onFilterDeparture = (entry) => {
            const search = this.state.result.filter(station =>
                station.Departure_station_name.toLowerCase().includes(`${entry.toLowerCase()}`)
            )
            this.setState({ renderedResult: search })
        }

        const onFilterReturn = (entry) => {
            const search = this.state.result.filter(station =>
                station.Return_station_name.toLowerCase().includes(`${entry.toLowerCase()}`)
            )
            this.setState({ renderedResult: search })
        }

        const setResults = () => {
            this.setState({ renderedResult: this.state.result })
        }

        const Paginate = (pageNumber) => {
            this.setState({ currentPage: pageNumber })
        }

        const setResultAmount = (show) => {
            this.setState({ postsPerPage: show })
        }

        const Reset = (reset, buttonShow) => {
            this.setState({ renderedResult: reset })
            this.setState({ buttonshow: buttonShow })

        }

        const sortDurationAsc = () => {
            this.setState({ renderedResult: this.state.renderedResult.sort((a, b) => a.Duration - b.Duration) })

        }

        const sortDurationDesc = () => {
            this.setState({ renderedResult: this.state.renderedResult.sort((a, b) => b.Duration - a.Duration) })

        }

        const sortDistanceAsc = () => {
            this.setState({ renderedResult: this.state.renderedResult.sort((a, b) => a.Covered_distance - b.Covered_distance) })
        }

        const sortDistanceDesc = () => {
            this.setState({ renderedResult: this.state.renderedResult.sort((a, b) => b.Covered_distance - a.Covered_distance) })
        }

        const sortStationAsc = () => {
            this.setState({ renderedResult: [...this.state.renderedResult].sort((a, b) => a.Departure_station_name > b.Departure_station_name ? 1 : -1) })
        }

        const sortStationDesc = () => {
            this.setState({ renderedResult: [...this.state.renderedResult].sort((a, b) => b.Departure_station_name > a.Departure_station_name ? 1 : -1) })
        }

        const sortReturnStationAsc = () => {
            this.setState({ renderedResult: [...this.state.renderedResult].sort((a, b) => a.Return_station_name > b.Return_station_name ? 1 : -1) })
        }

        const sortReturnStationDesc = () => {
            this.setState({ renderedResult: [...this.state.renderedResult].sort((a, b) => b.Return_station_name > a.Return_station_name ? 1 : -1) })
        }

        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPost = this.state.renderedResult.slice(indexOfFirstPost, indexOfLastPost)


        return (
            <div>
                <div className='container'>
                    <DateSelector OnSearchSubmit={OnSearchSubmit}
                        setResultAmount={setResultAmount}
                        Reset={Reset}
                        buttonShow={this.state.buttonshow}
                        onFilterDeparture={onFilterDeparture}
                        onFilterReturn={onFilterReturn}
                        setResults={setResults} />
                </div>
                <div className='ResultOuter' style={{ display: `${this.state.show}` }}>
                    List journeys made with Helsinki City Bikes by selecting a date you wish to view and clicking the 'List journeys' button. <br />
                    You can filter the results and view journeys departing or returning to an individual station by writing it's name in the field and pressing enter</div>


                <JourneyResults result={currentPost}
                    totalPosts={this.state.renderedResult.length}
                    loading={this.state.loading}
                    sortDurationAsc={sortDurationAsc}
                    sortDurationDesc={sortDurationDesc}
                    sortDistanceAsc={sortDistanceAsc}
                    sortDistanceDesc={sortDistanceDesc}
                    sortStationAsc={sortStationAsc}
                    sortStationDesc={sortStationDesc}
                    sortReturnStationAsc={sortReturnStationAsc}
                    sortReturnStationDesc={sortReturnStationDesc} />
                <Pagination postsPerPage={this.state.postsPerPage} totalPosts={this.state.renderedResult.length} Paginate={Paginate} />
            </div>
        )
    }
}

export default ListJourneys;