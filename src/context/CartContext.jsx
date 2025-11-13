import React, {createContext, useContext, useEffect, useState} from 'react'

const CartContext = createContext()

export function CartProvider({children}){
  const [items, setItems] = useState(()=>{
    try{ const raw=localStorage.getItem('cart') ; return raw? JSON.parse(raw): [] }catch(e){return []}
  })

  useEffect(()=>{
    try{ localStorage.setItem('cart', JSON.stringify(items)) }catch(e){}
  },[items])

  function add(item){
    setItems(prev=>{
      const found = prev.find(p=>p.id===item.id)
      if(found){
        return prev.map(p=> p.id===item.id? {...p, qty: p.qty+ (item.qty||1)}: p)
      }
      return [...prev, {...item, qty: item.qty||1}]
    })
  }
  function remove(id){ setItems(prev=>prev.filter(p=>p.id!==id)) }
  function updateQty(id, qty){ setItems(prev=> prev.map(p=> p.id===id? {...p, qty}: p)) }
  function clear(){ setItems([]) }
  const count = items.reduce((s,i)=>s+i.qty,0)

  return (
    <CartContext.Provider value={{items,add,remove,updateQty,clear,count}}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(){ return useContext(CartContext) }
