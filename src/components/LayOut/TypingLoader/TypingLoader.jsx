import { Stack } from '@mui/material'
import React from 'react'
import { BouncingSkeleton } from '../../StyledComponents/StyeledComponents'

const TypingLoader = () => {
    return (
        <Stack
            spacing={"0.5rem"}
            direction={"row"}
            justifyContent={"center"}
            padding={"0.5rem"}
        >

            <BouncingSkeleton
                height={15}
                width={15}
                variant='circular'
                style={{
                    animationDelay: "0.1s"
                }}
            />

            <BouncingSkeleton
                height={15}
                width={15}
                variant='circular'
                style={{
                    animationDelay: "0.2s"
                }}
            />

            <BouncingSkeleton
                height={15}
                width={15}
                variant='circular'
                style={{
                    animationDelay: "0.3s"
                }}
            />

            <BouncingSkeleton
                height={15}
                width={15}
                variant='circular'
                style={{
                    animationDelay: "0.55s"
                }}
            />

            <BouncingSkeleton
                height={15}
                width={15}
                variant='circular'
                style={{
                    animationDelay: "0.67s"
                }}
            />

        </Stack>
    )
}

export default TypingLoader
