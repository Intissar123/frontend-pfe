import React from 'react'
import Sidebar1 from './sidebar1';
import Layout1 from './layout1';
import { Outlet } from "react-router-dom";

function Home1() {
    return <div class="app">
        <Sidebar1></Sidebar1>
        <Layout1></Layout1>
        <Outlet></Outlet>
        
  </div>;
}

export default Home1