import { useEffect, useState } from "react";
import IconProfile from "../../../assets/icon profile2.png";
import useAuth from "../../../store/auth";
import axiosInstance from "../../../api/axiosInstance";
import toast from "react-hot-toast";

export const useUserProfile = () => {
  const { setUser, setAvatar } = useAuth();
  const [user, setUserLocal] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarLocal, setAvatarLocal] = useState(IconProfile);

  const normalizeUser = (raw) => ({
    id: raw?.id || "",
    name: raw?.name || "",
    email: raw?.email || "",
    avatar: raw?.avatar || IconProfile,
    password: raw?.password || "",
  });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const parsed = normalizeUser(JSON.parse(savedUser));
      setUserLocal(parsed);
      setUsername(parsed.name);
      setEmail(parsed.email);
      setAvatarLocal(parsed.avatar);
      setUser(parsed);
      setAvatar(parsed.avatar);
    }
  }, []);

  const updateUser = async () => {
    if (!user || !user.id) {
      toast.error("User ID tidak ditemukan");
      return;
    }

    const updated = {
      ...user,
      name: username,
      email: email,
      avatar: avatarLocal,
      ...(password && { password }),
    };

    try {
      await axiosInstance.put(`/users/${user.id}`, updated);
      localStorage.setItem("user", JSON.stringify(updated));
      setUser(updated);
      setAvatar(avatarLocal);
      toast.success("Profil berhasil disimpan ke server");
      return updated;
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);
      toast.error("Gagal update profil");
    }
  };

  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    avatarLocal,
    setAvatarLocal,
    updateUser,
  };
};
