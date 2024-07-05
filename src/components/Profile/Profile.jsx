import React from 'react'

import moment from 'moment'

import { Avatar, Stack } from '@mui/material'
import { Face as FaceIcon, AlternateEmail as EmailIcon, CalendarMonth as CalenderIcon } from '@mui/icons-material'

import ProfileCard from '../ProfileCard/ProfileCard'
import { transformImage } from '../../library/Features/Features'



const Profile = ({ user, drawer = false }) => {

    console.log(user);
    return (
        <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
            <Avatar
                src={transformImage(user?.avatar?.url)}
                sx={{
                    width: 200,
                    height: 200,
                    objectFit: "contain",
                    marginBottom: "1rem",
                    border: "5px solid white",
                }}
            />

            <ProfileCard heading={"Bio"} text={user?.bio} drawer={drawer} />
            <ProfileCard heading={"Username"} text={user?.username} icon={<EmailIcon sx={{ color: drawer ? "black" : "" }} />} drawer={drawer} />
            <ProfileCard heading={"Name"} text={user?.name} icon={<FaceIcon sx={{ color: drawer ? "black" : "" }} />} drawer={drawer} />
            <ProfileCard heading={"Joined"} text={moment(user?.createdAt).fromNow()} icon={<CalenderIcon sx={{ color: drawer ? "black" : "" }} />} drawer={drawer} />
        </Stack>
    )
}

export default Profile
