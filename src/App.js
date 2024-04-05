import React, { useState, useEffect } from 'react';

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
            <h2>Shipment ID: {shipment.id}</h2>
            <p>Service: {shipment.service}</p>
            <p>Origin: {shipment.origin.address.addressLocality}</p>
            <p>Destination: {shipment.destination.address.addressLocality}</p>
            <p>Status: {shipment.status.status} at {shipment.status.timestamp}</p>
            <div>
              <h3>Events:</h3>
              {shipment.events.map((event, index) => (
                <div key={index}>
                  <p>{event.timestamp} - {event.description}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
