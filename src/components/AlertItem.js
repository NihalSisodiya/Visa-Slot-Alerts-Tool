import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { updateAlert, deleteAlert } from '../api';

function AlertItem({ alert, onUpdate, onDelete, setSnackbar }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleUpdateStatus = async () => {
    try {
      await updateAlert(alert.id, { status: 'Booked' });
      onUpdate();
      setSnackbar({ open: true, message: 'Status updated to Booked', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error updating alert', severity: 'error' });
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteAlert(alert.id);
      onDelete();
      setSnackbar({ open: true, message: 'Alert deleted', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error deleting alert', severity: 'error' });
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <Button onClick={handleUpdateStatus} disabled={alert.status === 'Booked'} variant="outlined" size="small" sx={{ mr: 1 }}>
        Book
      </Button>
      <Button onClick={() => setDeleteDialogOpen(true)} variant="outlined" color="error" size="small">
        Delete
      </Button>
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to delete this alert?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AlertItem;