import React, {useState, useEffect} from "react";
import "./profile.css";

const Profile = ({fileListChanged}) => {

    const [fileList, setFileList] = useState(JSON.parse(localStorage.getItem("fileHashList")));

    useEffect(()=>{
        setFileList(JSON.parse(localStorage.getItem("fileHashList")));
    }, [fileListChanged]);
    return(
        <div className="profile">
            <h1>My Profile</h1>
            <div className="profile_details">
                <span className="files">
                    <h2>Submitted Files</h2>
                    <ul>
                        {
                            fileList.map((files, index) => {
                                return(
                                    <li key={index}>
                                        {files.file}
                                        <span>{files.hash}</span>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </span>
            </div>
        </div>
    );
}

export default Profile;