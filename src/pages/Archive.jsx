import React, {useEffect, useState} from 'react'
import { getArchiveIndex } from '../lib/content'

export default function Archive(){
  const [entries, setEntries] = useState([])

  useEffect(()=>{
    let mounted = true
    getArchiveIndex().then(a=>{ if(mounted) setEntries(a) }).catch(()=>{})
    return ()=>{ mounted=false }
  },[])

  return (
    <div>
      <h1 style={{fontFamily:'Space Grotesk'}}>archive</h1>
      <p style={{color:'var(--muted)'}}>a visual index of past projects.</p>
      <div style={{marginTop:24,display:'grid',gridTemplateColumns:'1fr',gap:28}}>
        {entries.map(e=> (
          <article key={e.id} style={{display:'flex',gap:18,alignItems:'center'}}>
            <img src={e.img} alt="" style={{width:240,height:160,objectFit:'cover'}} />
            <div>
              <div style={{fontSize:14,letterSpacing:'.08em',textTransform:'uppercase',color:'var(--muted)'}}>{e.year} — {e.tag}</div>
              <h3 style={{margin:'6px 0'}}>{e.title}</h3>
              <p style={{color:'var(--muted)',maxWidth:640}}>{e.summary}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
