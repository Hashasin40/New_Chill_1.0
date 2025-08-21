import React from "react";
import { Link } from "react-router-dom";
import "../../../css/subscriptionnotice.css";

const SubscriptionNotice = ({ isSubscribed }) => {
  if (isSubscribed) return null;

  return (
    <div className="subscription-card">
      <div className="card-icon">🔒</div>
      <div className="card-content">
        <h4 className="card-title">Fitur Premium</h4>
        <p className="card-text">
          Beberapa series hanya tersedia untuk pengguna yang berlangganan.
        </p>
        <Link to="/langganan" className="card-button">
          Upgrade sekarang →
        </Link>
      </div>
    </div>
  );
};

export default SubscriptionNotice;
