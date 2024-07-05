import React, { useState } from 'react'

import { Button, Dialog, DialogTitle, Stack, Skeleton, Typography } from '@mui/material'

import { sampleUsers } from '../../common/ChatItemsContent/ChattemContent'
import SearchItems from '../Search/SearchItems/SearchItems'
import { useAsyncMutation, useErrors } from '../../hooks/hooks'
import { useAddGroupMemberMutation, useAvailableFriendsQuery } from '../../redux/APICalling/api'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddMember } from '../../redux/Reducers/others'





const AddMemberDialogs = ({ chatId }) => {

    // hook
    // for changing the redux-store value
    const dispatch = useDispatch()


    // pre-data from the redux-store
    const { isAddMember } = useSelector(state => state.others)


    // hooks
    // set up the member[participants-selected] to be in the group
    const [selectedMembers, setSelectedMembers] = useState([])


    // API CALLING

    // 1. for the adding the memebrs on the group
    const [addMember, isLoadingAddMember] = useAsyncMutation(useAddGroupMemberMutation)

    // 2. friend list of adding members user which aren't present in the GROUP-CHAT
    const { isLoading, data, isError, error } = useAvailableFriendsQuery(chatId)
    console.log(data)


    // ERROR HANDLER while API-CALLING
    useErrors([{ isError, error }]);





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

    // function to handle the add member Submit
    const handleAddMemberSubmit = (e) => {
        addMember("Adding Members to the GroupChat...", { members: selectedMembers, chatId })

        // when data is being submit just close the dialog
        handleClose()
    }


    // function to handle the "CANCEL" button
    const handleClose = (e) => {
        dispatch(setIsAddMember(false))
    }




    return (
        <Dialog open={isAddMember} onClose={handleClose}>
            <Stack width={"20rem"} spacing={"1.5rem"} p={"1.5rem"}>
                <DialogTitle textAlign={"center"}>
                    Add Member
                </DialogTitle>

                <Stack spacing={"0.5rem"}>
                    {
                        isLoading ? (
                            <Skeleton />
                        ) : (
                            data?.friends?.length > 0 ? (
                                data?.friends?.map((user, index) => {
                                    return (
                                        <SearchItems key={index} user={user} handler={selectMemberHandler} isAdded={selectedMembers.includes(user?._id)} />
                                    )
                                })
                            ) : (
                                <Typography textAlign={"center"} sx={{ bgcolor: "rgba(0,0,0,0.1)", width: "100%", p: "0.5rem" }} m={"1rem auto"}>
                                    No Friends
                                </Typography>
                            )
                        )
                    }
                </Stack>

                <Stack spacing={"0.5rem"} direction={"row"} alignItems={"center"} justifyContent={"space-ecenly"}>
                    <Button color='error' variant='outlined' onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' disabled={isLoadingAddMember} onClick={handleAddMemberSubmit}>Submit Changes</Button>
                </Stack>
            </Stack>
        </Dialog>
    )
}

export default AddMemberDialogs
