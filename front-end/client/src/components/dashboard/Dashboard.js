import React, { useState } from "react";
import "./dashboard.css";
import { Link, useLocation } from 'react-router-dom';

const Dashboard = () => {
    const location = useLocation();

    const [tabState, setTabState] = useState(location.pathname);

    const tabsItem = [
        {id: 1, title: 'Home', value:'/home'}, 
        {id: 2, title: 'Profile', value:'/profile'},
    ];

    return (
        <div className="tab_menu">
            <div className="tab_box">
                <ul>
                    {
                    tabsItem.map((tab, index) => {
                        return(
                            <Link key={index} to={tab.value} style={{ textDecoration: 'none' }}>
                                <li className={tab.value === tabState ? 'tabs active' : 'tabs'} onClick={() => setTabState(tab.value)}>{tab.title}</li>
                            </Link>
                        );
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default Dashboard;