import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/dashboard.css';

function GenreList() {
    const genres = [
        'Aksi', 'Drama', 'Komedi', 'Sains & Alam',
        'Anak-anak', 'Fantasi Ilmiah & Fantasi', 'Petualangan', 'Thriller',
        'Anime', 'Kejahatan', 'Perang', 'Romantis',
        'Britania', 'KDrama'
    ];

    return (
        <div className="col-12 col-md-5"> {/* atau 4 */}
        <h6 className="text-uppercase mb-3 fw-bold">Genre</h6>
        <ul className="list-unstyled d-flex flex-wrap genre-list footer-link-list">
            {genres.map((genre, index) => (
            <li key={index} className="genre-item">
                <Link to="#" className="text-decoration-none">{genre}</Link>
            </li>
            ))}
        </ul>
        </div>
    );
}

export default GenreList;
