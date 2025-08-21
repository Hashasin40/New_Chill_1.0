import { useEffect, useState } from "react";
import IconProfile from "../../../assets/icon profile2.png";
import useAuth from "../../../store/auth";

export const useUserProfile = () => {
  const { setUser, setAvatar } = useAuth();
  const [user, setUserLocal] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarLocal, setAvatarLocal] = useState(IconProfile);

  // ✅ Normalisasi data user agar konsisten
  const normalizeUser = (raw) => ({
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

  const updateUser = () => {
    const updated = {
      ...user,
      name: username,
      email: email,
      avatar: avatarLocal,
      ...(password && { password }),
    };
    localStorage.setItem("user", JSON.stringify(updated));
    setUser(updated);
    setAvatar(avatarLocal);
    return updated;
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
