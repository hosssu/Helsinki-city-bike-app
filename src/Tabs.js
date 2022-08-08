import React from "react";
import { useState } from "react";
import Tab1 from './Tabs/Tab1'
import Tab2 from './Tabs/Tab2'
import bikePic from './images/hsl.gif'



const Tabs = () => {

    const [activeTab, setActiveTab] = useState("tab1");

    const handleTab1 = () => {
        setActiveTab("tab1");
    };

    const handleTab2 = () => {
        setActiveTab("tab2");
    };


    return (
        <div className="main">


            <ul className="nav">
                <li className={activeTab === "tab1" ? "active" : ""} onClick={handleTab1}>Journeys</li>
                <li className={activeTab === "tab2" ? "active" : ""} onClick={handleTab2}>Stations</li>
            </ul>
            <div className="main_sub"><div className='title'>Helsinki city bikes</div>
                <a className='bikePic' href='https://kurpizza.testiosoite.com/hsl_city_bike' ><img src={bikePic} className='bikePic' alt='Cycle home!' /></a>
                {activeTab === "tab1" ? <Tab1 /> : <Tab2 />}

            </div>
        </div>

    );
};

export default Tabs;