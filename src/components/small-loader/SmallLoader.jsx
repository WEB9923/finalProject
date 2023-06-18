import {ClipLoader} from "react-spinners";


export default function SmallLoader() {
    return (
        <>
            <ClipLoader
                color="#e3e3ff"
                size={20}
                speedMultiplier={1}
            />
        </>
    );
}