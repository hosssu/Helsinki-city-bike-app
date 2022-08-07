import React from "react";
import LoadingIcon from '../images/Loading.gif';
import arrowDown from '../images/arrowDown.png'
import arrowUp from '../images/arrowUp.png'
import { useState } from "react";

const StationResults = ({ results,
    loading,
    sortCityAsc,
    sortCityDesc,
    sortStationAsc,
    sortStationDesc,
    sortStationIdAsc,
    sortStationIdDesc

}) => {

    const [hover, setHover] = useState('')
    const [activeStation, setActiveStation] = useState(false)



    if (loading) {
        return <div className='ResultOuter_empty'><img src={LoadingIcon} /></div>
    }

    if (results[0] == null) {
        return null
    }

    const selectStation = () => {
        const stationId = results.filter(stations => { return stations.id === hover })
        window.localStorage.setItem('stationId', stationId[0].id)
        window.localStorage.setItem('stationName', stationId[0].Nimi)
        setActiveStation(stationId[0].id)

    }


    return (
        <div>
            <div className='ResultOuter' >
                <div>
                    <div className='ResultInner'>
                        Showing {results.length} results
                    </div>
                    <div className='ResultRow'>
                        <div className='station_result_item_header'> City <img className='sortArrow' onClick={sortCityAsc} src={arrowDown} /><img className='sortArrow' onClick={sortCityDesc} src={arrowUp} /></div>
                        <div className='station_result_item_header'> Station <img className='sortArrow' onClick={sortStationAsc} src={arrowDown} /><img className='sortArrow' onClick={sortStationDesc} src={arrowUp} /></div>
                        <div className='station_result_item_header'> Address </div>
                        <div className='station_result_item_header'> Station id <img className='sortArrow' onClick={sortStationIdAsc} src={arrowDown} /><img className='sortArrow' onClick={sortStationIdDesc} src={arrowUp} /></div>

                    </div>
                    {results.map(stations => (
                        <div key={stations.id} className='ResultRow'>
                            <div className='station_result_item'>{stations.Kaupunki}</div>
                            <div className={activeStation === stations.id ? 'station_result_item_active' : 'station_result_item'} onMouseOver={() => setHover(stations.id)} onClick={selectStation}>{stations.Nimi}/{stations.Namn}</div>
                            <div className='station_result_item'>{stations.Osoite}</div>
                            <div className='station_result_item'>{stations.station_id}</div>
                        </div>
                    ))}
                </div>

            </div >

        </div>


    )

}


export default StationResults;