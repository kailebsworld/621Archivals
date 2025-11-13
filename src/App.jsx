import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import Archive from './pages/Archive'
import About from './pages/About'
import Cart from './pages/Cart'
import AdminEditor from './pages/AdminEditor'
import Header from './components/Header'
import Footer from './components/Footer'
import AnnouncementBar from './components/AnnouncementBar'

export default function App(){
  return (
    <div className="site-root">
      <AnnouncementBar />
      <Header />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/shop" element={<Shop/>} />
          <Route path="/product/:id" element={<Product/>} />
          <Route path="/archive" element={<Archive/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/admin" element={<AdminEditor/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
