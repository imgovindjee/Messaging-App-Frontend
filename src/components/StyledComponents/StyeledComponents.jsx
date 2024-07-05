import { Link as LinkComponent } from 'react-router-dom'

import { Skeleton, keyframes, styled } from '@mui/material'

import { grayColor } from '../../constants/colors'




export const AvatarVisuallyHidden = styled("input")({
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    width: 1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    whiteSpace: "nowrap",
    margin: -1,
})


export const Link = styled(LinkComponent)`
    text-decoration: none;
    color: black;
    padding: 1rem;
    &:hover {
        background-color: rgba(0, 0, 0, 0.05);
    }
`


export const InputBox = styled("input")`
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    padding: 0 4rem;
    border-radius: 1.5rem;
    background-color: ${grayColor};
`


export const SearchField = styled("input")({
    padding: "0.8rem 2rem",
    width: "20vmax",
    border: "none",
    outline: "none",
    fontSize: "1.1rem",
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: "1.5rem"
})


export const CurvedButton = styled("button")({
    borderRadius: "1.5rem",
    // {1,2}
    padding: "0.6rem 1.5rem",
    border: "none",
    outline: "none",
    cursor: "pointer",
    backgroundColor: 'black',
    color: "white",
    fontSize: "1rem",
    "&:hover": {
        backgroundColor: "rgba(0,0,0,0.8)"
    }
})




// animations
const bounce = keyframes`
    0%{transform:scale(1);}
    50%{transform:scale(1.5);}
    100%{transform:scale(1);}
`


export const BouncingSkeleton = styled(Skeleton)(() => ({
    animation: `${bounce} 1s infinite`
}))