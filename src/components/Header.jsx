import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function Header(){
  const {count} = useCart()
  const isDev = typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV
  return (
    <header className="site-header" role="banner">
      <div className="inner">
        <div className="brand"><Link to="/" style={{textDecoration:'none',color:'inherit'}}>621 ARCHIVAL</Link></div>
        <nav className="nav" role="navigation" aria-label="Main navigation">
          <Link to="/archive">archive</Link>
          <Link to="/shop">shop</Link>
          <Link to="/about">about</Link>
          {isDev && <Link to="/admin">admin</Link>}
          <Link to="/cart" className="cart-indicator">cart {count? `(${count})`: ''}</Link>
        </nav>
      </div>
    </header>
  )
}
