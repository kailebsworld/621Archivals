import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { getProducts } from '../lib/content'

export default function Product(){
  const { id } = useParams()
  const { add } = useCart()
  const [product, setProduct] = useState(null)

  useEffect(()=>{
    let mounted = true
    getProducts().then(list=>{ if(mounted) setProduct(list.find(x=>x.id===id)) }).catch(()=>{})
    return ()=>{ mounted=false }
  },[id])

  if(!product) return <div>Not found</div>

  const p = product

  return (
    <div className="product-page">
      <div className="product-images">
        <img src={p.images[0]} alt={p.title} />
      </div>
      <aside className="product-side">
        <div className="title">{p.title}</div>
        <div className="price">${p.price}</div>
        <div style={{marginTop:16}}>
          <label style={{display:'block',fontSize:12,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--muted)'}}>size</label>
          <select style={{marginTop:8,padding:8}}>
            <option>one size</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
          </select>
        </div>
        <div style={{marginTop:18}}>
          <button className="btn" onClick={()=>add({id:p.id,title:p.title,price:p.price,qty:1})}>add to cart</button>
        </div>

        <div style={{marginTop:28,fontSize:14,color:'var(--muted)'}}>
          <h4 style={{margin:'0 0 8px 0',fontSize:12,letterSpacing:'.08em',textTransform:'uppercase'}}>details</h4>
          <p style={{margin:0}}>{p.description || 'fabric: 100% cotton. fit: boxy. care: wash cold, line dry. origin: made in small runs.'}</p>
        </div>
      </aside>
    </div>
  )
}
