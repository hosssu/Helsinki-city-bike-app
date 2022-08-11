import React from "react";
import LoadingIcon from '../images/Loading.gif';
import arrowUp from '../images/arrowUp.png'
import arrowDown from '../images/arrowDown.png'
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
        window.localStorage.setItem('station_id', stationId[0].station_id)
        setActiveStation(stationId[0].id)

    }


    return (
        <div>
            <div className='ResultOuter_station' >
                <div>
                    <div className='ResultInner'>
                        Showing {results.length} results.
                    </div>
                    <div className='ResultInner'>Sort stations by
                        name:<img className='sortArrow' onClick={sortStationAsc} src={arrowDown} /><img className='sortArrow' onClick={sortStationDesc} src={arrowUp} />
                        station id: <img className='sortArrow' onClick={sortStationIdAsc} src={arrowDown} /><img className='sortArrow' onClick={sortStationIdDesc} src={arrowUp} />
                        City: <img className='sortArrow' onClick={sortCityAsc} src={arrowDown} /><img className='sortArrow' onClick={sortCityDesc} src={arrowUp} />
                    </div>
                    <div className='ResultRow_station'>
                        {results.map(stations => (
                            <div key={stations.id} className={activeStation === stations.id ? 'station_result_item_active' : 'station_result_item'} onMouseOver={() => setHover(stations.id)} onClick={selectStation}><p className='station_item'> {stations.Nimi} </p>{stations.Osoite}, {stations.Kaupunki}</div>
                        ))}
                    </div>
                </div>

            </div >

        </div >


    )

}


export default StationResults;