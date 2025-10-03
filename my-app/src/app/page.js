'use client'

import Image from "next/image";
import Link from 'next/link';
import Dashboard from './components/Dashboard';
/*import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home';*/

/*<Router>
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/home" element={<Home />} />
  </Routes>
</Router>
export default function Page() {
  return (
    <Link href="../components/Dashboard">Dashboard</Link>
  );
}*/
export default function Page() {
  return <Dashboard />;
}