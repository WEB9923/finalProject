import "./Navbar.scss";
import Logo from "../../assets/logo.svg";
import {Link, NavLink} from "react-router-dom";
import {FaRegUserCircle} from "react-icons/fa";
import {FiChevronDown} from "react-icons/fi";
import {RiShoppingCartLine} from "react-icons/ri";
import ProfileDetails from "../profile-details/ProfileDetails.jsx";
import {useState} from "react";
import {HiOutlineBars3BottomRight} from "react-icons/hi2";

export default function Navbar() {
    const [showProfileDetailsMenu,setShowProfileDetailsMenu] = useState(false);
    const [showMobileNavbar,setShowMobileNavbar] = useState(false);

    const handleShowProfileDetailsMenu = () => {
        setShowProfileDetailsMenu(!showProfileDetailsMenu);
        showMobileNavbar && setShowMobileNavbar(false);
    }
    const handleShowMobileNavbar = () => {
        setShowMobileNavbar(!showMobileNavbar);
        showProfileDetailsMenu && setShowProfileDetailsMenu(false);
    }

    return (
        <>
            <nav>
                <div className="container">
                    <Link to={"/"} className="logo">
                        <img src={Logo} alt={"logo"}/>
                        <h1>Shopify</h1>
                    </Link>
                    <div className="right-side">
                        <ul className={`nav-links ${showMobileNavbar && "show-mobile-navbar"}`}>
                            <li className="nav-link-li">
                                <NavLink to={"/"} className="nav-link" onClick={() => setShowMobileNavbar(false)}>
                                    home
                                </NavLink>
                            </li>
                            <li className="nav-link-li">
                                <NavLink to={"/products"} className="nav-link" onClick={() => setShowMobileNavbar(false)}>
                                    products
                                </NavLink>
                            </li>
                        </ul>
                        <div className="cart_profile">
                            <NavLink to={"/cart"} className="cart">
                                <RiShoppingCartLine size={25}/>
                            </NavLink>
                            <button className={`profile ${showProfileDetailsMenu && "touchedActive"}`}
                                    onClick={handleShowProfileDetailsMenu}>
                                <FaRegUserCircle size={25}/>
                                <FiChevronDown size={20}/>
                            </button>
                            {/* USER DETAILS AFTER CLICK NAVBAR SHOW MORE INFO BTN*/}
                            {showProfileDetailsMenu &&
                                <ProfileDetails
                                    setShowProfileDetailsMenu={setShowProfileDetailsMenu}
                                />}
                            <button className={`burger ${showMobileNavbar && "touchedActive"}`} onClick={handleShowMobileNavbar}>
                                <HiOutlineBars3BottomRight size={25}/>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
