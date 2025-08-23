import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import RequireAuth from "./component/RequireAuth";

// Lazy load pages
const SignIn = React.lazy(() => import("./pages/SignIn"));
const SignUp = React.lazy(() => import("./pages/SignUp"));
const DashboardLayout = React.lazy(() => import("./pages/dashboard/DashboardLayout"));
const DashboardHome = React.lazy(() => import("./pages/dashboard/DashboardHome"));
const Profile = React.lazy(() => import("./pages/dashboard/Profile"));
const Settings = React.lazy(() => import("./pages/dashboard/Settings"));
const DaftarSaya = React.lazy(() => import("./pages/dashboard/DaftarSaya"));
const Film = React.lazy(() => import("./pages/dashboard/Film"));

function App() {
  return (
    <>
      {/* ✅ Toast Notification */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          success: {
            style: {
              background: "#198754",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#dc3545",
              color: "#fff",
            },
          },
        }}
      />

      {/* ✅ Suspense fallback */}
      <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <DashboardLayout />
              </RequireAuth>
            }
          >
            <Route index element={<DashboardHome />} />
            <Route path="film" element={<Film />} />
            <Route path="daftarsaya" element={<DaftarSaya />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
