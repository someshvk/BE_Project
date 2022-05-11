import React, {useState, useEffect} from "react";
import "./profile.css";

const Profile = ({reference, fileListChanged}) => {

    const [fileList, setFileList] = useState(JSON.parse(localStorage.getItem("fileHashList")));

    useEffect(()=>{
        setFileList(JSON.parse(localStorage.getItem("fileHashList")));
    }, [fileListChanged]);
    return(
        <div className="profile" id="profile" ref={reference}>
            <h1>My Profile</h1>
            <div className="profile_details">
                <span className="files">
                    <h2>Submitted Files</h2>
                    <ul>
                        {
                            fileList.map((hash, index) => {
                                return(
                                    <li key={index}>
                                        {hash}
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