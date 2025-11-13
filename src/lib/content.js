import fallbackProducts from '../data/products'

let _cache = {}

function loadOverride(key){
  try{
    const raw = localStorage.getItem(`content:${key}`)
    if(!raw) return null
    return JSON.parse(raw)
  }catch(e){
    return null
  }
}

async function fetchJSON(url){
  const res = await fetch(url, {cache: 'no-store'})
  if(!res.ok) throw new Error('Fetch failed')
  return res.json()
}

async function fetchText(url){
  const res = await fetch(url, {cache: 'no-store'})
  if(!res.ok) throw new Error('Fetch failed')
  return res.text()
}

export async function getProducts(){
  const override = loadOverride('products')
  if(override) return override
  if(_cache.products) return _cache.products
  try{
    const p = await fetchJSON('/content/products.json')
    _cache.products = p
    return p
  }catch(e){
    _cache.products = fallbackProducts
    return fallbackProducts
  }
}

export async function getHome(){
  const override = loadOverride('home')
  if(override) return override
  if(_cache.home) return _cache.home
  try{
    const h = await fetchJSON('/content/home.json')
    _cache.home = h
    return h
  }catch(e){
    return {
      hero: {
        eyebrow: 'limited runs',
        title: 'pieces from the archive. pieces for the street.',
        lede: '621 ARCHIVAL is a queer led design and merch label working at the intersection of protest, publishing, and functional clothing. short runs. quiet politics. printed like a poster.',
        media: '/content/images/hero.svg'
      },
      links: {shop:'/shop', archive:'/archive'}
    }
  }
}

export async function getAnnouncement(){
  const override = loadOverride('announcement')
  if(override) return override
  if(_cache.announcement) return _cache.announcement
  try{
    const a = await fetchJSON('/content/announcement.json')
    _cache.announcement = a
    return a
  }catch(e){
    return {text: 'drop 01 live now — limited runs', dismissible: true}
  }
}

export async function getArchiveIndex(){
  const override = loadOverride('archive')
  if(override) return override
  if(_cache.archive) return _cache.archive
  try{
    const a = await fetchJSON('/content/archive.json')
    _cache.archive = a
    return a
  }catch(e){
    return []
  }
}

export async function getAbout(){
  const override = loadOverride('about')
  if(override) return override
  if(_cache.about) return _cache.about
  try{
    const md = await fetchText('/content/about.md')
    _cache.about = md
    return md
  }catch(e){
    return '621 ARCHIVAL makes limited runs of printed matter and garments. our approach is editorial.'
  }
}

export function saveOverride(key, value){
  try{
    localStorage.setItem(`content:${key}`, JSON.stringify(value))
    _cache[key] = value
    return true
  }catch(e){ return false }
}

export function clearOverride(key){
  try{ localStorage.removeItem(`content:${key}`); delete _cache[key]; return true }catch(e){return false}
}
