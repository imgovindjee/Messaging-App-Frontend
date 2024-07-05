import { createSlice } from "@reduxjs/toolkit"
import { adminLogOut, adminSignIn, getAdmin } from "../Admin/Admin_AsyncThunks"

import toast from "react-hot-toast"



const initialState = {
    user: null,
    isAdmin: false,
    isLoading: true,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userExists: (state, action) => {
            state.user = action.payload
            state.isLoading = false
        },
        userNotExists: (state) => {
            state.user = null
            state.isLoading = false
        },
        setIsAdmin: (state, action) => {
            state.isAdmin = action.payload
        },
    },

    extraReducers: (builder) => {
        builder.addCase(adminSignIn.fulfilled, (state, action) => {
            state.isAdmin = true;
            console.log(action)
            toast.success(action.payload);
        }).addCase(adminSignIn.rejected, (state, action) => {
            state.isAdmin = false;
            toast.error(action.error.message);
        }).addCase(getAdmin.fulfilled, (state, action) => {
            console.log(action)
            state.isAdmin = true
        }).addCase(getAdmin.rejected, (state, action) => {
            state.isAdmin = false;
        }).addCase(adminLogOut.fulfilled, (state, action) => {
            console.log(action)
            state.isAdmin = false
            toast.success(action.payload);
        }).addCase(adminLogOut.rejected, (state, action) => {
            state.isAdmin = true;
            toast.error(action.error.message);
        })
    }
})



export default authSlice
export const { userExists, userNotExists, setIsAdmin } = authSlice.actions