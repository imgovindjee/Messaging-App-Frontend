import React from 'react'

import { Link } from 'react-router-dom'

import { Container, Stack, Typography } from '@mui/material'
import { Error as ErrorIcon } from "@mui/icons-material"




const PageNotFound = () => {
    return (
        <Container maxWidth="lg" sx={{ height: "100vh" }}>

            <Stack
                h={"100%"}
                spacing={"2rem"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <ErrorIcon sx={{ fontSize: "10rem" }} />
                <Typography variant='h1'>
                    404
                </Typography>
                <Typography variant='h3'>
                    Not Found
                </Typography>

                <Link to="/">
                    Go Back to Home
                </Link>
            </Stack>

        </Container>
    )
}

export default PageNotFound
