import React, {useState, useEffect} from "react";
import "./home.css";
// import axios from "axios";
import {create} from 'ipfs-http-client';
import SimpleStorageContract from "../../../contracts/SimpleStorage.json";
import getWeb3 from "../../../getWeb3";

const Home = ({userId}) => {

    const [ipfsHash, setIpfsHash] = useState('');
    const [web3, setweb3] = useState(null);
    const [account, setAccount] = useState(null);

    useEffect(()=>{

    });

    async function ipfsClient() {
        const ipfs = create('https://ipfs.infura.io:5001/api/v0');
        return ipfs;
    }

    const onFileDrop = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const newFile = e.target.files[0];
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(newFile);
        reader.onload = () => console.log("Onload ", Buffer(reader.result));
        reader.onloadend = () => fileUpload(Buffer(reader.result));
    }

    const fileUpload = async (buffer) => {
        const ipfs = await ipfsClient();
        const fileCreated = await ipfs.add(buffer);
        setIpfsHash(fileCreated.path);
        // const fileData = {userId, currentFile};
        // if(fileData){
        //     axios.post("http://localhost:8000/fileupload", fileData)
        //     .then( res => {
        //         alert(res.data.message);
        //     });
        // }
        // else {
        //     alert("invlid file");
        // } 
    }

    const copyToClickboard = () => {
        navigator.clipboard.writeText(ipfsHash);
    }

    return(
        <div className="home">
            <h1>Certify your Documents</h1>
            <div className="home_container">
                <h3>Drag and drop your files in below box to generate hash code.</h3>
                <div className="drop_box">
                    <div className="drop_zone" >
                        <i className="fa-solid fa-cloud-arrow-up"></i>
                        <input type="file" value="" onChange={onFileDrop}/>
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
                        <h3>{ipfsHash}</h3>
                        <button className="copy_button" onClick={copyToClickboard}><i className="fa-solid fa-copy"></i></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;