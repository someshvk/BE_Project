import React from "react";
import "./home.css";
import axios from "axios";

const Home = ({userId}) => {

    const onFileDrop = (e) => {
        const newFile = e.target.files[0].name;
        let path = (window.URL || window.webkitURL).createObjectURL(e.target.files[0]);

        console.log(path)
        if (newFile) {
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

    const copyToClickboard = () => {
        navigator.clipboard.writeText('Hash code');
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
                        <h3>HashCode here</h3>
                        <button className="copy_button" onClick={copyToClickboard}><i className="fa-solid fa-copy"></i></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;