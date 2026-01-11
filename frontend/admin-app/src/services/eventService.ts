// frontend/admin-app/src/services/eventService.ts
import { api } from '../api';

// Fetch all events
export const getEvents = async () => {
  const res = await api.get('/events');
  return res.data;
};

// Create a new event
export const createEvent = async (eventData: any) => {
  const res = await api.post('/events', eventData);
  return res.data;
};

// Update an existing event
export const updateEvent = async (id: string, eventData: any) => {
  const res = await api.put(`/events/${id}`, eventData);
  return res.data;
};

// Delete an event
export const deleteEvent = async (id: string) => {
  const res = await api.delete(`/events/${id}`);
  return res.data;
};
