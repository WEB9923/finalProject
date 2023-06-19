import {toast} from "react-toastify";

export function SuccessToaster(message) {
    toast(message, {
        type: "success",
        position: "bottom-left",
        style: {backgroundColor: "#cecee6",color:"#92b84e",fontWeight:"700"},
        progressStyle:{backgroundColor:"#92b84e"},
        delay:0
    });
}

export function ErrorToaster(message) {
    toast(message, {
        type: "error",
        position: "bottom-left",
        style: {backgroundColor: "#cecee6",color:"#d95a5a",fontWeight:"700"},
        progressStyle:{backgroundColor:"#d95a5a"},
        delay:0
    });
}
