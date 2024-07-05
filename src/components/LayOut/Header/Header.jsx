import React, { Suspense, lazy, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { Box, AppBar, Avatar, Toolbar, Typography, IconButton, Tooltip, Backdrop, Menu } from '@mui/material'
import { Add as AddIcon, Group as GroupIcon, Logout as LogoutIcon, Menu as MenuIcon, Notifications as NotificationsIcon, Search as SearchIcon, VerifiedUser, } from '@mui/icons-material'

import { orange } from '../../../constants/colors'
import Icons from '../../Icons/Icons'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { userNotExists } from '../../../redux/Reducers/auth'
import { useDispatch, useSelector } from 'react-redux'
import { setIsMobileMenu, setIsMoreOption, setIsNewGroup, setIsNotification, setIsSearch } from '../../../redux/Reducers/others'
import { resetNotificationCount } from '../../../redux/Reducers/Chat'


// importing the component using LAZY method....
const Search = lazy(() => import("../../../components/Search/Search"))
const Notification = lazy(() => import("../../../components/Notifications/Notifications"))
const CreateNewGroup = lazy(() => import("../../../components/CreateNewGroup/CreateNewGroup"))








const Header = () => {

    // hook
    // for storing the data in the redux store
    const dispatch = useDispatch();

    // hook that helps to make the NAVIGATION of page possible
    const navigate = useNavigate();

    // getting the Data form the REDUX-STORE
    const { isSearch, isNotification, isNewGroup, isMoreOptions } = useSelector(state => state.others);
    const { notificationCount } = useSelector(state => state.chat);



    // hooks
    // SideBar in MOBILE SCREEN
    // const [mobileView, setMobileView] = useState(false)

    // search toggle
    // const [isSearch, setIsSearch] = useState(false)

    // notification
    // const [notification, setNotification] = useState(false);

    const [showOptions, setShowOptions] = useState(false);
    const [showOptionPositionAnchoeElement, setShowOptionPositionAnchoeElement] = useState(null);


    // function to handle the mobile-click
    const handleMobileClick = (e) => {
        dispatch(setIsMobileMenu(true));
        // setMobileView(currentVal => !currentVal);
    }

    // function to handle the user-search
    const handleSearchIcon = (e) => {
        dispatch(setIsSearch(true));
        // setIsSearch(currentVal => !currentVal);
    }
    const handleNotification = (e) => {
        dispatch(setIsNotification(true));
        dispatch(resetNotificationCount())
        // setNotification(currentVal => !currentVal);
    }

    // function to handle the CREATE-NEW-GROUP...
    const handleCreateNewGroup = (e) => {
        dispatch(setIsNewGroup(true))
    }

    // function to handle the mange group pages...
    const handleNavigateToAllGroupPage = () => {
        navigate("/groups");
    }

    // function to handle the logout 
    const handleLogOut = () => {
        // console.log("logout");

        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/user/logout",
            {
                withCredentials: true,
            }
        )
            .then((data) => {
                // console.log(data)

                dispatch(userNotExists());
                toast.success(data?.data?.message || "User Logged Out successfully")
            })
            .catch((error) => {
                console.log(error);
                toast.error(error?.response?.data?.message || error?.response?.data?._message || "Something went Wrong, please try again")
            })
    }


    // function to handle the open show option
    const handleOpenShowOptions = (e) => {
        dispatch(setIsMoreOption(!isMoreOptions));
    }


    return (
        <>

            <Box sx={{ flexGrow: 1 }} height={"4rem"}>
                <AppBar
                    position="static"
                    sx={{
                        bgcolor: orange
                    }}
                >

                    <Toolbar>
                        <Toaster />

                        <Typography
                            variant='h6'
                            sx={{
                                display: { xs: "none", sm: "block" },
                            }}
                        >
                            Messaging App
                        </Typography>

                        <Box
                            sx={{
                                display: { xs: "block", sm: "none" },
                            }}
                        >
                            <IconButton
                                color="inherit"
                                onClick={handleMobileClick}
                            >
                                <MenuIcon />
                            </IconButton>
                        </Box>

                        <Box sx={{ flexGrow: 1 }} />




                        {/* RIGHT SIDE CORNOR ITEMs */}
                        <Box>

                            {/* search Icon */}
                            <Icons
                                onClick={handleSearchIcon}
                                icon={<SearchIcon />}
                                title={"Search User"}
                            />

                            {/* Add(+) Icon to create a NEW GROUP CHAT*/}
                            <Icons
                                onClick={handleCreateNewGroup}
                                icon={<AddIcon />}
                                title={"Create Group"}
                            />

                            {/* Notification Icon Shower */}
                            <Icons
                                onClick={handleNotification}
                                icon={<NotificationsIcon />}
                                title={"Notifications"}
                                value={notificationCount}
                            />

                            {/* Mange the Groups that are created by the USER[IF YOU ARE THE OWNER{admin}] */}
                            <Icons
                                onClick={handleNavigateToAllGroupPage}
                                icon={<GroupIcon />}
                                title={"Mange Group"}
                            />

                            {/* Handle the LOGOUT.. */}
                            <Icons
                                onClick={handleLogOut}
                                icon={<LogoutIcon />}
                                title={"LogOut"}
                            />

                            {/* Handle the User Profile */}
                            <Icons
                                icon={<VerifiedUser />}
                                title={"Show Profile"}
                                onClick={handleOpenShowOptions}
                            />
                        </Box>

                    </Toolbar>


                </AppBar>
            </Box>




            {/* Components RENDER..... */}
            {
                isSearch && (
                    <Suspense fallback={<Backdrop open />}>
                        <Search />
                    </Suspense>
                )
            }
            {
                isNotification && (
                    <Suspense fallback={<Backdrop open />}>
                        <Notification />
                    </Suspense>
                )
            }
            {
                isNewGroup && (
                    <Suspense fallback={<Backdrop open />}>
                        <CreateNewGroup />
                    </Suspense>
                )
            }

        </>
    )
}

export default Header
