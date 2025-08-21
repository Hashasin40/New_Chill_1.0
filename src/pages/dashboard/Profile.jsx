import React from "react";
import ProfileSection from "../dashboard/Profile/ProfileSection";
import MyListSection from "../dashboard/Profile/MyListSection";
import SubscriptionNotice from "../dashboard/Profile/SubscriptionNotice";

function Profile({ user, daftarSaya, onRemove }) {
  return (
    <div className="profile-page">
      <div>
        <ProfileSection user={user} onSave={() => {}} />
        <MyListSection daftar={daftarSaya} onRemove={onRemove} />
      </div>
      <SubscriptionNotice />
    </div>
  );
}

export default Profile;
