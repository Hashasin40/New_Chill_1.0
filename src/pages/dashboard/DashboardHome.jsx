import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from './dashboardhome/Carousel';
import Series from './dashboardhome/Series';


function DashboardHome() {
    return (
        <>
            <Carousel />
            <Series />
        </>
    );
}

export default DashboardHome;
