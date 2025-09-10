import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/redux/userSlice';
import IconGoogle from '../assets/icon-google.png';
import BgSignIn from '../assets/background-login.jpg';
import '../css/logged.css';

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const result = await dispatch(loginUser({ email, password }));

    if (!result.error) {
      navigate('/dashboard');
    } else {
      alert(result.payload); // "Email atau password salah!" atau "Gagal login. Coba lagi nanti."
    }
  };

  const handleGoogleLogin = () => {
    alert('Fitur login dengan Google belum tersedia.');
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100"
      style={{
        backgroundImage: `url(${BgSignIn})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <form onSubmit={handleLogin} className="shadow p-4 rounded form"
        style={{
          width: '100%',
          maxWidth: '400px',
          backgroundColor: 'rgba(24, 26, 28, 0.7)',
        }}
      >
        <div className="d-flex flex-column align-items-center">
          <h1><i className="fas fa-clapperboard"></i> CHILL</h1>
          <h3 className="mt-4">Masuk</h3>
          <p className="mb-4">Selamat Datang!</p>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email">Email</label>
          <input name="email" type="email" className="form-control rounded-pill custom-input" required />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input name="password" type="password" className="form-control rounded-pill custom-input" required />
        </div>

        <div className="helper-links">
          <small>Belum punya akun? <Link to="/" className="link-no-underline">Daftar</Link></small>
          <small><Link to="#" className="link-no-underline">Lupa kata sandi?</Link></small>
        </div>

        <button type="submit" className="btn btn-login mt-3 w-100 rounded-pill" disabled={loading}>
          {loading ? 'Memproses...' : 'Masuk'}
        </button>

        <div className="text-center mt-2"><small>Atau</small></div>

        <button type="button" onClick={handleGoogleLogin}
          className="btn-google w-100 d-flex align-items-center justify-content-center rounded-pill mt-2"
        >
          <img src={IconGoogle} alt="Google" style={{ width: '20px', marginRight: '10px' }} />
          Masuk dengan Google
        </button>
      </form>
    </div>
  );
}

export default SignIn;
