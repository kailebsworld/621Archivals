import React, {useState, useEffect} from 'react'
import { getAnnouncement } from '../lib/content'

export default function AnnouncementBar(){
  const key = 'announcement-dismissed'
  const [show, setShow] = useState(()=>{
    try{ return !localStorage.getItem(key) }catch(e){return true}
  })
  const [text, setText] = useState('')

  useEffect(()=>{
    let mounted = true
    getAnnouncement().then(a=>{ if(mounted) setText(a.text || '') }).catch(()=>{})
    return ()=>{ mounted=false }
  },[])

  useEffect(()=>{ try{ if(!show) localStorage.setItem(key,'1') }catch(e){} },[show])

  if(!show || !text) return null
  return (
    <div className="announcement" role="region" aria-label="Announcement">
      <span>{text}</span>
      <button onClick={()=>setShow(false)} style={{marginLeft:12}} aria-label="Dismiss announcement">dismiss</button>
    </div>
  )
}
