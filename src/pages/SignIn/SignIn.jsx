import React, { useState } from 'react'

import { Avatar, Stack, Container, Paper, Typography, Button, TextField, IconButton } from '@mui/material';
import { CameraAlt } from '@mui/icons-material'

import { useFileHandler, useInputValidation, useStrongPassword } from '6pp';

import { AvatarVisuallyHidden } from '../../components/StyledComponents/StyeledComponents';
import { emailValidator, usernameValidator } from '../../Utils/Validators/Validators';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { userExists } from '../../redux/Reducers/auth';


// regex for email
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// regex for password
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;



const SignIn = () => {

    // hook for setting up the data in the redux-store
    const dispatch = useDispatch()


    // hooks
    // state to handle which page to show..
    // SIGN-IN or SIGN-UP
    const [isSignIn, setIsSignIn] = useState(true);

    // loading animation
    const [isLoading, setIsLoading] = useState(false)

    // REACT COMPONENTS...
    // validator of for the SIGN-UP
    const name = useInputValidation("")
    const bio = useInputValidation("")
    const email = useInputValidation("", emailValidator);
    const username = useInputValidation("", usernameValidator)
    // const password = useStrongPassword()
    const password = useInputValidation("")

    // Profile_Image setup....
    const avatar = useFileHandler("single")


    // function to handle the change the SIGN0in or sign-up page
    const handleOnClick = () => {
        setIsSignIn((currentVal) => !currentVal)
    }


    // function to handle the signUp
    const handleSignUp = (e) => {
        e.preventDefault();

        setIsLoading(true);
        const loadingToast = toast.loading("Signing up....")


        // validating the data from the user
        // 1. name check
        if (!name || name.length < 3) {
            return toast.error("Enter a valid name, Name must have atleast of 3 character", { id: loadingToast })
        }

        // 2. username check
        if (!username.value || username.value.length < 3) {
            return toast.error("Username must have atleast of 3 Characters", { id: loadingToast })
        }

        // 3. email check
        if (!emailRegex.test(email.value)) {
            return toast.error("Enter a valid email", { id: loadingToast })
        }

        // 4. password check
        if (!password.value || !passwordRegex.test(password.value)) {
            return toast.error("Password must be 8-20 characters long with a numeric, a special Character, letters", { id: loadingToast })
        }


        // making the form-data for the sign-up
        const formData = new FormData()
        formData.append("name", name.value)
        formData.append("username", username.value)
        formData.append("email", email.value)
        formData.append("password", password.value)
        formData.append("avatar", avatar.file)
        formData.append("bio", bio.value)


        // requestig the SERVER FOR THE SAVING THE NEW-USER SIGN-UP DATA
        // only after the cross-valdation
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/user/signup", formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            }
        )
            .then((data) => {
                // console.log(data)
                setIsLoading(false)

                // dispatch(userExists(true))
                dispatch(userExists(data?.data?.user))
                toast.success(data?.data?.message, { id: loadingToast });
            })
            .catch((error) => {
                setIsLoading(false)
                toast.error(error?.response?.data?.message || error?.response?.data?.message || "Something went Wrong, plase try SignUp again", { id: loadingToast })
            })
    }


    // function to handle the signIn
    const handleSignIn = (e) => {
        e.preventDefault();

        setIsLoading(true)
        const loadingToast = toast.loading("Signing In....")


        // Validating the user entered data
        // 1. username check
        if (!username.value || username.value.length < 3) {
            return toast.error("Username must have atleast of 3 Characters", { id: loadingToast })
        }

        // 2. email check
        if (!emailRegex.test(email.value)) {
            return toast.error("Enter a valid email", { id: loadingToast })
        }

        // 3. password check
        if (!password.value || !passwordRegex.test(password.value)) {
            return toast.error("Password must be 8-20 characters long with a numeric, a special Character, letters", { id: loadingToast })
        }


        // HEADER FORMAT FOR SETTING UP THE COOKIES...
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true,
        }

        // Requesting the serevr for the SIGN-IN
        axios.post(import.meta.env.VITE_SERVER_DOMAIN + "/user/signin",
            {
                username: username.value,
                email: email.value,
                password: password.value,
            },
            config
        )
            .then((data) => {
                // console.log(data?.user)
                setIsLoading(false)

                // dispatch(userExists(true))
                dispatch(userExists(data?.data?.user))
                toast.success(data?.data?.message, { id: loadingToast })
            })
            .catch((error) => {
                setIsLoading(false)
                toast.error(error?.response?.data?.message || "Something went Wrong, Please try again", { id: loadingToast })
                console.log(error)
            })
    }






    return (
        <div
            style={{ backgroundImage: "linear-gradient(rgb(185 218 216 / 36%), rgb(22 37 22 / 50%))" }}
        >


            <Container
                component={"main"}
                maxWidth="xs"
                sx={{
                    height: isSignIn ? "100vh" : "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        marginY: 5,
                        padding: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {
                        isSignIn ? (
                            <>
                                <Toaster />

                                <Typography varient="h5">
                                    Sign In
                                </Typography>

                                <form
                                    style={{ width: "100%", marginTop: "1rem", }}
                                    onSubmit={handleSignIn}
                                >
                                    <TextField
                                        required
                                        fullWidth
                                        label="Username"
                                        margin="normal"
                                        varient="outline"
                                        sx={{
                                            "&:hover": {
                                                bgcolor: "rgba(0,0,0,0.04)"
                                            }
                                        }}
                                        value={username.value}
                                        onChange={username.changeHandler}
                                    />

                                    <TextField
                                        required
                                        fullWidth
                                        label="Enter Your Email"
                                        margin="normal"
                                        varient="outline"
                                        sx={{
                                            "&:hover": {
                                                bgcolor: "rgba(0,0,0,0.04)"
                                            }
                                        }}
                                        value={email.value}
                                        onChange={email.changeHandler}
                                    />

                                    <TextField
                                        required
                                        fullWidth
                                        label="Enter Your Password"
                                        type="password"
                                        margin="normal"
                                        varient="outline"
                                        sx={{
                                            "&:hover": {
                                                bgcolor: "rgba(0,0,0,0.04)"
                                            }
                                        }}
                                        value={password.value}
                                        onChange={password.changeHandler}
                                    />

                                    {/* <Button
                                        sx={{
                                            marginTop: "1rem"
                                        }}
                                        varient="contained"
                                        color='primary'
                                        type="submit"
                                        fullWidth
                                    >
                                        Sign In
                                    </Button> */}

                                    <Button variant='contained' fullWidth type='submit' color='primary' sx={{ marginTop: "1rem" }} disabled={isLoading}>
                                        Sign In
                                    </Button>


                                    {/* <Typography textAlign={"center"} m={"1rem"}>
                                        Or
                                    </Typography> */}
                                    <Button
                                        varient="text"
                                        fullWidth
                                        onClick={handleOnClick}
                                        sx={{ "&:hover": { textDecoration: "underline" } }}
                                        disabled={isLoading}
                                    >
                                        Sign Up Indeed
                                    </Button>
                                </form>
                            </>
                        ) : (
                            <>
                                <Toaster />

                                <Typography varient="h5">
                                    Sign Up
                                </Typography>

                                <form
                                    style={{ width: "100%", marginTop: "1rem" }}
                                    onSubmit={handleSignUp}
                                >

                                    <Stack position={"relative"} margin={"auto"} width={"10rem"}>
                                        <Avatar
                                            sx={{
                                                height: "10rem",
                                                width: "10rem",
                                                objectFit: "contain"
                                            }}
                                            src={avatar.preview}
                                        />

                                        <IconButton
                                            sx={{
                                                position: "absolute",
                                                bottom: "0",
                                                right: "0",
                                                color: "white",
                                                bgcolor: "rgba(0, 0, 0, 0.5)",
                                                ":hover": { bgcolor: "rgba(0, 0, 0, 0.7)", },
                                            }}
                                            component="label"
                                        >
                                            <>
                                                <CameraAlt />
                                                <AvatarVisuallyHidden type='file' onChange={avatar.changeHandler} />
                                            </>
                                        </IconButton>
                                    </Stack>
                                    {
                                        avatar.error && (
                                            <Typography m={"1rem auto"} display={"block"} width={"fit-content"} color="error" varient="caption">
                                                {avatar.error}
                                            </Typography>
                                        )
                                    }



                                    <TextField
                                        required
                                        fullWidth
                                        label="Name"
                                        margin="normal"
                                        sx={{
                                            "&:hover": {
                                                bgcolor: "rgba(0,0,0,0.04)"
                                            }
                                        }}
                                        varient="outline"
                                        value={name.value}
                                        onChange={name.changeHandler}
                                    />

                                    <TextField
                                        required
                                        fullWidth
                                        label="Username"
                                        margin="normal"
                                        varient="outline"
                                        value={username.value}
                                        onChange={username.changeHandler}
                                    />
                                    {
                                        username.error && (
                                            <Typography color="error" varient="caption">
                                                {username.error}
                                            </Typography>
                                        )
                                    }

                                    <TextField
                                        required
                                        fullWidth
                                        label="Email"
                                        margin="normal"
                                        varient="outline"
                                        value={email.value}
                                        onChange={email.changeHandler}
                                        sx={{
                                            "&:hover": {
                                                bgcolor: "rgba(0,0,0,0.04)"
                                            }
                                        }}
                                    />
                                    {
                                        email.error && (
                                            <Typography color="error" varient="caption" sx={{ fontSize: "0.8rem" }}>
                                                {email.error}
                                            </Typography>
                                        )
                                    }

                                    <TextField
                                        required
                                        fullWidth
                                        label="Bio"
                                        margin="normal"
                                        varient="outline"
                                        value={bio.value}
                                        onChange={bio.changeHandler}
                                    />

                                    <TextField
                                        required
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        margin="normal"
                                        varient="outline"
                                        value={password.value}
                                        onChange={password.changeHandler}
                                        sx={{
                                            "&:hover": {
                                                bgcolor: "rgba(0,0,0,0.04)"
                                            }
                                        }}
                                    />
                                    {/* {
                                    password.error && (
                                        <Typography color="error" varient="caption">
                                            {password.error}
                                        </Typography>
                                    )
                                } */}

                                    <Button disabled={isLoading} variant='contained' color='primary' fullWidth type='submit' sx={{ marginTop: "1rem" }}>
                                        Sign Up
                                    </Button>

                                    {/* <Typography textAlign={"center"} m={"1rem"}>
                                        Or
                                    </Typography> */}
                                    <Button
                                        varient="text"
                                        fullWidth
                                        onClick={handleOnClick}
                                        sx={{ "&:hover": { textDecoration: "underline" } }}
                                        disabled={isLoading}
                                    >
                                        Sign In Instead
                                    </Button>
                                </form>
                            </>
                        )
                    }

                </Paper>
            </Container>

        </div>
    )
}

export default SignIn
