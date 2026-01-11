import { useEffect, useState } from "react";
import { API_URL } from "../config";
import { RegistrationList } from "./RegistrationList";
import {
  createAttendee,
  registerAttendeeToEvent,
  Registration,
} from "../services/registrationService";

export default function AdminDashboard() {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [registrationsUpdated, setRegistrationsUpdated] = useState(false);

  const fetchEvents = async () => {
    const res = await fetch(`${API_URL}/events`);
    const data = await res.json();
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, [registrationsUpdated]);

  const addSampleAttendee = async (eventId: string) => {
    const attendee = await createAttendee(
      "Juan Dela Cruz",
      `juan${Date.now()}@example.com`,
      "ABC Corp"
    );


    await registerAttendeeToEvent(eventId, attendee.id);
    setRegistrationsUpdated(!registrationsUpdated); // refresh events/registrations
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial",
        backgroundColor: "#f7f7f7",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Admin Dashboard</h1>

      {/* Create Event */}
      <section style={{ marginBottom: "30px" }}>
        <h2>Create Event</h2>
        <CreateEventForm
          onEventCreated={() => setRegistrationsUpdated(!registrationsUpdated)}
        />
      </section>

      {/* Events List */}
      <section>
        <h2>Events List</h2>
        {events.length === 0 ? (
          <p>No events yet.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gap: "16px",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            }}
          >
            {events.map((event) => (
              <div
                key={event.id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "16px",
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.1s",
                }}
              >
                <div>
                  <button
                    style={{
                      cursor: "pointer",
                      border: "none",
                      background: "none",
                      padding: 0,
                      textAlign: "left",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#007bff",
                      textDecoration: "underline",
                    }}
                    onClick={() => setSelectedEventId(event.id)}
                  >
                    {event.title}
                  </button>
                  <p style={{ margin: "4px 0", fontSize: "14px", color: "#555" }}>
                    {new Date(event.dateTime).toLocaleString()}
                  </p>
                  <p style={{ margin: "4px 0", fontSize: "14px", color: "#555" }}>
                    Capacity: {event.capacity}
                  </p>
                </div>

                <button
                  onClick={() => addSampleAttendee(event.id)}
                  style={{
                    marginTop: "10px",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  Add Sample Attendee
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Registrations List */}
      {selectedEventId && (
        <div style={{ marginTop: "30px" }}>
          <h2>Registrations</h2>
          <RegistrationList eventId={selectedEventId} />
        </div>
      )}
    </div>
  );
}

/* ------------------- CreateEventForm ------------------- */
interface CreateEventFormProps {
  onEventCreated: () => void;
}

function CreateEventForm({ onEventCreated }: CreateEventFormProps) {
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    location: "",
    dateTime: "",
    capacity: 0,
  });

  const handleCreateEvent = async () => {
    const res = await fetch(`${API_URL}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });
    if (!res.ok) {
      alert("Failed to create event");
      return;
    }
    setNewEvent({ title: "", description: "", location: "", dateTime: "", capacity: 0 });
    onEventCreated();
  };

  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
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
      <button onClick={handleCreateEvent} style={{ padding: "6px 12px" }}>
        Create Event
      </button>
    </div>
  );
}
