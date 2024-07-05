import React from 'react'

import { FileOpen as FileOpenIcon } from '@mui/icons-material';

import { transformImage } from '../../library/Features/Features';


const RenderAttachments = (file, url) => {
    switch (file) {
        case "video":
            return (
                <video
                    src={url}
                    preload='none'
                    width={"200px"}
                    controls
                />
            )


        case "audio":
            return (
                <audio
                    src={url}
                    preload='none'
                    controls
                />
            )


        case "image":
            return (
                <img
                    src={transformImage(url, 200)}
                    alt='Attachment'
                    width={"200px"}
                    height={"160px"}
                    style={{
                        objectFit: "contain",
                    }}
                />
            )


        default:
            return (
                <FileOpenIcon />
            )

    }
}

export default RenderAttachments
