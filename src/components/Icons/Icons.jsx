import React from 'react'

import { IconButton, Tooltip, Badge } from '@mui/material'



const Icons = ({ onClick, icon, title, value }) => {
    return (
        <>
            <Tooltip title={title}>
                <IconButton
                    color="inherit"
                    size="large"
                    onClick={onClick}
                >
                    {
                        value ? (
                            <Badge
                                badgeContent={value}
                                color='error'
                            >
                                {icon}
                            </Badge>
                        ) : (
                            icon
                        )
                    }
                </IconButton>
            </Tooltip>
        </>
    )
}

export default Icons
