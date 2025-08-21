import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import useAuth from "../../../store/auth";

const ProfileSection = () => {
  const user = useAuth((state) => state.user);
  const setUser = useAuth((state) => state.setUser);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sync dengan store saat komponen mount
  useEffect(() => {
    if (user) {
      setUsername(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSave = () => {
    if (!username || !email) {
      toast.error("Username dan email wajib diisi");
      return;
    }

    const updatedUser = {
      ...user,
      name: username,
      email,
      ...(password && { password }),
    };

    setUser(updatedUser);
    toast.success("Profil berhasil disimpan");
  };

  return (
    <div className="profile-section bg-dark text-white p-4 rounded">
      <h4 className="mb-3">👤 Profil Saya</h4>

      <div className="d-flex align-items-center gap-3 mb-3">
        <img
          src={user?.avatar || "/default-avatar.png"}
          alt="Avatar"
          className="rounded-circle"
          style={{ width: "64px", height: "64px", objectFit: "cover" }}
        />
        <Button variant="secondary" size="sm">Ganti Foto</Button>
      </div>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nama pengguna"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            readOnly
            placeholder="Email aktif"
            className="bg-secondary bg-opacity-25 text-light"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password Baru</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Kosongkan jika tidak ingin mengubah"
          />
        </Form.Group>

        <Button variant="primary" onClick={handleSave}>
          💾 Simpan
        </Button>
      </Form>
    </div>
  );
};

export default ProfileSection;
