import React, { useEffect, useState } from 'react';
import { getEvents } from '../services/eventService';
import { RegistrationList } from './RegistrationList';

export const EventList = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const data = await getEvents();
    setEvents(data);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Events Dashboard</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {events.map(event => (
          <li
            key={event.id}
            onClick={() => setSelectedEventId(event.id)}
            style={{
              cursor: 'pointer',
              border: '1px solid #ccc',
              padding: '12px',
              marginBottom: '8px',
              borderRadius: '6px',
              backgroundColor: selectedEventId === event.id ? '#e0f7fa' : '#fff',
              transition: '0.2s',
            }}
            onMouseEnter={e =>
              (e.currentTarget.style.backgroundColor =
                selectedEventId === event.id ? '#e0f7fa' : '#f1f1f1')
            }
            onMouseLeave={e =>
              (e.currentTarget.style.backgroundColor =
                selectedEventId === event.id ? '#e0f7fa' : '#fff')
            }
          >
            <strong>{event.title}</strong> <br />
            {new Date(event.dateTime).toLocaleString()} <br />
            Capacity: {event.capacity}
          </li>
        ))}
      </ul>

      {selectedEventId && (
        <div style={{ marginTop: '20px' }}>
          <RegistrationList eventId={selectedEventId} />
        </div>
      )}
    </div>
  );
};
