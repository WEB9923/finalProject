import {Outlet} from "react-router-dom";
import Navbar from "../components/navbar/Navbar.jsx";
import Footer from "../components/footer/Footer.jsx";
import {motion, useScroll} from "framer-motion";

export default function Layout() {
    const {scrollYProgress} = useScroll();

    return (
        <>
            <motion.div className="progress" style={{ scaleX: scrollYProgress }} />
            <Navbar/>
            <Outlet/>
            <Footer/>
        </>
    );
}
