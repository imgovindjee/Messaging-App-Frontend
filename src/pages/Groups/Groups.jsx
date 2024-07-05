import React, { Suspense, lazy, useEffect, useState } from 'react'

import { useNavigate, useSearchParams } from 'react-router-dom'

import { Add, Delete, Done as DoneIcon, Edit as EditIcon, KeyboardBackspace as KeyboardBackspaceIcon, Menu as MenuIcon } from '@mui/icons-material'
import { Grid, IconButton, Tooltip, Box, Drawer, Stack, Typography, TextField, Button, Backdrop, CircularProgress } from '@mui/material'

import GroupLists from './GroupLists/GroupLists'
import { chatsSample, sampleUsers } from '../../common/ChatItemsContent/ChattemContent'
import SearchItems from '../../components/Search/SearchItems/SearchItems'


import { useChatDetailsQuery, useDeleteChatMutation, useMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from '../../redux/APICalling/api'
import { useAsyncMutation, useErrors } from '../../hooks/hooks'
import PageInitialLayOutLoader from '../../components/Loaders/PageInitialLoader/PageInitialLayOutLoader'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAddMember } from '../../redux/Reducers/others'


// LAZY import of the dialogs....
// to show only if the given condition is valid
const ConfirmDeleteDialog = lazy(() => import('../../components/Dialogs/ConfirmDeleteDialog'))
const AddMemberDialogs = lazy(() => import('../../components/Dialogs/AddMemberDialogs'))





// add member
// const isAddMember = false;


const Groups = () => {

    // change the page for the render of the diifenrt pagse,,,
    const navigate = useNavigate();


    // hook
    // for changing the redux-store value
    const dispatch = useDispatch()

    // pre-data from the redux-store
    const { isAddMember } = useSelector(state => state.others)


    const chatId = useSearchParams()[0].get("group");
    // console.log(chatId)


    // hooks
    // to make the value of the Mobile view toogle
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // managing the GROUP NAME CHANGE
    const [groupName, setGroupName] = useState("")
    const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("")

    // memebrs in the groupCHat
    const [members, setMembers] = useState([]);

    // manges the delete
    const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);

    // Editing the data setup
    const [isEdit, setIsEdit] = useState(false);



    // API MAKING...

    // 1. Getting the GROUP-LOGGED-IN USER IS "MEMEBRS IN"
    const myGroups = useMyGroupsQuery("");
    // console.log(myGroups?.data)

    // 2. getting the GroupDetails
    const groupDetails = useChatDetailsQuery({ chatId, populate: true }, { skip: !chatId });
    // console.log(groupDetails?.data)

    // 3. for the changing the GroupName
    const [renameGroupName, isLoadingGroupName] = useAsyncMutation(useRenameGroupMutation)

    // 4. for the remove the Group-member
    const [removeGroupMember, isLoadingRemoveGroupMember] = useAsyncMutation(useRemoveGroupMemberMutation)

    // 5. for the delete groupChats
    const [deleteGroup, isLoadingDeleteGroup] = useAsyncMutation(useDeleteChatMutation)


    // ERROR DETECTIONS
    // WHILE API CALLING
    const errors = [
        { isError: myGroups?.isError, error: myGroups?.error },
        { isError: groupDetails?.isError, error: groupDetails?.error },
    ]
    useErrors(errors)


    // REAL TIME CHANGING OF THE DATA-CHAT
    useEffect(() => {
        if (groupDetails?.data) {
            setGroupName(groupDetails?.data?.chat?.name)
            setGroupNameUpdatedValue(groupDetails?.data?.chat?.name)
            setMembers(groupDetails?.data?.chat?.members)
        }

        return () => {
            setGroupName("")
            setGroupNameUpdatedValue("")
            setMembers([])
            setIsEdit(false)
        }
    }, [groupDetails?.data, chatId])



    // function to handle the back-button
    const handleNavigateBack = (e) => {
        navigate("/")
    }

    // function to handle the mobile handler
    const handleMobile = (e) => {
        setIsMobileMenuOpen(currentVal => !currentVal)
    }

    // function to handle the Mobile menu close
    const handleMobileClose = (e) => {
        setIsMobileMenuOpen(false);
    }

    // function o handle the groupname update
    const handleUpdateGroupName = (e) => {
        setIsEdit(false)
        renameGroupName("Updating GroupName", { chatId, name: groupNameUpdatedValue })
    }

    // function to handle the Add Member
    const handleAddMemeber = (e) => {
        dispatch(setIsAddMember(true));
    }

    // function to handle the confirm delete group
    const handleOpenConfirmDelete = (e) => {
        setConfirmDeleteDialog(true);
    }

    // function to close the delete-confirm handler
    const handleCloseConfirmDelete = (e) => {
        setConfirmDeleteDialog(false);
    }

    // delete Handler
    const handleDelete = (e) => {
        deleteGroup("Deleting Group....", chatId);
        handleCloseConfirmDelete()
        navigate("/groups")
    }

    // function to handle the removeSelectedMember
    const removeMemberHandler = (id) => {
        removeGroupMember("Removing Member from the group..", { chatId, userId: id })
    }


    // REAL TIME LOADING OF THE PAGE DATA
    useEffect(() => {
        if (chatId) {
            setGroupName("Group Name-" + chatId)
            setGroupNameUpdatedValue("Group Name-" + chatId)
        }

        // unMOunting the components before loading up for the again
        return () => {
            setGroupName("")
            setGroupNameUpdatedValue("")
            setIsEdit(false)
        }
    }, [chatId]);









    // Icons Buttons
    const IconBtns = (
        <>
            <Box
                sx={{
                    display: {
                        xs: "block",
                        sm: "none",
                        position: "fixed",
                        right: "1rem",
                        top: "1rem",
                    }
                }}
            >
                <Tooltip title="Menu">
                    <IconButton onClick={handleMobile}>
                        <MenuIcon />
                    </IconButton>
                </Tooltip>
            </Box>


            <Tooltip title="Back">
                <IconButton
                    sx={{
                        position: "absolute",
                        top: "2rem",
                        left: "2rem",
                        bgcolor: "rgba(0,0,0,0.2)",
                        color: "whitesmoke",
                        "&:hover": {
                            bgcolor: "rgba(0,0,0,0.3)",
                        }
                    }}
                    onClick={handleNavigateBack}
                >
                    <KeyboardBackspaceIcon />
                </IconButton>
            </Tooltip>
        </>
    )


    // Group Name
    const GroupName = (
        // p-3rem
        <Stack
            direction={"row"}
            justifyContent={"center"}
            alignItems={"center"}
            spacing={"1rem"}
            padding={"1rem"}
        >
            {
                isEdit ? (
                    <>
                        <TextField
                            value={groupNameUpdatedValue}
                            onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
                        />

                        <IconButton onClick={handleUpdateGroupName} disabled={isLoadingGroupName}>
                            <DoneIcon />
                        </IconButton>
                    </>
                ) : (
                    <>
                        <Typography variant='h4' >
                            {groupName}
                        </Typography>

                        <IconButton onClick={() => setIsEdit(true)} disabled={isLoadingGroupName}>
                            <EditIcon />
                        </IconButton>
                    </>
                )
            }
        </Stack>
    )


    // Button Group
    const ButtonGroup = (
        <Stack
            direction={{
                xs: "column-reverse",
                sm: "row",
            }}
            spacing={"1rem"}
            p={{
                xs: "0.7rem",
                sm: '1rem',
                md: "1rem 4rem",
            }}
        >
            <Button
                onClick={handleOpenConfirmDelete}
                startIcon={<Delete />}
                size="large"
                color="error"
                variant='outlined'
                sx={{ "&:hover": { color: "whitesmoke", bgcolor: "#d32f2f", } }}
            >
                Delete Group
            </Button>
            <Button
                onClick={handleAddMemeber}
                startIcon={<Add />}
                size="large"
                variant="contained"
                sx={{ "&:hover": { bgcolor: "#1986d2", } }}
            >
                Add Member
            </Button>
        </Stack>
    )






    return (
        myGroups.isLoading ? (
            <PageInitialLayOutLoader />
        ) : (
            <Grid container height={"100vh"}>
                <Grid
                    item
                    sm={4}
                    sx={{
                        display: {
                            xs: "none",
                            sm: 'block',
                        },
                        bgcolor: "#efefef",
                        overflowY: "auto"
                    }}
                >
                    <GroupLists myGroups={myGroups?.data?.data} chatId={chatId} />
                </Grid >

                <Grid
                    items
                    xs={12}
                    sm={8}
                    sx={{
                        display: "flex",
                        // justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        padding: "1rem 3rem",
                        flexDirection: "column",
                    }}
                >
                    {/*Icons Buttons  */}
                    {IconBtns}

                    {/* Group ELements */}
                    {
                        groupName && (
                            <>
                                {GroupName}

                                <Typography margin={"2rem"} marginBottom={"0.1rem"} variant='body1' alignSelf={"flex-start"}>
                                    Members
                                </Typography>

                                <Stack
                                    maxWidth={"45rem"}
                                    width={"100%"}
                                    boxSizing={"border-box"}
                                    // spacing={"2rem"}
                                    height={"50vh"}
                                    overflow={"auto"}
                                    padding={{
                                        sm: "1rem",
                                        xs: "0",
                                        md: "1rem 4rem",
                                    }}
                                // bgcolor={"rgba(0,0,0,0.1)"}
                                >
                                    {/* Members */}
                                    {
                                        isLoadingRemoveGroupMember ? (
                                            <CircularProgress />
                                        ) : (
                                            members?.map((user, index) => (
                                                <SearchItems
                                                    user={user}
                                                    isAdded
                                                    key={index}
                                                    styling={{
                                                        padding: "1rem 2rem",
                                                        borderRadius: "1rem",
                                                        boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)"
                                                    }}
                                                    handler={removeMemberHandler}
                                                />
                                            ))
                                        )
                                    }
                                </Stack>

                                {/* buttons Group */}
                                {ButtonGroup}
                            </>
                        )
                    }
                </Grid>

                {/* Add member */}
                {
                    isAddMember && (
                        <Suspense fallback={<Backdrop open />}>
                            <AddMemberDialogs chatId={chatId} />
                        </Suspense>
                    )
                }

                {/* Delete Dialog */}
                {
                    confirmDeleteDialog && (
                        <Suspense fallback={<Backdrop open />}>
                            <ConfirmDeleteDialog open={confirmDeleteDialog} handleClose={handleCloseConfirmDelete} deleteHandler={handleDelete} />
                        </Suspense>
                    )
                }


                <Drawer
                    sx={{
                        display: {
                            xs: 'block',
                            sm: "none",
                        }
                    }}
                    open={isMobileMenuOpen}
                    onClose={handleMobileClose}
                >
                    <GroupLists w={"50vw"} myGroups={myGroups?.data?.data} chatId={chatId} />
                </Drawer>


            </Grid >
        )
    )
}

export default Groups
