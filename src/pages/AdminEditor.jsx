import React, {useEffect, useState} from 'react'
import { getProducts, getHome, getAnnouncement, getArchiveIndex, getAbout, saveOverride, clearOverride } from '../lib/content'

const OPTIONS = [
  {key:'home', label:'Home (JSON)'},
  {key:'products', label:'Products (JSON array)'},
  {key:'announcement', label:'Announcement (JSON)'},
  {key:'archive', label:'Archive (JSON array)'},
  {key:'about', label:'About (Markdown)'}
]

export default function AdminEditor(){
  const [selected, setSelected] = useState('home')
  const [content, setContent] = useState('')
  const [status, setStatus] = useState('')

  useEffect(()=>{
    load(selected)
  },[selected])

  async function load(key){
    setStatus('loading')
    try{
      if(key==='home') setContent(JSON.stringify(await getHome(), null, 2))
      if(key==='products') setContent(JSON.stringify(await getProducts(), null, 2))
      if(key==='announcement') setContent(JSON.stringify(await getAnnouncement(), null, 2))
      if(key==='archive') setContent(JSON.stringify(await getArchiveIndex(), null, 2))
      if(key==='about') setContent(await getAbout())
      setStatus('loaded')
    }catch(e){ setStatus('error') }
  }

  function save(){
    try{
      if(selected==='about'){
        // store as raw markdown string
        saveOverride('about', content)
      }else{
        const parsed = JSON.parse(content)
        saveOverride(selected, parsed)
      }
      setStatus('saved')
    }catch(e){ setStatus('invalid json') }
  }

  function reset(){
    clearOverride(selected)
    load(selected)
    setStatus('reset')
  }

  return (
    <div>
      <h1 style={{fontFamily:'Space Grotesk'}}>dev editor</h1>
      <div style={{margin:'12px 0 18px 0',color:'var(--muted)'}}>This editor saves overrides to <code>localStorage</code> only. It does not write files to disk.</div>

      <div style={{display:'flex',gap:12,marginBottom:12}}>
        {OPTIONS.map(o=> (
          <button key={o.key} onClick={()=>setSelected(o.key)} style={{padding:'8px 10px',border: selected===o.key ? '1px solid var(--accent)' : '1px solid rgba(0,0,0,0.06)'}}>{o.label}</button>
        ))}
      </div>

      <div>
        <textarea value={content} onChange={e=>setContent(e.target.value)} style={{width:'100%',height:420,fontFamily:'monospace',padding:12}} />
      </div>

      <div style={{display:'flex',gap:12,marginTop:12}}>
        <button className="btn" onClick={save}>save override</button>
        <button onClick={reset} style={{background:'transparent',border:0,color:'var(--muted)'}}>clear override</button>
        <div style={{color:'var(--muted)'}}>{status}</div>
      </div>
    </div>
  )
}
