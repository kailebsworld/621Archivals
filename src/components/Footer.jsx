import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer(){
  return (
    <footer className="site-footer">
      <div style={{maxWidth:980,margin:'0 auto'}}>
        <div style={{marginBottom:10}}>
          <Link to="/archive" style={{marginRight:12}}>archive</Link>
          <Link to="/shop" style={{marginRight:12}}>shop</Link>
          <Link to="/about" style={{marginRight:12}}>about</Link>
          <Link to="/info" style={{marginRight:12}}>info</Link>
        </div>
        <div>queer led, independent, based in [city]</div>
      </div>
    </footer>
  )
}
