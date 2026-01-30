import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, CircularProgress } from '@mui/material';
import AlertItem from './AlertItem';

function AlertList({ alerts, loading, onUpdate, onDelete, setSnackbar }) {
  const columns = [
    { field: 'country', headerName: 'Country', width: 150 },
    { field: 'city', headerName: 'City', width: 150 },
    { field: 'visaType', headerName: 'Visa Type', width: 150 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'createdAt', headerName: 'Created At', width: 200, valueFormatter: (params) => new Date(params.value).toLocaleString() },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <AlertItem alert={params.row} onUpdate={onUpdate} onDelete={onDelete} setSnackbar={setSnackbar} />
      ),
    },
  ];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={alerts}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        getRowId={(row) => row.id}
      />
    </Box>
  );
}

export default AlertList;