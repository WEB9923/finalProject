import "./ProfileDetails.scss";
import {NavLink} from "react-router-dom";
import {FiHeart} from "react-icons/fi";
import {RiLogoutBoxLine} from "react-icons/ri";

// eslint-disable-next-line react/prop-types
export default function ProfileDetails({username}) {
    return (
        <>
            <div className="profile-details">
                <h3 className="user-name">👋🏼 {username}</h3>
                <div className="profile-details-wrapper">
                    <NavLink to={"/favorites"} className="favorites-btn">
                        <FiHeart size={22}/> favorites
                    </NavLink>
                    <button className="log-out-btn">
                        <RiLogoutBoxLine size={22}/>
                        log out
                    </button>
                </div>
            </div>
        </>
    );
}