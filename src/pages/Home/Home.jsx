import React from 'react'

import { Box, Typography } from '@mui/material';

import LayOut from '../../components/LayOut/LayOut'




const Home = () => {
    return (
        <Box bgcolor={"#dcd7d7"} height={"100%"}>
            <Typography p={"2rem"} variant="h5" textAlign={"center"}>
                Select a Friend To Chat
            </Typography>
        </Box>
    )
}




export default LayOut()(Home);
