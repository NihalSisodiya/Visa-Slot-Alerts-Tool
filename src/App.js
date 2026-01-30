import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, TextField, FormControl, InputLabel, Select, MenuItem, Snackbar, Alert } from '@mui/material';
import AlertForm from './components/AlertForm';
import AlertList from './components/AlertList';
import { getAlerts } from './api';

function App() {
  const [alerts, setAlerts] = useState([]);
  const [filteredAlerts, setFilteredAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchCountry, setSearchCountry] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchAlerts = async () => {
    setLoading(true);
    try {
      const response = await getAlerts();
      setAlerts(response.data);
      setFilteredAlerts(response.data);
    } catch (error) {
      setSnackbar({ open: true, message: 'Error fetching alerts', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  useEffect(() => {
    let filtered = alerts;
    if (searchCountry) {
      filtered = filtered.filter(alert => alert.country.toLowerCase().includes(searchCountry.toLowerCase()));
    }
    if (searchStatus) {
      filtered = filtered.filter(alert => alert.status === searchStatus);
    }
    setFilteredAlerts(filtered);
  }, [alerts, searchCountry, searchStatus]);

  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Visa Slot Alerts
      </Typography>
      <Box sx={{ mb: 4 }}>
        <AlertForm onAlertCreated={fetchAlerts} setSnackbar={setSnackbar} />
      </Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Search by Country"
          value={searchCountry}
          onChange={(e) => setSearchCountry(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Filter by Status</InputLabel>
          <Select value={searchStatus} onChange={(e) => setSearchStatus(e.target.value)}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Booked">Booked</MenuItem>
            <MenuItem value="Expired">Expired</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <AlertList alerts={filteredAlerts} loading={loading} onUpdate={fetchAlerts} onDelete={fetchAlerts} setSnackbar={setSnackbar} />
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;