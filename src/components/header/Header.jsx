import "./Header.scss";
import headerImage from "../../assets/banner1.svg";

const obj = {
    image: headerImage,
    title: "title...",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex"
}

export default function Header() {
    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="left-side">
                        <h1 className="header-title">{obj.title}</h1>
                        <p>{obj.text}</p>
                    </div>
                    <div className="right-side">
                        <img src={obj.image} alt={obj.title}/>
                    </div>
                </div>
            </header>
        </>
    );
}

