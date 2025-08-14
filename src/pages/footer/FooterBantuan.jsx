import React from 'react';
import { Link } from 'react-router-dom';
import '../../css/dashboard.css';

function BantuanList() {
    return (
        <>
        <div className="col-12 col-md-3 ms-auto">
            <h6 className="text-uppercase mb-3">Bantuan</h6>
            <ul className="list-unstyled footer-link-list">
                <li><Link href="#" className=" text-decoration-none ">Kontak</Link></li>
                <li><Link href="#" className=" text-decoration-none ">FAQ</Link></li>
                <li><Link href="#" className=" text-decoration-none ">Syarat & Ketentuan</Link></li>
                <li><Link href="#" className=" text-decoration-none ">Kebijakan Privasi</Link></li>
            </ul>
        </div>
        </>
    )
}

export default BantuanList;