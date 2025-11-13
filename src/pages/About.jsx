import React from 'react'

export default function About(){
  return (
    <div style={{maxWidth:680}}>
import React, {useEffect, useState} from 'react'
import { getAbout } from '../lib/content'

export default function About(){
  const [md, setMd] = useState('')

  useEffect(()=>{
    let mounted = true
    getAbout().then(text=>{ if(mounted) setMd(text) }).catch(()=>{})
    return ()=>{ mounted=false }
  },[])

  return (
    <div style={{maxWidth:680}}>
      <h1 style={{fontFamily:'Space Grotesk'}}>about</h1>
      <div style={{color:'var(--muted)',marginTop:12}}>a short manifesto</div>
      <div style={{marginTop:20,whiteSpace:'pre-wrap',color:'var(--muted)'}} dangerouslySetInnerHTML={{__html: md.replace(/\n/g, '<br/>')}} />
    </div>
  )
}
    </div>
  )
}
