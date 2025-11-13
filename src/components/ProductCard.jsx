import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({p}){
  return (
    <article className="product-card">
      <div className="overlay">
        <Link to={`/product/${p.id}`} aria-label={`View ${p.title}`}>
          <img src={p.images[0]} alt={p.title} />
        </Link>
      </div>
      <div className="meta">{p.tag}</div>
      <div className="title"><Link to={`/product/${p.id}`} style={{textDecoration:'none',color:'inherit'}}>{p.title}</Link></div>
      <div className="price">${p.price}</div>
      <div className="hover" style={{display:'none'}}>view product</div>
    </article>
  )
}
