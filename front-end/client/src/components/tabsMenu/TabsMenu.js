import React, { useState} from "react";
import "./tabsMenu.css";

const TabsMenu = ({homeRef, verifyRef, profileRef}) => {

    const [tab, setTab] = useState('home');

    const scroll = (reference) => {
        reference.current.scrollIntoView({ behavior: 'smooth' });
        // console.log(reference.current.className)
        setTab(reference.current.className);
    }

    return (
        <div className="tab_menu">
            <div className="tab_box">
                <ul>
                    <li className={ tab === 'home' ? 'tabs active' : 'tabs'} onClick={()=>scroll(homeRef)}>Home</li>
                    <li className={ tab === 'verify' ? 'tabs active' : 'tabs'} onClick={()=>scroll(verifyRef)}>Verify</li>
                    <li className={ tab === 'profile' ? 'tabs active' : 'tabs'} onClick={()=>scroll(profileRef)}>Profile</li>
                </ul>
            </div>
        </div>
    );
}

export default TabsMenu;