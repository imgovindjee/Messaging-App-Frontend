
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const adminSignIn = createAsyncThunk("admin", async (secretKey) => {

    try {
        const { data } = await axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/admin/signin-admin",
            { secretKey },
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
        return data.admin;
    }
    catch (error) {
        throw error.response.data.message;
    }

    // .then(({ data }) => {
    //     console.log(data)
    //     return data?.message;
    // })
    // .catch((error) => {
    //     throw error.response.data.message;
    // })
})


const getAdmin = createAsyncThunk("admin/getAdmin", () => {
    axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/admin/",
        { withCredentials: true }
    )
        .then(({ data }) => {
            console.log(data)
            return data.admin ? true : false;
        })
        .catch((error) => {
            throw error.response.data.message;
        })
})

const adminLogOut = createAsyncThunk("admin/LogOut", () => {
    axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/admin/logout-admin",
        { withCredentials: true }
    )
        .then(({ data }) => {
            return data?.message;
        })
        .catch((error) => {
            throw error.response.data.message;
        })
})


export { adminSignIn, getAdmin, adminLogOut }