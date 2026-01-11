import React, { useEffect, useState } from "react";
import {
  getRegistrations,
  checkInRegistration,
  Registration,
} from "../services/registrationService";

interface Props {
  eventId: string;
}

export const RegistrationList: React.FC<Props> = ({ eventId }) => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  const fetchRegistrations = async () => {
    const data = await getRegistrations(eventId);
    setRegistrations(data);
  };

  useEffect(() => {
    fetchRegistrations();
  }, [eventId]);

  const handleCheckIn = async (id: string) => {
    await checkInRegistration(id);
    fetchRegistrations(); // refresh after check-in
  };

  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        backgroundColor: "#fff",
      }}
    >
      {registrations.length === 0 ? (
        <p>No registrations yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {registrations.map((reg) => (
            <li
              key={reg.id}
              style={{
                marginBottom: "12px",
                padding: "12px",
                border: "1px solid #ddd",
                borderRadius: "6px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: reg.status === "checked-in" ? "#dcedc8" : "#fff",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                <span>
                  {reg.attendeeId} - Status: {reg.status}
                </span>
                {reg.status === "pending" && (
                  <button
                    onClick={() => handleCheckIn(reg.id)}
                    style={{
                      padding: "4px 8px",
                      borderRadius: "4px",
                      border: "none",
                      cursor: "pointer",
                      backgroundColor: "#4caf50",
                      color: "#fff",
                    }}
                  >
                    Check-In
                  </button>
                )}
              </div>

              {/* QR Code */}
              {reg.status === "checked-in" && reg.qrCode && (
                <img
                  src={reg.qrCode}
                  alt="QR Code"
                  style={{ width: "120px", height: "120px", objectFit: "contain" }}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
