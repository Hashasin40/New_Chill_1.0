import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../store/auth';
import '../css/logged.css'

function SignIn() {
    const navigate = useNavigate();
    const setUser = useAuth((state) => state.setUser);

    const handleLogin = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const foundUser = users.find(
        (u) => u.email === email && u.password === password
        );

        if (foundUser) {
        setUser({ username: foundUser.username, email: foundUser.email });
        navigate('/dashboard');
        } else {
        alert('Email atau password salah!');
        }
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center min-vh-100"
                style={{
                backgroundImage: 'url(/src/assets/background-login.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                }}
            >

            <form
                onSubmit={handleLogin}
                className="shadow p-4 rounded form "
                style={{ width: '100%', maxWidth: '400px',   backgroundColor: 'rgba(24, 26, 28, 0.7)', }}
            >
                <div className="d-flex flex-column align-items-center">
                    <h1> 
                        <i className="fas fa-clapperboard"></i>
                        CHILL</h1>
                    <h3 className='mt-4'>Daftar</h3>
                    <p className='mb-4'>Selamat Datang!</p>
                </div>

                <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="form-control rounded-pill custom-input"
                    required
                />
                </div>
                <div className="form-group mb-3">
                <label htmlFor="password">Password</label>
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="form-control rounded-pill custom-input"
                    required
                />
                </div>

                <div className="helper-links">
                <small>Belum punya akun? <Link to="/" className='link-no-underline'>Daftar</Link></small>
                <small><Link href="#" className="link-no-underline">Lupa kata sandi?</Link></small>
                </div>
                

                <button 
                    type="submit" 
                    className="btn btn-login mt-3 w-100 rounded-pill"
                >
                    Masuk
                </button>

                <div className="text-center mt-2">
                <small>
                    Atau
                </small>
                </div>

                <button className="btn-google w-100 d-flex align-items-center justify-content-center rounded-pill mt-2">
                    <img
                        src="/src/assets/icon google.png"
                        alt="Google"
                        style={{ width: '20px', marginRight: '10px' }}
                    />
                    Daftar dengan Google
                </button>

            </form>
            </div>
        </>
    );
}

export default SignIn;