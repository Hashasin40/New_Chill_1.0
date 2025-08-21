import React from "react";
import { Link } from "react-router-dom";
import "../../../css/subscriptionnotice.css";
import MegaPhone from "../../../assets/megaphone.png";

const SubscriptionNotice = ({ isSubscribed }) => {
  if (isSubscribed) return null;

  return (
    <div className="subscription-card">
        <img src={MegaPhone} className="card-icon" />        
        <div className="card-content">
            <h4 className="card-title">Fitur Premium</h4>
                <p className="card-text">
                    Beberapa series hanya tersedia untuk pengguna yang berlangganan.
                </p>
                    <Link to="/langganan" className="card-button">
                    Upgrade sekarang
                    </Link>
        </div>
    </div>
  );
};

export default SubscriptionNotice;
