import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import IconGoogle from '../assets/icon-google.png';
import BgSignUp from '../assets/background-signup.jpg';
import IconProfile from "../assets/icon profile2.png";
import '../css/logged.css';

function SignUp() {
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const form = e.target;

    const newUser = {
      name: form.username.value,
      email: form.email.value,
      password: form.password.value,
      avatar: IconProfile,
    };

    try {
      const res = await axiosInstance.get('/users');
      const existing = res.data.find(u => u.email === newUser.email);
      if (existing) return alert('Email sudah terdaftar.');

      await axiosInstance.post('/users', newUser);
      navigate('/signin');
    } catch (err) {
      console.error('Signup error:', err);
      alert('Gagal daftar. Coba lagi nanti.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage: `url(${BgSignUp})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <form onSubmit={handleSignup} className="shadow p-4 rounded form"
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'rgba(24, 26, 28, 0.7)',
        }}
      >
        <div className="d-flex flex-column align-items-center">
          <h1><i className="fas fa-clapperboard"></i> CHILL</h1>
          <h3 className="mt-4">Daftar</h3>
          <p className="mb-4">Selamat Datang!</p>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="username">Username</label>
          <input name="username" className="form-control rounded-pill custom-input" required />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input name="email" type="email" className="form-control rounded-pill custom-input" required />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input name="password" type="password" className="form-control rounded-pill custom-input" required />
        </div>

        <small>Sudah punya akun? <Link to="/signin" className="link-no-underline">Masuk</Link></small>

        <button type="submit" className="btn btn-login mt-3 w-100 rounded-pill">Daftar</button>

        <div className="text-center mt-2"><small>Atau</small></div>

        <button className="btn-google w-100 d-flex align-items-center justify-content-center rounded-pill">
          <img src={IconGoogle} alt="Google" style={{ width: '20px', marginRight: '10px' }} />
          Daftar dengan Google
        </button>
      </form>
    </div>
  );
}

export default SignUp;
