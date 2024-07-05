import React, { useRef } from 'react'

import { ListItemText, Menu, MenuItem, MenuList, Tooltip } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setIsFileMenu, setUploadingLoader } from '../../redux/Reducers/others'
import { AudioFile as AudioFileIcon, Audiotrack, Image as ImageIcon, UploadFile as UploadFileIcon, VideoCall as VideoCallIcon, VideoFile as VideoFileIcon, VideoLabel } from '@mui/icons-material'
import toast, { Toaster } from 'react-hot-toast'
import { useSendAttachmentsMutation } from '../../redux/APICalling/api'







const FileMenu = ({ anchorElement, chatId }) => {

    // makeing the reference HOOK for EACH OF THE ITEMS
    const imageRef = useRef(null)
    const videoRef = useRef(null)
    const AudioRef = useRef(null)
    const fileRef = useRef(null)


    // hook
    // for chaninging the redux-store value
    const dispatch = useDispatch()

    // accessing the value fomr the redux-STore
    const { isFileMenu } = useSelector(state => state.others);




    // function to handle the close file-menu
    const handleCLoseFIleMenu = () => {
        dispatch(setIsFileMenu(false))
    }

    // API CALLING
    const [sendAttachments] = useSendAttachmentsMutation()


    // function to return or give the current target element
    const selectImage = () => imageRef.current?.click()
    const selectVideo = () => videoRef.current?.click()
    const selectAudio = () => AudioRef.current?.click()
    const selectFile = () => fileRef.current?.click()




    // function to handle the fileChange
    const fileChangeHandler = async (e, type_key) => {
        // retriving the selected file by the user
        const files = Array.from(e.target?.files)
        // console.log(files);

        // if no file is selected then just return
        if (files.length <= 0) {
            return;
        }

        // if files exists
        if (files.length > 5) {
            return toast.error(`You can select max of 20 ${type_key} at a time`)
        }

        // to show some loading animation
        // toggling the redux-store data
        dispatch(setUploadingLoader(true));

        // showing the toast message
        const loadingToast = toast.loading(`Uploading ${type_key}...`)
        handleCLoseFIleMenu();

        // Fetching File/data
        try {

            // data to be feeded up from the frontend
            const formData = new FormData();

            // adding the formData
            formData.append("chatId", chatId)
            files.forEach((file) => formData.append("files", file))

            // API CALLING
            const res = await sendAttachments(formData)
            // console.log(res);
            if (res?.data) {
                toast.dismiss(loadingToast)
                toast.success(`${type_key} sent successfully`);
            } else {
                toast.dismiss(loadingToast)
                toast.error(`${type_key}, failed to send`);
            }
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error(error.respones.data.message || error.respones.data._message || "Something went wrong, please try again")
        } finally {
            dispatch(setUploadingLoader(false));
        }
    }






    return (
        <Menu
            anchorEl={anchorElement}
            open={isFileMenu}
            onClose={handleCLoseFIleMenu}
        >
            <div style={{ width: "10rem" }}>
                <Toaster />


                <MenuList>

                    <MenuItem onClick={selectImage} sx={{ borderBottom: "0.1px solid rgba(0,0,0,0.1)" }}>
                        <Tooltip title="Image">
                            <ImageIcon sx={{ color: "teal" }} />
                        </Tooltip>
                        <ListItemText style={{ marginLeft: "0.7rem" }}>
                            Image
                        </ListItemText>
                        <input
                            ref={imageRef}
                            type="file"
                            multiple
                            accept='image/png, image/jpeg, image/jpg, image/hiec, image/href, image/gif'
                            style={{ display: "none" }}
                            onChange={(e) => fileChangeHandler(e, "Images")}
                        />
                    </MenuItem>

                    <MenuItem onClick={selectAudio} sx={{ borderBottom: "0.1px solid rgba(0,0,0,0.1)" }}>
                        <Tooltip title="Audio">
                            {/* <AudioFileIcon sx={{ color: "grey" }} /> */}
                            <Audiotrack sx={{ color: "#609191" }} />
                        </Tooltip>
                        <ListItemText style={{ marginLeft: "0.7rem" }}>
                            Audio
                        </ListItemText>
                        <input
                            ref={AudioRef}
                            type="file"
                            multiple
                            accept='audio/mpeg, audio/ogg, audio/wav, audio/mp3'
                            style={{ display: "none" }}
                            onChange={(e) => fileChangeHandler(e, "Audios")}
                        />
                    </MenuItem>

                    <MenuItem onClick={selectVideo} sx={{ borderBottom: "0.1px solid rgba(0,0,0,0.1)" }}>
                        <Tooltip title="Video">
                            {/* <VideoFileIcon sx={{ color: "grey" }} /> */}
                            <VideoCallIcon sx={{ color: "#609191" }} />
                        </Tooltip>
                        <ListItemText style={{ marginLeft: "0.7rem" }}>
                            Video
                        </ListItemText>
                        <input
                            type="file"
                            ref={videoRef}
                            multiple
                            accept='video/mp4, video/webm, video/ogg'
                            style={{ display: "none" }}
                            onChange={(e) => fileChangeHandler(e, "Videos")}
                        />
                    </MenuItem>

                    <MenuItem onClick={selectFile}>
                        <Tooltip title="Files">
                            <UploadFileIcon sx={{ color: "#609191" }} />
                        </Tooltip>
                        <ListItemText style={{ marginLeft: "0.7rem" }}>
                            File
                        </ListItemText>
                        <input
                            ref={fileRef}
                            type="file"
                            multiple
                            accept='*'
                            style={{ display: "none" }}
                            onChange={(e) => fileChangeHandler(e, "Files")}
                        />
                    </MenuItem>

                </MenuList>

            </div>

        </Menu>
    )
}

export default FileMenu
