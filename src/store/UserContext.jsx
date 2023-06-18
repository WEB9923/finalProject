import {createContext} from "react";

const userContext = createContext({
    user:{firstname: "",lastname: "",username:""},
    onUserUpdate: () => {}
});

export default userContext;