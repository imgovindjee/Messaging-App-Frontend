import { Container, Paper, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React from 'react'



const Table = ({ rows, columns, heading, rowHeight = 52 }) => {
    return (
        <Container sx={{ height: "100vh" }}>

            <Paper
                elevation={3}
                sx={{ padding: "1rem 4rem", margin: "auto", borderRadius: "1rem", width: "100%", overflow: "hidden", height: "100%", boxShadow: "none" }}
            >
                <Typography textAlign={"center"} variant='h4' sx={{ margin: "2rem", textTransform: "uppercase" }}>
                    {heading}
                </Typography>

                <DataGrid
                    rows={rows}
                    columns={columns}
                    rowHeight={rowHeight}
                    style={{
                        height: "80%",
                    }}
                    sx={{
                        border: "none",
                        ".table-header": {
                            // border: "0.5px solid white",
                            bgcolor: "black",
                            color: "white",
                        }
                    }}
                />
            </Paper>


        </Container>
    )
}

export default Table
