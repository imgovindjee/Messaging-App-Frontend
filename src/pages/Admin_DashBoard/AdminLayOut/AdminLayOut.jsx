import { Box, Drawer, Grid, IconButton } from '@mui/material'
import React, { useState } from 'react'
import SideBar from './SideBar/SideBar'
import { grayColor } from '../../../constants/colors'
import { Close as CloseIcon, Menu as MenuIcon } from '@mui/icons-material'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'



// const isAdmin = true;


const AdminLayOut = ({ children }) => {

    // retriving the data from the redux store
    const { isAdmin } = useSelector(state => state.auth)

    // hooks
    const [isMobileView, setIsMobileView] = useState(false);

    // function to handle the Mobile-Click
    const handleMobileClick = (e) => {
        setIsMobileView(!isMobileView);
    }

    // function to handle close
    const handleClose = (e) => {
        setIsMobileView(false);
    }


    // if you are not an Admin
    if (!isAdmin) {
        return (
            <Navigate to={"/admin"} />
        )
    }


    return (
        <Grid container minHeight={"100vh"}>
            <Box
                position={"fixed"}
                right={"1rem"}
                top={"1rem"}
                sx={{
                    display: {
                        xs: "block",
                        md: "none",
                    }
                }}
            >
                <IconButton onClick={handleMobileClick}>
                    {
                        isMobileView ? (
                            <CloseIcon />
                        ) : (
                            <MenuIcon />
                        )
                    }
                </IconButton>
            </Box>


            {/* Sidebar Component */}
            <Grid
                item
                md={4}
                lg={3}
                sx={{
                    display: {
                        xs: "none",
                        md: "block"
                    }
                }}
            >
                <SideBar />
            </Grid>

            {/* children component render */}
            <Grid
                item
                xs={12}
                md={8}
                lg={9}
                sx={{
                    bgcolor: grayColor,
                }}
            >
                {children}
            </Grid>



            {/* in Mobile View Side bar */}
            <Drawer open={isMobileView} onClose={handleClose}>
                <SideBar w="50vw" />
            </Drawer>
        </Grid>
    )
}

export default AdminLayOut
