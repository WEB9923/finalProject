import "./Footer.scss";
import Logo from "../../assets/logo.svg";
import {Link} from "react-router-dom";
import {FaFacebook, FaInstagram, FaTwitter} from "react-icons/fa";

export default function Footer() {
   return (
      <>
         <footer className="footer">
            <div className="container">
               <div className="footer-top">
                  <Link to={"/"} className="logo">
                     <img src={Logo} alt={"logo"}/>
                     <h1>Shopify</h1>
                  </Link>
                  <div className="social">
                     <a href="https://facebook.com" target="_blank" rel="noreferrer" className="fb"><FaFacebook
                        size={25}/></a>
                     <a href="https://twitter.com" target="_blank" rel="noreferrer" className="tw"><FaTwitter
                        size={25}/></a>
                     <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inst"><FaInstagram
                        size={25}/></a>
                  </div>
               </div>
               <div className="footer-cols">
                  <div className="col">
                     <h3>site navigation</h3>
                     <Link to={"/"}>home</Link>
                     <Link to={"/products"}>products</Link>
                     <Link to={"/favorites"}>favorites</Link>
                     <Link to={"/cart"}>cart</Link>
                  </div>
                  <div className="col">
                     <h3>lorem</h3>
                     <p>hello react</p>
                     <p>hello world</p>
                     <p>lorem </p>
                     <p>lorem ipsum dolor</p>
                  </div>
                  <div className="col">
                     <h3>lorem ip</h3>
                     <p>lorem ipsum dolor</p>
                     <p>lorem</p>
                     <p>lorem dolor</p>
                     <p>lorem sit amet</p>
                  </div>
               </div>
               <div className="copyright">
                  <p>this website created with ❤️ && ☕</p>
               </div>
            </div>
         </footer>
      </>
   );
}