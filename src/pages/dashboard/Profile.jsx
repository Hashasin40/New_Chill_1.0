import React from "react";
import ProfileSection from "../dashboard/Profile/ProfileSection";
import MyListSection from "../dashboard/Profile/MyListSection";
import SubscriptionNotice from "../dashboard/Profile/SubscriptionNotice";
import "../../css/profile.css"; // Tambahkan file CSS ini

function Profile({ user, daftarSaya, onRemove }) {
  return (
    <div className="profile-page">
      <div className="profile-header">
        <ProfileSection user={user} onSave={() => {}} />
        <SubscriptionNotice isSubscribed={user?.isSubscribed}/>
      </div>
      <MyListSection daftar={daftarSaya} onRemove={onRemove} />
    </div>
  );
}

export default Profile;
