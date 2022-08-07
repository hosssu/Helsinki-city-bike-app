import React from "react";
import LoadingIcon from '../images/Loading.gif';
import arrowDown from '../images/arrowDown.png'
import arrowUp from '../images/arrowUp.png'

const Results = ({ result,
    loading,
    totalPosts,
    sortDurationAsc,
    sortDurationDesc,
    sortDistanceAsc,
    sortDistanceDesc,
    sortStationAsc,
    sortStationDesc,
    sortReturnStationAsc,
    sortReturnStationDesc }) => {

    if (loading) {
        return <div className='ResultOuter_empty'><img src={LoadingIcon} /></div>
    }

    if (result[0] == null) {
        return null
    }

    const ChangeToKm = (value) => {
        var kmeters = value / 1000
        var round = Math.round(kmeters * 10) / 10
        return (round)
    }

    const ChangeToMinutes = (value) => {
        var minutes = value / 60;
        var round = Math.round(minutes * 10) / 10
        return (round)
    }

    console.log(result)
    return (
        <div className='ResultOuter'>
            <div>
                <div className='ResultInner'>
                    Showing {result.length} / {totalPosts} results
                </div>
                <div className='ResultRow'>

                    <div className='result_item_header'> Date</div>
                    <div className='result_item_header'> Departure  <img className='sortArrow' onClick={sortStationAsc} src={arrowDown} /><img className='sortArrow' onClick={sortStationDesc} src={arrowUp} /></div>
                    <div className='result_item_header'> Return <img className='sortArrow' onClick={sortReturnStationAsc} src={arrowDown} /><img className='sortArrow' onClick={sortReturnStationDesc} src={arrowUp} /></div>
                    <div className='result_item_header'> Distance  <img className='sortArrow' onClick={sortDistanceAsc} src={arrowDown} /><img className='sortArrow' onClick={sortDistanceDesc} src={arrowUp} /></div>
                    <div className='result_item_header' >Duration  <img className='sortArrow' onClick={sortDurationAsc} src={arrowDown} /><img className='sortArrow' onClick={sortDurationDesc} src={arrowUp} /></div>
                </div>
                {result.map(journeys => (
                    <div key={journeys.id} className='ResultRow'>
                        <div className='result_item'>{journeys.Departure.substring(8, 10)}.{journeys.Departure.substring(5, 7)}.{journeys.Departure.substring(0, 4)}  </div>
                        <div className='result_item'>{journeys.Departure_station_name}</div>
                        <div className='result_item'>{journeys.Return_station_name}</div>
                        <div className='result_item'>{ChangeToKm(journeys.Covered_distance)}  km</div>
                        <div className='result_item'>{ChangeToMinutes(journeys.Duration)} min </div>
                    </div>
                ))}
            </div>

        </div >


    )

}


export default Results;