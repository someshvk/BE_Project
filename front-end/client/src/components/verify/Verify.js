import React, { Component } from "react";
import SimpleStorageContract from "../../contracts/SimpleStorage.json";
import getWeb3 from "../../getWeb3";
import {create} from 'ipfs-http-client';
import Hash from 'ipfs-only-hash';

import "./verify.css";

class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = { buffer: null, ipfsHash: '', web3: null, accounts: null, contract: null, isVerified: false , isNeutral: true};
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
//   const ipfs = await this.ipfsClient();
  const hashOfFile = await Hash.of(this.state.buffer);

  const response = await this.state.contract.methods.get().call();

//   this.setState({ipfs});

  if (response  === hashOfFile){
    this.setState({isVerified: true, isNeutral: false});
  }
  else{
    this.setState({isVerified: false, isNeutral: false});
  }
}

copyToClickboard = () => {
  navigator.clipboard.writeText(this.state.ipfsHash);
}

render() {
  if (!this.state.web3) {
    return <div>Loading Web3, accounts, and contract...</div>;
  }
  return (
    <div className="verify" id="verify" ref={this.props.reference}>
    <h1>Verify your Documents</h1>
    <div className="verify_container">
        <h3>Drag and drop your files in below box to verify if the document is already notarized.</h3>
        <div className="verify_drop_box">
            <div className="verify_drop_zone" >
                <i className="fa-solid fa-cloud-arrow-up"></i>
                <input type="file" value="" onChange={this.onFileDrop}/>
                <span>Drag and Drop your files</span>
            </div>
            <span>OR</span>
            <div className="verify_select_file">       
                <label htmlFor="file">Select file</label>                   
                <input type="file" name="files[]" id="file" />
            </div>
        </div>
        <div className="verify_hash_section">
            {
                isNeutral ? undefined 
                : 
                isVerified ? <h3 style={{ color : 'green' }}>Hurray! The file is already notarized. Below are the details,</h3>
                :
                <h3 style={{ color : 'red' }}>Sorry! The file is not notarized, notarize first and then try.</h3>
            }
            <div className={
                isNeutral ? "verify_hash_box" : isVerified  ? 'verified verify_hash_box' : 'unverified verify_hash_box'
                }>
                <span>Hash code :</span>
                <h3>{this.state.ipfsHash}</h3>
                <button className="verify_copy_button" onClick={this.copyToClickboard}><i className="fa-solid fa-copy"></i></button>
            </div>
        </div>
    </div>
    </div>
  );
 }
}

export default Verify;