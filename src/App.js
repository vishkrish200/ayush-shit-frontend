import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS for styling
// import './ShipmentTable.css'; // This will be your CSS file for styling


function App() {
  const [orderId, setOrderId] = useState('');
  const [shipmentData, setShipmentData] = useState(null);

  async function fetchData() {
    try {
      const response = await fetch(`http://localhost:3000/getDHL`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setShipmentData(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }


  return (
    <div className="App">
      <h1>Shipment Tracker</h1>
      <input
        type="text"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        placeholder="Enter Order ID"
      />
      <button onClick={fetchData}>Track Shipment</button>
      {shipmentData && (
        shipmentData.shipments.map((shipment, index) => (
          <div key={index}>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Service</th>
                  <th>Origin</th>
                  <th>Destination</th>
                  <th>Status</th>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{shipment.id}</td>
                  <td>{shipment.service}</td>
                  <td>{shipment.origin.address.addressLocality}</td>
                  <td>{shipment.destination.address.addressLocality}</td>
                  <td>{shipment.status.status}</td>
                  <td>{shipment.status.timestamp}</td>
                </tr>
              </tbody>
            </table>
            <h3>Events:</h3>
            <table>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Description</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {shipment.events.map((event, evtIndex) => (
                  <tr key={evtIndex}>
                    <td>{event.timestamp}</td>
                    <td>{event.description}</td>
                    <td>{event.location.address.addressLocality}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
      
    </div>
  );
}

export default App;
