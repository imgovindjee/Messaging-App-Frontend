import { Stack, Typography, styled } from '@mui/material'
import React from 'react'
import { useLocation, Link as LinkComponent } from 'react-router-dom'
import { Dashboard as DashboardIcon, DeveloperBoard, ExitToApp as ExitToAppIcon, Groups as GroupsIcon, ManageAccounts as ManageAccountsIcon, Message as MessageIcon } from "@mui/icons-material";
import { useDispatch } from 'react-redux';
import { adminLogOut } from '../../../../redux/Admin/Admin_AsyncThunks';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { setIsAdmin } from '../../../../redux/Reducers/auth';



// STYLED COMPONENTS
const Link = styled(LinkComponent)`
    border-radius: 2rem;
    padding: 1rem 2rem;
    color: black;
    text-decoration: none;
    &:hover{
        color: rgba(0,0,0,0.4);
    }
`;


// SIDE BAR TABS
const adminTabs = [
    {
        name: "DashBoard",
        path: "/admin/dashboard",
        icon: <DashboardIcon />,
    },
    {
        name: "Users",
        path: "/admin/user-management",
        icon: <ManageAccountsIcon />,
    },
    {
        name: "Chats",
        path: "/admin/chat-management",
        icon: <GroupsIcon />,
    },
    {
        name: "Messages",
        path: "/admin/message-management",
        icon: <MessageIcon />,
    },
    {
        name: "Developer",
        path: "/admin/about-developer",
        icon: <DeveloperBoard />,
    }
]



const SideBar = ({ w = "100%" }) => {

    // hook
    // for setting up the redux-store value
    const dispatch = useDispatch()

    // accessing the location
    const location = useLocation()


    // function to handle the logOut
    const handleLogOut = (e) => {
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/admin/logout-admin",
            { withCredentials: true }
        )
        .then(({ data }) => {
            dispatch(setIsAdmin(false))
            toast.success(data?.message || "Logged out successfully")
        })
        .catch((error) => {
            toast.error(error?.response?.data?.message || error?.response?.data?._message || "Please try again")
        })

        // dispatch(adminLogOut());
    }


    return (
        <Stack width={w} direction={"column"} p={"1rem"} spacing={"3rem"}>
            <Toaster/>

            <Typography textTransform={"uppercase"} variant='h5' textAlign={"center"} >
                Messaging  App
            </Typography>

            <Stack spacing={"0rem"}>
                {
                    adminTabs.map((tab, index) => {
                        return (
                            <Link
                                key={index}
                                to={tab?.path}
                                sx={
                                    location?.pathname === tab?.path && ({
                                        bgcolor: "black",
                                        color: "white",
                                        "&:hover": {
                                            color: "rgba(248, 248, 248, 0.9)",
                                        }
                                    })
                                }
                            >
                                <Stack
                                    direction={"row"}
                                    spacing={"1rem"}
                                    alignItems={"center"}
                                >
                                    {tab?.icon}

                                    <Typography fontSize={"1rem"}>
                                        {tab?.name}
                                    </Typography>
                                </Stack>
                            </Link>
                        )
                    })
                }

                <Link onClick={handleLogOut}>
                    <Stack
                        direction={"row"}
                        spacing={"1rem"}
                        alignItems={"center"}
                    >
                        <ExitToAppIcon />

                        <Typography fontSize={"1.2rem"}>
                            Logout
                        </Typography>
                    </Stack>
                </Link>
            </Stack>


        </Stack>
    )
}

export default SideBar
