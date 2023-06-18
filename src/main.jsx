import ReactDOM from 'react-dom/client'
import './index.scss'
import Routes from "./routes/Routes.jsx";
import {RouterProvider} from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={Routes}/>
)

