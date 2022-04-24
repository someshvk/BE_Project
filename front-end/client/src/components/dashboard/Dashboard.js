import React, { useState } from "react";
import "./dashboard.css";
import { Link, useLocation } from 'react-router-dom';

const Dashboard = () => {
    const location = useLocation();

    const [tabState, setTabState] = useState(location.pathname);

    setTimeout(() => {
        setTabState(location.pathname)
    }, 100);

    const tabsItem = [
        {id: 1, title: 'Home', value:'/home'}, 
        {id: 2, title: 'Profile', value:'/profile'},
        {id: 3, title: 'Verify', value:'/verify'}
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