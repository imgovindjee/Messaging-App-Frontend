import React, { memo } from 'react'

import { Add as AddIcon, Remove as RemoveIcon } from '@mui/icons-material';
import { Avatar, IconButton, ListItem, Stack, Typography } from '@mui/material';
import { transformImage } from '../../../library/Features/Features';





const SearchItems = ({ user, handler, loadingSearchHandler, isAdded = false, styling = {} }) => {

    // destructuring the data
    const { name, _id, avatar } = user;

    return (
        <ListItem sx={{ "&:hover": { bgcolor: "rgba(0,0,0,0.1)" } }}>
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"} {...styling}>
                <Avatar src={transformImage(avatar)} />

                <Typography
                    variant='body1'
                    sx={{
                        flexGrow: 1,
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        display: "-webkit-box",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {name}
                </Typography>

                <IconButton
                    sx={{
                        bgcolor: isAdded ? "error.main" : "primary.main",
                        color: "white",
                        "&:hover": {
                            bgcolor: isAdded ? "error.dark" : "primary.dark"
                        },
                        cursor: loadingSearchHandler ? "none" : "pointer"
                    }}
                    onClick={() => handler(_id)}
                // disabled={loadingSearchHandler}
                >
                    {
                        isAdded ? (
                            <RemoveIcon />
                        ) : (
                            <AddIcon />
                        )
                    }
                </IconButton>
            </Stack>
        </ListItem>
    )
}

export default memo(SearchItems)
