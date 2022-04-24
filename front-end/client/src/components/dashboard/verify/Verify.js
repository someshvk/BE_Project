import React, {useState} from 'react';
import './verify.css';
import axios from "axios";

const Verify = ({userId}) => {

    const [isVerified, setIsVerified] = useState(undefined);
    const [isNeutral, setIsNeutral] = useState(true);

    const onFileDrop = (e) => {
        const newFile = e.target.files[0].name;
        if (newFile) {
            verifyFile(newFile);
        }
    }

    const verifyFile = (currentFile) => {
        const fileData = {userId, currentFile};
        if(fileData){
            axios.post("http://localhost:8000/verify", fileData)
            .then( res => {
                setIsNeutral(false);
                setIsVerified(res.data.verified);
            });
        }
        else {
            alert("invlid file");
        } 
    }

    const copyToClickboard = () => {
        navigator.clipboard.writeText('Hash code');
    }

    return (
        <div className="verify">
            <h1>Verify your Documents</h1>
            <div className="verify_container">
                <h3>Drag and drop your files in below box to verify if the document is already notarized.</h3>
                <div className="verify_drop_box">
                    <div className="verify_drop_zone" >
                        <i className="fa-solid fa-cloud-arrow-up"></i>
                        <input type="file" value="" onChange={onFileDrop}/>
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
                        <h3>-</h3>
                        <button className="verify_copy_button" onClick={copyToClickboard}><i className="fa-solid fa-copy"></i></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Verify;