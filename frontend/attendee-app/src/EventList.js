import { useEffect, useState } from "react";
import { API_URL } from "./config";

export default function EventList({ attendeeId }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/events`)
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  const register = (eventId) => {
    fetch(`${API_URL}/registrations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ eventId, attendeeId }),
    })
    .then(res => res.json())
    .then(data => alert("Registered! QR Ticket generated."));
  };

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map(ev => (
          <li key={ev.id}>
            {ev.title} - {ev.dateTime}
            <button onClick={() => register(ev.id)}>Register</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
