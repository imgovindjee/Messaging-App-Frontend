import React from 'react'

import { Avatar, AvatarGroup, Box, Stack } from '@mui/material'

import { transformImage } from '../../library/Features/Features'





const AvatarCard = ({ avatar = [], max = 4 }) => {
    return (
        <Stack direction={"row"} spacing={"0.5rem"} paddingLeft={"0.3rem"} >

            <AvatarGroup max={max} sx={{ position: "relative" }}>


            {/* display={"flex"} justifyContent={"center"} alignItems={"center"} */}
                <Box height={"5rem"} width={"3rem"} sx={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                    {
                        avatar?.map((img, index) => {
                            return (
                                <Avatar
                                    key={Math.random() * 100 + index}
                                    src={transformImage(img)}
                                    alt={`Avatar ${index}`}
                                    sx={{
                                        width: "3rem",
                                        height: "3rem",
                                        position: "absolute",
                                        left: {
                                            xs: `${1.5 + index}rem`,
                                            sm: `${index+1}px`
                                        },
                                    }}
                                />
                            )
                        })
                    }
                </Box>

            </AvatarGroup>

        </Stack>
    )
}

export default AvatarCard
