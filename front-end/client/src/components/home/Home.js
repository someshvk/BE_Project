import React, { Component } from "react";
import SimpleStorageContract from "../../contracts/SimpleStorage.json";
import getWeb3 from "../../getWeb3";
import {create} from 'ipfs-http-client';

import "./home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { buffer: null, ipfsHash: '', web3: null, accounts: null, contract: null};
    this.onFileDrop = this.onFileDrop.bind(this);
  }

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3();

      const accounts = await web3.eth.getAccounts();

      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      this.setState({ web3, accounts, contract: instance }, this.instantiateContract);
  } catch (error) {
    alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
    console.error(error);
  }
};

instantiateContract = async () => {
  const contract = require("@truffle/contract");
  const simpleStorage = contract(SimpleStorageContract)
  simpleStorage.setProvider(this.state.web3.currentProvider)

  this.state.web3.eth.getAccounts((error, account) => {
    simpleStorage.deployed().then((instance) => {
      this.simpleStorageInstance = instance
      this.setState({ accounts: account[0] })
      // Get the value from the contract to prove it worked.
      return this.state.contract.methods.get.call(account[0])
    }).then((ipfsHash) => {
      // Update state with the result.
      return this.setState({ ipfsHash })
    })
  })
};

onFileDrop(event) {
  event.preventDefault()
  const file = event.target.files[0]
  const reader = new window.FileReader()
  reader.readAsArrayBuffer(file)
  reader.onloadend = () => {
    this.setState({ buffer: Buffer(reader.result) }, this.fileUpload)
    console.log('buffer', this.state.buffer)
  }
}

async ipfsClient() {
  const ipfs = create('https://ipfs.infura.io:5001/api/v0');
  return ipfs;
}

fileUpload = async () => {
  const ipfs = await this.ipfsClient();
  const fileCreated = await ipfs.add(this.state.buffer);
  this.state.contract.methods.set(fileCreated.path).send({from : this.state.accounts})
  const response = await this.state.contract.methods.get().call();

  if(response){
    let fileHashList = JSON.parse(localStorage.getItem("fileHashList"));
    if(fileHashList === null) fileHashList = [];
    localStorage.setItem("hash", JSON.stringify(response));
    fileHashList.push(response);
    localStorage.setItem("fileHashList", JSON.stringify(fileHashList));
  }
  this.props.setFileListChanged(true);

  this.setState({ipfsHash: fileCreated.path});
}

copyToClickboard = () => {
  navigator.clipboard.writeText(this.state.ipfsHash);
}

render() {
  if (!this.state.web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
      <div className="home" id="home" ref={this.props.reference}>
      <h1>Certify your Documents</h1>
      <div className="home_container">
          <h3>Drag and drop your files in below box to generate hash code.</h3>
          <div className="drop_box">
              <div className="drop_zone" >
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                  <input type="file" value="" onChange={this.onFileDrop}/>
                  <span>Drag and Drop your files</span>
              </div>
              <span>OR</span>
              <div className="select_file">       
                  <label htmlFor="file">Select file</label>                   
                  <input type="file" name="files[]" id="file" />
              </div>
          </div>
          <div className="hash_section">
              <h3>Below is the generated hash code of your file.</h3>
              <div className="hash_box">
                  <span>Hash code :</span>
                  {
                    typeof this.state.ipfsHash === "string" ? <h3>{this.state.ipfsHash}</h3> : <h3>-</h3>
                  }
                  <button className="copy_button" onClick={this.copyToClickboard}><i className="fa-solid fa-copy"></i></button>
              </div>
          </div>
      </div>
  </div>
  );
 }
}

export default Home;