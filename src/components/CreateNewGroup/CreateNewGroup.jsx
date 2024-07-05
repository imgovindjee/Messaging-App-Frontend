import React, { useState } from 'react'

import { Button, Dialog, DialogTitle, Stack, Skeleton, TextField, Typography } from '@mui/material'


import { sampleUsers } from '../../common/ChatItemsContent/ChattemContent'
import SearchItems from '../Search/SearchItems/SearchItems'
import { useDispatch, useSelector } from 'react-redux'
import { useAvailableFriendsQuery, useNewGroupMutation } from '../../redux/APICalling/api'
import { useAsyncMutation, useErrors } from '../../hooks/hooks'
import { setIsNewGroup } from '../../redux/Reducers/others'
import toast, { Toaster } from 'react-hot-toast'





const CreateNewGroup = () => {

    // hooks
    // for setting up the value in the REDUX-STORE
    const dispatch = useDispatch()

    // retriveing the data form the redux-store
    const { isNewGroup } = useSelector(state => state.others);

    // hooks
    // set up the member[participants-selected] to be in the group
    const [selectedMembers, setSelectedMembers] = useState([])

    // hooks for setup the value of the GROUP_NAME
    const [groupName, setGroupName] = useState("")



    // API CALLING

    //  1. to access the available friends...
    const { isError, error, data, isLoading } = useAvailableFriendsQuery();
    console.log("friends:- ", data);

    // 2. to make the newGroup
    const [newGroup, newGroupIsLoading] = useAsyncMutation(useNewGroupMutation)


    // if some erros came then showing them 
    const errors = [{ isError, error }]
    useErrors(errors)





    // function to handle the memebr-select for the PARTIPICANT of the Grup
    const selectMemberHandler = (id) => {
        setSelectedMembers((currentVal) =>
            currentVal.includes(id) ? (
                currentVal.filter((currElem) => currElem !== id)
            ) : (
                [...currentVal, id]
            )
        );
    }
    // console.log(selectedMembers)

    // function to handle the create-Group
    const handleCreateGroupSubmit = (e) => {
        console.log("CReating Group:- ", selectedMembers)

        // if user is not writing the group name
        if (!groupName) {
            return toast.error("Please Create a GroupName")
        }

        // if the memebrs of group is less than 2 excluding the CREATOR
        if (selectedMembers.length < 2) {
            return toast.error("A groupChat must contains atleast of 3 Members, including the Creator")
        }


        // all data is valid
        // Creating the GROUP
        newGroup(`Creating a GroupChat:- ${groupName}`, { name: groupName, members: selectedMembers })



        // if group is created then close the group creation dialog
        handleClose()
    }


    // function to handle the Close NewGroup creation
    const handleClose = (e) => {
        dispatch(setIsNewGroup(false))
    }




    return (
        <Dialog open={isNewGroup} onClose={handleClose}>

            <Toaster />

            <Stack
                p={{ xs: "1rem", sm: "3rem" }}
                width={"25rem"}
                spacing={"1rem"}
            >
                <DialogTitle textAlign={"center"} letterSpacing={"0.1em"} variant='h5'>
                    Create New group
                </DialogTitle>


                <TextField
                    value={groupName.value}
                    onChange={(e) => setGroupName(e.target.value)}
                    label="Group Name"
                />


                <Typography variant='body1'>
                    Members
                </Typography>


                {/* FRIEND MEMBERS THAT CAN BE ADDED AS PARTICIPANTS IN THE GROUP CHAT */}
                <Stack>
                    {
                        isLoading ? (
                            <Skeleton />
                        ) : (
                            data?.friends?.map((user, index) => {
                                return (
                                    <SearchItems
                                        user={user}
                                        key={index}
                                        handler={selectMemberHandler}
                                        isAdded={selectedMembers.includes(user?._id)}
                                    />
                                )
                            })
                        )
                    }
                </Stack>


                {/* Buttons */}
                <Stack direction={"row"} display={"flex"} justifyContent={"space-between"} spacing={"1rem"} marginTop={"1rem"}>
                    <Button variant='outlined' color='error' sx={{ "&:hover": { bgcolor: "red", color: "white" } }} onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button disabled={newGroupIsLoading} variant='contained' sx={{ "&:hover": { bgcolor: "#2e82d4" } }} onClick={handleCreateGroupSubmit}>
                        Create
                    </Button>
                </Stack>

            </Stack>

        </Dialog >
    )
}

export default CreateNewGroup
