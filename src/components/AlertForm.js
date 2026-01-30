import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, Box } from '@mui/material';
import { createAlert } from '../api';

function AlertForm({ onAlertCreated, setSnackbar }) {
  const [formData, setFormData] = useState({
    country: '',
    city: '',
    visaType: 'Tourist',
    status: 'Active'
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.country || !formData.city) {
      setSnackbar({ open: true, message: 'Country and City are required', severity: 'warning' });
      return;
    }
    setLoading(true);
    try {
      await createAlert(formData);
      setFormData({ country: '', city: '', visaType: 'Tourist', status: 'Active' });
      onAlertCreated();
      setSnackbar({ open: true, message: 'Alert created successfully', severity: 'success' });
    } catch (error) {
      setSnackbar({ open: true, message: 'Error creating alert', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Create New Alert
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Country" name="country" value={formData.country} onChange={handleChange} required />
          <TextField label="City" name="city" value={formData.city} onChange={handleChange} required />
          <FormControl>
            <InputLabel>Visa Type</InputLabel>
            <Select name="visaType" value={formData.visaType} onChange={handleChange}>
              <MenuItem value="Tourist">Tourist</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
              <MenuItem value="Student">Student</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Status</InputLabel>
            <Select name="status" value={formData.status} onChange={handleChange}>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Booked">Booked</MenuItem>
              <MenuItem value="Expired">Expired</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? 'Creating...' : 'Create Alert'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default AlertForm;