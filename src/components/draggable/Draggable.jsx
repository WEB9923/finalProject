import "./Draggable.scss";
import {motion} from "framer-motion";
import {TopBrandData} from "./TopBrandData.js";
import DraggableElement from "../draggable-element/DraggableElement.jsx";
import {useEffect, useRef, useState} from "react";

const text = {
   hidden: {
      opacity: 0,
      x: "-50vw",
   },
   show: {
      opacity: 1,
      x: 0,
      transition: {type: "spring", stiffness: 100}
   }
}

export default function Draggable() {
   const [width, setWidth] = useState(0);
   const carousel = useRef();

   useEffect(() => {
      const scrollW = carousel.current.scrollWidth;
      const offsetW = carousel.current.offsetWidth;
      console.log(scrollW - offsetW)
      setWidth(scrollW - offsetW);
   }, []);

   return (
      <>
         <section className="draggable">
            <div className="container">
               <motion.h1
                  style={{width: "fit-content"}}
                  variants={text}
                  initial="hidden"
                  animate="show"
               >
                  top brands
               </motion.h1>
               <motion.div
                  ref={carousel} initial={{opacity: 0, y: 150, scale: 0.7}}
                  whileInView={{opacity: 1, y: 0, scale: 1}} transition={{duration: 0.4}}
                  viewport={{once: false}}
                  className="draggable-wrapper"
               >
                  <motion.div
                     drag="x" dragConstraints={{right: 0, left: -width}} whileTap={{cursor: "grabbing"}}
                     className="draggable-carousel"
                  >
                     {TopBrandData.map((brand) => (
                        <DraggableElement key={brand.id} data={brand}/>
                     ))}
                  </motion.div>
               </motion.div>
            </div>
         </section>
      </>
   );
}