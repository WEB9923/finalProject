import {Outlet} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import userContext from "./store/UserContext.jsx";
import {useEffect, useState} from "react";

function App() {
   const [user, setUser] = useState({user: {firstname: "", lastname: "", username: ""}});
   useEffect(() => {
      const user = localStorage.getItem("user");
      if (user) {
         const parsedUser = JSON.parse(user);
         handleUserUpdate({
            firstname: parsedUser.firstname,
            lastname: parsedUser.lastname,
            username: parsedUser.username
         });
      }
   }, []);

   const handleUserUpdate = (user) => {
      setUser(user);
   }
   return (
      <userContext.Provider value={{user, onUserUpdate: handleUserUpdate}}>
         <>
            <Outlet/>
            <ToastContainer limit={2}/>
         </>
      </userContext.Provider>
   )
}

export default App
