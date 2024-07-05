import React from 'react'

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'





const ConfirmDeleteDialog = ({ open, handleClose, deleteHandler }) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                Confirm Delete
            </DialogTitle>

            <DialogContent>
                <DialogContentText>
                    Are You sure you want to delete the group?
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button variant='contained' onClick={handleClose}>No</Button>
                <Button variant='outlined' color='error' onClick={deleteHandler}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDeleteDialog
