import React from 'react'

import { Stack, Typography } from '@mui/material'



const ProfileCard = ({ text, icon, heading, drawer }) => {
    return (
        <Stack
            textAlign={"center"}
            alignItems={"center"}
            color={"white"}
            spacing={"0.1rem"}
            direction={"row"}
        >

            {/* ICONS DISPLAY */}
            {
                icon && icon
            }

            {/* text and heading Section */}
            {
                text.length > 0 && (
                    <Stack>
                        <Typography variant='body1' color={drawer ? "black" : ""}>
                            {text}
                        </Typography>
                        <Typography variant='caption' color={"gray"}>
                            {heading}
                        </Typography>
                    </Stack>
                )
            }
        </Stack>
    )
}

export default ProfileCard
