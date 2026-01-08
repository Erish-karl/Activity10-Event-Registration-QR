import { useState } from "react";
import { QrReader } from "react-qr-reader";

const API_URL = "http://localhost:3000"; // backend URL

export default function QRScanner() {
  const [scanResult, setScanResult] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleScan = async (data) => {
    if (data) {
      setScanResult(data);
      try {
        // data = registration.id from QR code
        const res = await fetch(`${API_URL}/registrations/${data}/checkin`, {
          method: "PATCH",
        });
        const json = await res.json();

        // Show check-in success
        setStatusMessage(`Check-in successful! Status: ${json.status}`);
      } catch (err) {
        setStatusMessage("Error checking in: " + err.message);
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>QR Scanner</h2>
      <QrReader
        onResult={(result, error) => {
          if (!!result) handleScan(result?.text);
        }}
        constraints={{ facingMode: "environment" }}
        style={{ width: "300px", margin: "20px auto" }}
      />
      <p><strong>Scanned QR ID:</strong> {scanResult}</p>
      <p style={{ color: "green", fontWeight: "bold" }}>{statusMessage}</p>
    </div>
  );
}
