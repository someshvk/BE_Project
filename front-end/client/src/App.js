import React, {useState} from 'react';
import SignIn from './components/sign-in/SignIn';
import SignUp from './components/sign-up/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import Home from './components/dashboard/home/Home';
import Profile from './components/dashboard/profile/Profile';
import Verify from './components/dashboard/verify/Verify';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";

const App = () => {
  const [user, setLoginUser] = useState({});

  return (
    <div className="app">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css"/>
      { 
        user && user._id ? undefined : <h1>Proof for the existence of your documents.</h1>
      }
      <Router>
        {
          user && user._id ? <Dashboard /> : undefined
        }
        <Routes>
        {/* <Navigate replace to="/signin" /> */}
          <Route path="/" element = {
             user && user._id ? <Home userId={user._id}/> : <SignIn setLoginUser={setLoginUser}/>
          } />
          <Route path="/signin" element = {<SignIn setLoginUser={setLoginUser}/>} />
          <Route path="/signup" element = {<SignUp />} />
          <Route path="/home" element = {
            user && user._id ? <Home userId={user._id}/> : <SignIn setLoginUser={setLoginUser}/> 
          } />
          <Route path="/profile" element = {
            user && user._id ? <Profile userId={user._id}/> : <SignIn setLoginUser={setLoginUser}/> 
          } />
          <Route path="/verify" element = {
            user && user._id ? <Verify userId={user._id}/> : <SignIn setLoginUser={setLoginUser}/> 
          } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import getWeb3 from "./getWeb3";

// class App extends Component {
//   state = { storageValue: 0, web3: null, accounts: null, contract: null };

//   componentDidMount = async () => {
//     try {
//       // Get network provider and web3 instance.
//       const web3 = await getWeb3();

//       // Use web3 to get the user's accounts.
//       const accounts = await web3.eth.getAccounts();

//       // Get the contract instance.
//       const networkId = await web3.eth.net.getId();
//       const deployedNetwork = SimpleStorageContract.networks[networkId];
//       const instance = new web3.eth.Contract(
//         SimpleStorageContract.abi,
//         deployedNetwork && deployedNetwork.address,
//       );

//       // Set web3, accounts, and contract to the state, and then proceed with an
//       // example of interacting with the contract's methods.
//       this.setState({ web3, accounts, contract: instance }, this.runExample);
//     } catch (error) {
//       // Catch any errors for any of the above operations.
//       alert(
//         `Failed to load web3, accounts, or contract. Check console for details.`,
//       );
//       console.error(error);
//     }
//   };

//   runExample = async () => {
//     const { accounts, contract } = this.state;

//     // Stores a given value, 5 by default.
//     await contract.methods.set(1).send({ from: accounts[0] });

//     // Get the value from the contract to prove it worked.
//     const response = await contract.methods.get().call();

//     // Update state with the result.
//     this.setState({ storageValue: response });
//   };

//   render() {
//     if (!this.state.web3) {
//       return <div>Loading Web3, accounts, and contract...</div>;
//     }
//     return (
//       <div className="App">
//         <p>
//           Try changing the value stored on <strong>line 42</strong> of App.js.
//         </p>
//         <div>The stored value is: {this.state.storageValue}</div>
//       </div>
//     );
//   }
// }
