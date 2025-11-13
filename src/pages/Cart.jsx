import React from 'react'
import { useCart } from '../context/CartContext'

export default function Cart(){
  const {items, remove, updateQty, clear} = useCart()
  const subtotal = items.reduce((s,i)=>s + i.price * i.qty, 0)
  const stripeKey = typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY : undefined
  const [showInstructions, setShowInstructions] = React.useState(false)

  return (
    <div style={{paddingTop:10}}>
      <h1 style={{fontFamily:'Space Grotesk'}}>cart</h1>
      {items.length===0 ? <p style={{color:'var(--muted)'}}>your cart is empty.</p> : (
        <div>
          <div className="cart-list">
            {items.map(it=> (
              <div key={it.id} className="cart-item">
                <img src={it.image || 'https://picsum.photos/80/80'} alt="thumb" />
                <div style={{flex:1}}>
                  <div style={{fontWeight:600}}>{it.title}</div>
                  <div style={{color:'var(--muted)',fontSize:13}}>Qty <input type="number" value={it.qty} onChange={e=>updateQty(it.id, Math.max(1, Number(e.target.value)))} style={{width:56,marginLeft:8}}/></div>
                </div>
                <div style={{textAlign:'right'}}>${(it.price*it.qty).toFixed(2)} <div><button onClick={()=>remove(it.id)} style={{border:0,background:'transparent',color:'var(--muted)'}}>remove</button></div></div>
              </div>
            ))}
          </div>

          <div style={{marginTop:18,textAlign:'right'}}>
            <div style={{color:'var(--muted)'}}>subtotal</div>
            <div style={{fontSize:20,fontWeight:700}}>${subtotal.toFixed(2)}</div>
            <div style={{marginTop:12}}>
              {stripeKey ? (
                <button className="btn" onClick={()=>alert('Connect your serverless create-checkout-session endpoint to complete checkout.')}>checkout (demo)</button>
              ) : (
                <button className="btn" onClick={()=>setShowInstructions(s=>!s)}>checkout</button>
              )}
            </div>
            {showInstructions && (
              <div style={{textAlign:'left',marginTop:12,padding:12,border:'1px solid rgba(0,0,0,0.04)',background:'#fff'}}>
                <strong style={{display:'block',marginBottom:8}}>Stripe Checkout — demo instructions</strong>
                <div style={{color:'var(--muted)',fontSize:13}}>This scaffold includes an example serverless function at <code>/serverless/create-checkout-session.example.js</code>. To enable live checkout:
                  <ol>
                    <li>Deploy the example function to Netlify/Vercel or any server and set <code>STRIPE_SECRET_KEY</code>.</li>
                    <li>Set <code>VITE_STRIPE_PUBLISHABLE_KEY</code> in your dev/.env and rebuild.</li>
                    <li>Update the client call to POST cart items to your function and redirect to Checkout.</li>
                  </ol>
                </div>
              </div>
            )}

            <div style={{marginTop:8}}><button onClick={clear} style={{border:0,background:'transparent',color:'var(--muted)'}}>clear cart</button></div>
          </div>
        </div>
      )}
    </div>
  )
}
