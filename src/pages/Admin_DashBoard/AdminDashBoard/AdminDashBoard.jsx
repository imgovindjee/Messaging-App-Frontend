import React, { useEffect, useState } from 'react'

import axios from 'axios'

import { DoughnutChart, LineChart } from '../Chart/Chart'
import moment from 'moment'

import { Skeleton, Box, Button, Container, Paper, Stack, Typography } from '@mui/material'
import { AdminPanelSettings as AdminPanelSettingsIcon, Group as GroupIcon, Message as MessageIcon, Notifications as NotificationsIcon, Person as PersonIcon } from '@mui/icons-material'

import PageInitialLayOutLoader from "../../../components/Loaders/PageInitialLoader/PageInitialLayOutLoader"
import AdminLayOut from '../AdminLayOut/AdminLayOut'
import { CurvedButton, SearchField } from '../../../components/StyledComponents/StyeledComponents'
import { chartColor, orange } from '../../../constants/colors'




const defaultDataStaructure = {
    groupsCount: 0,
    messagesCount: 0,
    totalChatsCount: 0,
    usersCount: 0,
    lastSevenDaysMessaage: []
}



const AdminDashBoard = () => {

    // data to be render
    const [stats, setStats] = useState(defaultDataStaructure)
    // console.log(stats)

    // loading amination effect
    const [isLoading, setIsLoading] = useState(true);


    // API DATA FETCHING
    useEffect(() => {
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/admin/stats",
            { withCredentials: true }
        )
            .then(({ data }) => {
                // console.log(data);
                // destructuring the data
                const { stats } = data;

                setStats(stats);
                setIsLoading(false)
            })
            .catch((error) => {
                setIsLoading(false)
                console.log(error)
            })
    }, []);




    // components type-1
    const AppBar = (
        <Paper
            elevation={3}
            sx={{
                padding: "2rem", margin: "2rem 0", borderRadius: "1rem"
            }}
        >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
                <AdminPanelSettingsIcon sx={{ fontSize: "3rem", color: "grey" }} />


                <SearchField
                    placeholder='Search'
                />
                <CurvedButton>
                    Search
                </CurvedButton>



                {/* STYLING SEPERATION */}
                <Box flexGrow={1} />



                {/* data Display */}
                <Typography
                    color={"rgba(0,0,0,0.7)"}
                    textAlign={"center"}
                    display={{
                        xs: "none",
                        lg: "block",
                    }}
                >
                    {moment().format("dddd, D MMMM YYYY")}
                </Typography>
                <NotificationsIcon />
            </Stack>
        </Paper>
    )

    // components type-2
    const Widgets = (
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent={"center"} alignItems={"center"} margin={"2rem 0"} spacing={"2rem"}>
            <Widget title={"Users"} value={stats?.usersCount} icon={<PersonIcon />} />
            <Widget title={"Chats"} value={stats?.totalChatsCount} icon={<GroupIcon />} />
            <Widget title={"Messages"} value={stats.messagesCount} icon={<MessageIcon />} />
        </Stack>
    )



    return (
        <AdminLayOut >
            {
                isLoading ? (
                    <Skeleton height={"100%"}/>
                ) : (
                    <Container component={"main"}>

                        {/* TOP BAR */}
                        {AppBar}


                        {/* CENTER BODY */}
                        <Stack
                            flexWrap={"wrap"}
                            sx={{ gap: "2rem" }}
                            direction={{
                                xs: "column",
                                lg: 'row',
                            }}
                            justifyContent={"center"}
                            alignItems={{
                                xs: "center",
                                lg: "stretch",
                            }}
                        >

                            {/* height: "25rem", */}
                            <Paper elevation={3} sx={{ padding: "2rem 3.5rem", width: "100%", maxWidth: "40rem", borderRadius: "1rem", }}>
                                <Typography margin={"2rem 0"} variant='h4'>
                                    Last Messages
                                </Typography>

                                <LineChart dataArray={stats?.lastSevenDaysMessaage} />
                            </Paper>




                            <Paper elevation={3} sx={{ padding: "1rem", borderRadius: "1rem", display: "flex", justifyContent: "center", alignItems: 'center', width: { xs: "100%", sm: "50%" }, position: "relative", width: "100%", maxWidth: "25rem" }}>
                                {/* Dougnut Chart */}
                                <DoughnutChart
                                    labels={["Single Chats", "Group Chats"]}
                                    value={[stats?.totalChatsCount - stats?.groupsCount, stats?.groupsCount]}
                                />


                                <Stack direction={"row"} position={"absolute"} spacing={"0.5rem"} justifyContent={"center"} alignItems={"center"} width={"100%"} height={"100%"}>
                                    <GroupIcon sx={{ color: orange }} />

                                    <Typography>
                                        vs
                                    </Typography>

                                    <PersonIcon sx={{ color: chartColor }} />
                                </Stack>
                            </Paper>

                        </Stack>


                        {/* LOWER SECTION */}
                        {/* WIDGETS */}
                        {Widgets}


                    </Container>
                )
            }
        </AdminLayOut >
    )
}











// WEDIGETS COMPONENTS
const Widget = ({ title, value, icon }) => {
    return (
        <Paper elevation={3} sx={{ padding: "1rem", margin: '2rem 0', width: "20rem", borderRadius: "1.3rem" }}>

            <Stack alignItems={"center"} spacing={"1rem"}>
                <Typography
                    sx={{
                        color: "rgba(0,0,0,0.5)",
                        borderRadius: "50%",
                        width: "5rem",
                        height: '5rem',
                        border: "5px solid rgba(0,0,0,0.7)",
                        display: 'flex',
                        alignItems: "center",
                        justifyContent: 'center',
                    }}
                >
                    {value}
                </Typography>
                <Stack direction={"row"} alignItems={"center"} spacing={"0.3em"}>
                    {icon}

                    <Typography>
                        {title}
                    </Typography>
                </Stack>

            </Stack>

        </Paper>
    )
}













export default AdminDashBoard
