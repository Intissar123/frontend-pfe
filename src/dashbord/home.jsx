import React from 'react'
import Sidebar from './sidebar';
import Layout from './layout';
import { Outlet } from 'react-router-dom';

function Home() {
    return <div >
        <Sidebar></Sidebar>
        <Layout></Layout>
        <Outlet></Outlet>
        
  </div>;
}

export default Home