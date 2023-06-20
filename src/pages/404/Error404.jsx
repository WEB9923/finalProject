import "./Error404.scss";
import ErrorImage from "../../assets/404error.png";
import {Link} from "react-router-dom";

export default function Error404() {
    return (
        <>
            <div className="error-404">
                <div className="error-image">
                    <img src={ErrorImage} alt="error image"/>
                </div>
                <div className="error-404-btn">
                    <Link to={"/"}>return home page</Link>
                </div>
            </div>
        </>
    );
}