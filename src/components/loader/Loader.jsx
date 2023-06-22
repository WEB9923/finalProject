import {PuffLoader} from "react-spinners";

export default function Loader() {
   return (
      <>
         <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            zIndex: "9999999999"
         }}>
            <PuffLoader
               color="#517cd1"
               size={60}
               speedMultiplier={2.5}
            />
         </div>
      </>
   );
}
