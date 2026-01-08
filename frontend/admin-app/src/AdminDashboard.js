import { useEffect, useState } from "react";
import { API_URL } from "./config";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    location: "",
    dateTime: "",
    capacity: 0,
  });

  // Fetch all events on component load
  useEffect(() => {
    fetch(`${API_URL}/events`)
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching events:", err));
  }, []);

  // Create new event
  const createEvent = () => {
    fetch(`${API_URL}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Created event:", data);
        setEvents([...events, data]); // Add new event to the list
        // Reset form
        setNewEvent({ title: "", description: "", location: "", dateTime: "", capacity: 0 });
      })
      .catch((err) => console.error("Error creating event:", err));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Admin Dashboard</h1>

      <section style={{ marginBottom: "30px" }}>
        <h2>Create Event</h2>
        <input
          placeholder="Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <input
          placeholder="Description"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
        />
        <input
          placeholder="Location"
          value={newEvent.location}
          onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
        />
        <input
          type="datetime-local"
          value={newEvent.dateTime}
          onChange={(e) => setNewEvent({ ...newEvent, dateTime: e.target.value })}
        />
        <input
          type="number"
          placeholder="Capacity"
          value={newEvent.capacity}
          onChange={(e) => setNewEvent({ ...newEvent, capacity: +e.target.value })}
        />
        <button onClick={createEvent} style={{ marginLeft: "10px" }}>
          Create Event
        </button>
      </section>

      <section>
        <h2>Events List</h2>
        {events.length === 0 ? (
          <p>No events yet.</p>
        ) : (
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                <strong>{event.title}</strong> - {new Date(event.dateTime).toLocaleString()} - Capacity: {event.capacity}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
