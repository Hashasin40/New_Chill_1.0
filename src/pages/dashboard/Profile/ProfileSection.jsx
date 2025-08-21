import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import toast from "react-hot-toast";
import useAuth from "../../../store/auth"; // pastikan path sesuai

const ProfileSection = () => {
  const user = useAuth((state) => state.user);
  const setUser = useAuth((state) => state.setUser);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Sync dengan store saat komponen mount
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleSave = () => {
    if (!name || !email) {
      toast.error("Nama dan email wajib diisi");
      return;
    }

    const updatedUser = {
      ...user,
      name,
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
          <Form.Label>Nama</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama lengkap"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email aktif"
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
