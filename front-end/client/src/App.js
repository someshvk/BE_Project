import React, {useRef, useState} from 'react';
import Home from './components/home/Home';
import Verify from './components/verify/Verify';
import TabsMenu from './components/tabsMenu/TabsMenu';
import Profile from './components/profile/Profile';

import './App.css';

const App = () => {
  const homeRef = useRef();
  const verifyRef = useRef();
  const profileRef = useRef();

  const [fileListChanged, setFileListChanged] = useState(false);

  return (
    <div className="app">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css"/>
        <TabsMenu homeRef={homeRef} profileRef={profileRef} verifyRef={verifyRef}/>
        <Home reference={homeRef} setFileListChanged={setFileListChanged} />
        <Verify reference={verifyRef} />
        <Profile reference={profileRef} fileListChanged={fileListChanged} />
    </div>
  );
}

export default App;
