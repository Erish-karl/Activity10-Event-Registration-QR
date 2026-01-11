// frontend/admin-app/src/components/EventTest.tsx
import React, { useEffect, useState } from 'react';
import { getEvents, createEvent } from '../services/eventService';

// 1️⃣ Define Event type
interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  dateTime: string;
  capacity: number;
  createdAt: string;
  updatedAt: string;
}

export const EventTest: React.FC = () => {
  // 2️⃣ Use typed state
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  // 3️⃣ Fetch events
  const fetchEvents = async () => {
    const data: Event[] = await getEvents();
    setEvents(data);
  };

  // 4️⃣ Add a sample event
  const addSampleEvent = async () => {
    const newEvent: Omit<Event, 'id' | 'createdAt' | 'updatedAt'> = {
      title: 'Sample Event',
      description: 'Orientation Event',
      location: 'School Hall',
      dateTime: '2026-01-15T10:00:00.000Z',
      capacity: 50,
    };
    await createEvent(newEvent);
    fetchEvents(); // refresh the list
  };

  return (
    <div>
      <h2>Events</h2>
      <button onClick={addSampleEvent}>Add Sample Event</button>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.title} - {new Date(event.dateTime).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};
