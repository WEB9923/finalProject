import "./ProfileDetails.scss";
import {NavLink, useNavigate} from "react-router-dom";
import {FiHeart} from "react-icons/fi";
import {RiLogoutBoxLine} from "react-icons/ri";
import userContext from "../../store/UserContext.jsx";
import {useContext} from "react";

// eslint-disable-next-line react/prop-types
export default function ProfileDetails({setShowProfileDetailsMenu}) {
    const context = useContext(userContext);
    const navigate = useNavigate();
    const logOut = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        navigate("/auth");
    }
    return (
        <>
            <div className="profile-details">
                <h3 className="user-name">👋🏼 {context.user.username}</h3>
                <div className="profile-details-wrapper">
                    <NavLink to={"/favorites"} className="favorites-btn" onClick={() => setShowProfileDetailsMenu(false)}>
                        <FiHeart size={22}/> favorites
                    </NavLink>
                    <button className="log-out-btn" onClick={() => logOut()}>
                        <RiLogoutBoxLine size={22}/>
                        log out
                    </button>
                </div>
            </div>
        </>
    );
}