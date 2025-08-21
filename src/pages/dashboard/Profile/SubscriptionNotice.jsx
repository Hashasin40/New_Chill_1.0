import React from "react";

const SubscriptionNotice = ({ isSubscribed }) => {
  if (isSubscribed) return null;

  return (
    <div className="subscription-notice bg-warning text-dark p-3 rounded mt-4">
      <strong>🔒 Fitur Premium</strong>
      <p className="mb-0">
        Beberapa series hanya tersedia untuk pengguna yang berlangganan. 
        <a href="/langganan" className="text-dark fw-bold ms-1">Upgrade sekarang →</a>
      </p>
    </div>
  );
};

export default SubscriptionNotice;
