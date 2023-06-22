import "./Error404.scss";
import ErrorImage from "../../assets/404error.png";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";

export default function Error404() {
   return (
      <>
         <div className="error-404" style={{overflow:"hidden"}}>
            <motion.div
               initial={{x:-250,scale:0.6}}
               animate={{x:0,scale:1}}
               transition={{duration:1,type:"spring"}}
               className="error-image"
            >
               <img src={ErrorImage} alt="error image"/>
            </motion.div>
            <motion.div
               initial={{x:150,scale:0.6}}
               animate={{x:0,scale:1}}
               transition={{duration:1,type:"spring"}}
               className="error-404-btn"
            >
               <Link to={"/"}>return home page</Link>
            </motion.div>
         </div>
      </>
   );
}