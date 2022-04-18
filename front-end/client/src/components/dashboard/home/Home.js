import React, { useRef, useState } from "react";
import "./home.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCloud } from '@fortawesome/react-fontawesome';
import axios from "axios";

const Home = ({userId}) => {
    // const wrapperRef = useRef(null);

    const onFileDrop = (e) => {
        const newFile = e.target.files[0].name;
        if (newFile) {
            // const updatedList = [...fileList, newFile];
            // setFileList(updatedList);
            fileUpload(newFile);
        }
    }

    const fileUpload = (currentFile) => {
        const fileData = {userId, currentFile};
        if(fileData){
            axios.post("http://localhost:8000/fileupload", fileData)
            .then( res => {
                alert(res.data.message);
            });
        }
        else {
            alert("invlid file");
        } 
    }

    return(
        <div className="home">
            <h1>Home</h1>
            <div className="drop_box">
                <div className="drop_zone" >
                    {/* <FontAwesomeIcon icon="fa-solid fa-cloud-arrow-up" /> */}
                    <input type="file" value="" onChange={onFileDrop}/>
                    <span>Drag and Drop your files</span>
                </div>
                <span>OR</span>
                <div className="select_file">       
                    <label htmlFor="file">Select file</label>                   
                    <input type="file" name="files[]" id="file" />
                </div>
            </div>
            <div className="hash_box">
                <h1>Hash Code Here</h1>
            </div>
        </div>
    );
}

export default Home;