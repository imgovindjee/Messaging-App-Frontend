import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import { Navigate } from 'react-router-dom';

import { Container, Paper, Typography, Button, TextField } from '@mui/material';
import { adminSignIn, getAdmin } from '../../../redux/Admin/Admin_AsyncThunks';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { setIsAdmin } from '../../../redux/Reducers/auth';



// const isAdmin = true;



const AdminLogin = () => {

    // retriveing the data from the redux store
    const { isAdmin } = useSelector(state => state.auth);

    // hooks
    // for setting up the store value
    const dispatch = useDispatch()

    // hooks
    const [secretKey, setSecretKey] = useState("");
    // console.log(secretKey);



    // function to handle the Admin Sign in
    const handleSignIn = (e) => {
        e.preventDefault()

        // EDGE Case 
        if (!secretKey) {
            toast.error("Invalid Credentails");
        }

        // making the api request for login
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/admin/signin-admin",
            { secretKey },
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                }
            }
        )
            .then(({ data }) => {
                dispatch(setIsAdmin(true));
                toast.success(data?.message || "Admin Signed in successfully")
            })
            .catch((error) => {
                toast.error(error?.response?.data?.message || error?.response?.data?._message || "Please try again")
            })

        // dispatch(adminSignIn(secretKey))
    }

    useEffect(() => {
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/admin/",
            { withCredentials: true }
        )
            .then(({ data }) => {
                if (data?.admin) {
                    dispatch(setIsAdmin(true))
                } else {
                    dispatch(setIsAdmin(false));
                }
            })
            .catch((error) => {
                return error;
            })
    }, [dispatch]);



    if (isAdmin) {
        return (
            <Navigate to="/admin/dashboard" />
        )
    }


    return (
        <div
            style={{ backgroundImage: "linear-gradient(rgb(185 218 216 / 36%), rgb(22 37 22 / 50%))" }}
        >
            <Toaster />


            <Container
                component={"main"}
                maxWidth="xs"
                sx={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        marginTop: 10,
                        padding: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >


                    <Typography varient="h5">
                        Admin Login
                    </Typography>

                    <form
                        style={{ width: "100%", marginTop: "1rem" }}
                        onSubmit={handleSignIn}
                    >
                        <TextField
                            required
                            fullWidth
                            label="Enter Your Secret Key"
                            type="password"
                            margin="normal"
                            varient="outlined"
                            value={secretKey}
                            onChange={(e) => setSecretKey(e.target.value)}
                        />

                        <Button
                            color='primary'
                            fullWidth
                            sx={{
                                marginTop: "1rem",
                            }}
                            type="submit"
                            variant='contained'
                        >
                            Sign In
                        </Button>

                    </form>


                </Paper>
            </Container>

        </div>
    )
}

export default AdminLogin
