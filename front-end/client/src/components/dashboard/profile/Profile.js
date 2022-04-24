import React, {useState, useEffect} from "react";
import "./profile.css";
import axios from "axios";

const Profile = ({userId}) => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userFileList, setUserFileList] = useState([])

    useEffect(()=>{
        axios.get(`http://localhost:8000/profile/${userId}`)
        .then( res => {
            setUserName(res.data.name);
            setUserEmail(res.data.email);
            setUserFileList(res.data.files);
        });
        return () => {
            console.log("Done");
        }
    }, [userId]);

    return(
        <div className="profile">
            <h1>My Profile</h1>
            <div className="profile_details">
                <span className="name"><b>Name :</b> <span>{userName}</span></span>
                <span className="email"><b>Email :</b> <span>{userEmail}</span></span>
                <span className="files">
                    <h2>Submitted Files</h2>
                    <ul>
                        {
                            userFileList.map((files, index) => {
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