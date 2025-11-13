import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { getHome, getProducts } from '../lib/content'

export default function Home(){
  const [home, setHome] = useState(null)
  const [products, setProducts] = useState([])

  useEffect(()=>{
    let mounted = true
    getHome().then(h=>{ if(mounted) setHome(h) }).catch(()=>{})
    getProducts().then(p=>{ if(mounted) setProducts(p) }).catch(()=>{})
    return ()=>{ mounted=false }
  },[])

  const heroImg = home?.hero?.media || (products[0]?.images?.[0])

  return (
    <div>
      <section className="hero">
        <div className="eyebrow">{home?.hero?.eyebrow || 'limited runs'}</div>
        <h1>{home?.hero?.title || 'pieces from the archive. pieces for the street.'}</h1>
        <p className="editorial">{home?.hero?.lede || '621 ARCHIVAL is a queer led design and merch label.'}</p>
        <div style={{maxWidth:820}}>
          {heroImg && <img src={heroImg} alt="hero" className="media" />}
        </div>
        <div style={{display:'flex',gap:18,marginTop:18}}>
          <Link to="/shop" style={{textDecoration:'none',color:'var(--accent)',fontWeight:600}}>enter shop</Link>
          <Link to="/archive" style={{textDecoration:'none',color:'var(--ink)'}}>view archive</Link>
        </div>
      </section>

      <section className="split">
        <div className="panel">
          <h3>shop</h3>
          <p>Limited edition garments and printed matter. careful runs, straightforward details.</p>
          <div className="grid" style={{marginTop:20}}>
            {products.slice(0,3).map(p=> <ProductCard key={p.id} p={p} />)}
          </div>
        </div>

        <div className="panel">
          <h3>archive</h3>
          <p>Past projects presented as a visual index — campaigns, zines, and prints.</p>
          <div className="archive-strip">
            <div className="archive-item"><img src="/content/images/archive-2024.jpg" alt="a" /><div className="label">2024 — campaign</div></div>
            <div className="archive-item"><img src="/content/images/zine-2023.jpg" alt="b" /><div className="label">2023 — zine</div></div>
            <div className="archive-item"><img src="/content/images/editorial-2022.jpg" alt="c" /><div className="label">2022 — editorial</div></div>
          </div>
        </div>

        <div className="panel">
          <h3>about</h3>
          <p className="editorial">short statement. modest, direct, and exact. we make objects meant to be used and read. everything here is meant to last beyond the drop.</p>
        </div>
      </section>
    </div>
  )
}
