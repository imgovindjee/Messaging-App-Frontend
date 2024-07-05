import { isValidUsername } from "6pp"

// regex for email
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;



export const usernameValidator = (username) => {
    if (!isValidUsername(username)) {
        return (
            { isValid: false, errorMessage: "Username should contain only Numeric or character" }
        )
    }
}


export const emailValidator = (email)=>{
    if(!emailRegex.test(email)){
        return (
            {isValid:false, errorMessage:"Invalid Email"}
        )
    }
}