const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// In-memory storage
let alerts = [];

// GET /alerts - with query filters for country and status
router.get('/', (req, res) => {
  const { country, status } = req.query;
  let filteredAlerts = alerts;

  if (country) {
    filteredAlerts = filteredAlerts.filter(alert => alert.country.toLowerCase().includes(country.toLowerCase()));
  }
  if (status) {
    filteredAlerts = filteredAlerts.filter(alert => alert.status.toLowerCase() === status.toLowerCase());
  }

  res.status(200).json(filteredAlerts);
});

// POST /alerts
router.post('/', (req, res) => {
  const { country, city, visaType, status } = req.body;
  if (!country || !city || !visaType || !status) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (!['Tourist', 'Business', 'Student'].includes(visaType)) {
    return res.status(400).json({ error: 'Invalid visaType' });
  }
  if (!['Active', 'Booked', 'Expired'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const newAlert = {
    id: uuidv4(),
    country,
    city,
    visaType,
    status,
    createdAt: new Date().toISOString()
  };
  alerts.push(newAlert);
  res.status(201).json(newAlert);
});

// PUT /alerts/:id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { country, city, visaType, status } = req.body;
  const alert = alerts.find(a => a.id === id);
  if (!alert) {
    return res.status(404).json({ error: 'Alert not found' });
  }

  if (country) alert.country = country;
  if (city) alert.city = city;
  if (visaType && ['Tourist', 'Business', 'Student'].includes(visaType)) alert.visaType = visaType;
  if (status && ['Active', 'Booked', 'Expired'].includes(status)) alert.status = status;

  res.status(200).json(alert);
});

// DELETE /alerts/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = alerts.findIndex(a => a.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Alert not found' });
  }

  alerts.splice(index, 1);
  res.status(200).json({ message: 'Alert deleted' });
});

module.exports = router;