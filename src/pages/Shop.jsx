import React, {useState, useEffect} from 'react'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../lib/content'

export default function Shop(){
  const [query,setQuery] = useState('')
  const [products,setProducts] = useState([])

  useEffect(()=>{
    let mounted = true
    getProducts().then(p=>{ if(mounted) setProducts(p) }).catch(()=>{})
    return ()=>{ mounted=false }
  },[])

  const filtered = products.filter(p=> p.title.toLowerCase().includes(query.toLowerCase()))
  return (
    <div>
      <header style={{paddingTop:10,paddingBottom:10}}>
        <h1 style={{margin:0,fontSize:56,fontFamily:'Space Grotesk'}}>shop</h1>
        <div style={{marginTop:8,color:'var(--muted)'}}>catalogue</div>
      </header>

      <div style={{marginTop:18,marginBottom:18,display:'flex',gap:12}}>
        <input aria-label="search" placeholder="search" value={query} onChange={e=>setQuery(e.target.value)} style={{padding:8,border:'1px solid rgba(0,0,0,0.06)'}} />
      </div>

      <section className="grid">
        {filtered.map(p=> <ProductCard key={p.id} p={p} />)}
      </section>
    </div>
  )
}
