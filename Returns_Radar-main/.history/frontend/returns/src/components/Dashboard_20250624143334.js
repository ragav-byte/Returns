import React, { useState } from "react";
import GeminiPopup from "../GeminiPopup";
import ReturnHistory from "./ReturnHistory";
import "./Dashboard.css";

function Dashboard({ user }) {
  const [orderId, setOrderId] = useState("");
  const [productId, setProductId] = useState("");
  const [reason, setReason] = useState("");
  const [image, setImage] = useState(null);
  const [popupData, setPopupData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Upload product image!");

    const formData = new FormData();
    formData.append("orderId", orderId);
    formData.append("productId", productId);
    formData.append("returnReason", reason);
    formData.append("productMedia", image);

    try {
      const res = await fetch("http://localhost:3000/generate-return-review", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setPopupData(data);
      setShowPopup(true);
    } catch (err) {
      alert("Backend error");
      console.error(err);
    }
  };

  return (
    <div className="dash-container">
      <div className="dash-header">
        <h2>Welcome, {user.email}</h2>
        <button className="clock-btn" onClick={() => setShowHistory(!showHistory)}>⏰ View History</button>
      </div>

      {showHistory && <ReturnHistory user={user} />}

      <form onSubmit={handleSubmit} className="return-form">
        <input
          type="text"
          placeholder="Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          required
        />
        <textarea
          placeholder="Return Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button type="submit">Submit Return</button>
      </form>

      {showPopup && popupData && (
        <GeminiPopup data={popupData} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
}

export default Dashboard;
