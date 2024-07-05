import { Menu, Stack, Typography } from '@mui/material'
import react, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { setIsDeleteMenu } from '../../redux/Reducers/others';
import { Delete as DeleteIcon, ExitToApp as ExitToAppIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAsyncMutation } from '../../hooks/hooks';
import { useDeleteChatMutation, useLeaveGroupMutation } from '../../redux/APICalling/api';



const DeleteChatMenuDialog = ({ dispatch, deleteOptionAnchor }) => {

    // hook for naviagtion
    const navigate = useNavigate()

    // getting some Data from the redux-stroe
    const { isDeleteMenu, selectedDeleteChat } = useSelector(state => state.others);
    // console.log(selectedDeleteChat)


    // API CALLING
    //1. for DELETING THE CHAT
    const [deleteChat, _unused_, deleteChatData] = useAsyncMutation(useDeleteChatMutation);
    //2. for LEAVE THE GROUP-CHAT
    const [leaveChatGroup, _unused, leaveChatGroupData] = useAsyncMutation(useLeaveGroupMutation);


    // function to handle the closeDialogHandler
    const handleCloseDialog = () => {
        dispatch(setIsDeleteMenu(false))

        // resetting the refernec hook
        deleteOptionAnchor.current = null;
    }

    // function to handle the leave GroupHandler
    const leaveGroupHandler = (e) => {
        handleCloseDialog()
        leaveChatGroup("Leaving Group", selectedDeleteChat?.chatId)
    }

    // function to handle the delete chat
    const deleteChatHandler = (e) => {
        handleCloseDialog()
        deleteChat('Deleting Chat', selectedDeleteChat?.chatId)
    }



    // REAL TIME SETTING OF THE DATA's
    useEffect(() => {
        if (deleteChatData || leaveChatGroupData) {
            navigate("/")
        }
    }, [deleteChatData, leaveChatGroupData]);



    return (
        <Menu
            open={isDeleteMenu}
            onClose={handleCloseDialog}
            anchorEl={deleteOptionAnchor.current}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "center",
                horizontal: "center"
            }}
        >

            <Stack
                onClick={selectedDeleteChat.groupChat ? leaveGroupHandler : deleteChatHandler}
                sx={{
                    width: "10rem",
                    padding: "0.5rem",
                    cursor: "pointer"
                }}
                direction={"row"} alignItems={"center"} spacing={"0.5rem"}
            >
                {
                    selectedDeleteChat.groupChat ? (
                        <>
                            <ExitToAppIcon />
                            <Typography>
                                Leave Group
                            </Typography>
                        </>
                    ) : (
                        <>
                            <DeleteIcon />
                            <Typography>
                                Delete Chat
                            </Typography>
                        </>
                    )
                }
            </Stack>

        </Menu>
    )
}


export default DeleteChatMenuDialog