import React from "react";
import PageShell from "../hooks/PageShell";
import ProfileSection from "../dashboard/Profile/ProfileSection";
import MyListSection from "../dashboard/Profile/MyListSection";
import SubscriptionNotice from "../dashboard/Profile/SubscriptionNotice";
import "../../css/profile.css";

function Profile({ user, daftarSaya, onRemove }) {
  return (
    <PageShell>
      <div className="profile-header">
        <ProfileSection user={user} onSave={() => {}} />
        <SubscriptionNotice isSubscribed={user?.isSubscribed} />
      </div>
      <MyListSection daftar={daftarSaya} onRemove={onRemove} />
    </PageShell>
  );
}

export default Profile;
