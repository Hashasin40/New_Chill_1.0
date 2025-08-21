import React from "react";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";

import IconProfile from "../../../assets/icon profile2.png";
import { useUserProfile } from "../data/useUserProfile";

import "../../../css/profilesection.css";

const ProfileSection = () => {
  const {
    username,
    setUsername,
    email,
    password,
    setPassword,
    avatarLocal,
    setAvatarLocal,
    updateUser,
  } = useUserProfile();

  // Ganti foto avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setAvatarLocal(reader.result);
    reader.readAsDataURL(file);
  };

  // Simpan profil
  const handleSave = () => {
    if (!username || !email) {
      toast.error("Username dan email wajib diisi");
      return;
    }

    updateUser(); // updateUser akan simpan sebagai 'name'
    toast.success("Profil berhasil disimpan");
  };

  return (
    <div className="profile-section text-white p-4 rounded">
      {/* Title */}
      <h4 className="mb-3">Profil Saya</h4>

      {/* Avatar */}
<div className="d-flex align-items-center gap-3 mb-3">
  <img
    src={avatarLocal || IconProfile}
    alt="Avatar"
    className="rounded-circle border avatar-image"
  />

  <div className="d-flex flex-column">
    <Form.Group controlId="formFile" className="mb-1">
      <Form.Label className="btn btn-outline-primary rounded-pill px-4 py-2">
        Ganti Foto
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
          className="d-none"
        />
      </Form.Label>
    </Form.Group>

    <small className="upload-note">
      <i className="bi bi-floppy"></i> Maksimal 2MB
    </small>
  </div>
</div>


      {/* Form */}
<Form className="form-wrapper">
  <div className="input-card position-relative">
    <label className="input-label">Username</label>
    <input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="input-inside"
      placeholder="Nama pengguna"
    />
    <i className="fas fa-pencil-alt edit-icon"></i>
  </div>

  <div className="input-card">
    <label className="input-label">Email</label>
    <input
      type="email"
      value={email}
      readOnly
      className="input-inside input-disabled"
    />
  </div>

  <div className="input-card position-relative">
    <label className="input-label">Password</label>
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="input-inside"
      placeholder="Kosongkan jika tidak ingin mengubah"
    />
    <i className="fas fa-pencil-alt edit-icon"></i>
  </div>
</Form>
    <Button className="btn button-custom mt-3 rounded-pill" onClick={handleSave}>
    Simpan
    </Button>


    </div>
  );
};

export default ProfileSection;
