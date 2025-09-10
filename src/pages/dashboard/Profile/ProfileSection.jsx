import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";

import IconProfile from "../../../assets/icon profile2.png";
import {
  setUsername,
  setPassword,
  setAvatarLocal,
  updateUserProfile
} from "../../../store/redux/userSlice";

import "../../../css/profilesection.css";

const ProfileSection = () => {
  const dispatch = useDispatch();
  const { data: user, username, password, avatarLocal, loading } = useSelector((state) => state.user);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Ukuran gambar maksimal 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => dispatch(setAvatarLocal(reader.result));
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!username || !user?.email) {
      toast.error("Username dan email wajib diisi");
      return;
    }

    const updated = {
      ...user,
      name: username,
      password: password || user.password,
      avatar: avatarLocal || user.avatar
    };

  const result = await dispatch(updateUserProfile(updated));

  if (updateUserProfile.fulfilled.match(result)) {
    toast.success("Profil berhasil disimpan ke server");
  } else {
    toast.error(result.payload || "Gagal update profil");
  }
  };

  return (
    <div className="profile-section text-white p-4 rounded">
      <h4 className="mb-3">Profil Saya</h4>

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

      <Form className="form-wrapper">
        <div className="input-card position-relative">
          <label className="input-label">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => dispatch(setUsername(e.target.value))}
            className="input-inside"
            placeholder="Nama pengguna"
          />
          <i className="fas fa-pencil-alt edit-icon"></i>
        </div>

        <div className="input-card">
          <label className="input-label">Email</label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input-inside input-disabled"
          />
        </div>

        <div className="input-card position-relative">
          <label className="input-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            className="input-inside"
            placeholder="Kosongkan jika tidak ingin mengubah"
          />
          <i className="fas fa-pencil-alt edit-icon"></i>
        </div>
      </Form>

      <Button
        className="btn button-custom mt-3 rounded-pill"
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? "Menyimpan..." : "Simpan"}
      </Button>
    </div>
  );
};

export default ProfileSection;
