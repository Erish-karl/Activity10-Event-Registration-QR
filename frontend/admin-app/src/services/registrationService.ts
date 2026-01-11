// src/services/registrationService.ts
import axios from "axios";
import { API_URL } from "../config";

export interface Registration {
  id: string;
  eventId: string;
  attendeeId: string;
  ticketCode: string;
  qrCode: string;
  status: "pending" | "checked-in";
  createdAt: string;
}

export interface Attendee {
  id: string;
  name: string;
  email: string;
  company: string;
}

// 1️⃣ Get all registrations for an event
export const getRegistrations = async (eventId: string): Promise<Registration[]> => {
  const res = await axios.get(`${API_URL}/registrations/event/${eventId}`);
  return res.data;
};

// 2️⃣ Create new attendee
export const createAttendee = async (name: string, email: string, company: string): Promise<Attendee> => {
  const res = await axios.post(`${API_URL}/attendees`, { name, email, company });
  return res.data;
};

// 3️⃣ Register attendee to an event
export const registerAttendeeToEvent = async (eventId: string, attendeeId: string): Promise<Registration> => {
  const res = await axios.post(`${API_URL}/registrations`, { eventId, attendeeId });
  return res.data;
};

// 4️⃣ Check-in a registration
export const checkInRegistration = async (registrationId: string): Promise<Registration> => {
  const res = await axios.put(`${API_URL}/registrations/${registrationId}/check-in`);
  return res.data;
};
