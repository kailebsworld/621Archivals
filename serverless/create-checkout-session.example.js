/*
  Example serverless function for creating a Stripe Checkout session.
  Deploy this as a Netlify Function, Vercel Serverless Function, or any server endpoint.

  Replace process.env.STRIPE_SECRET_KEY with your secret key.

  Example (Netlify) filename: `functions/create-checkout-session.js`
*/

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

exports.handler = async function(event, context){
  try{
    const body = JSON.parse(event.body || '{}')
    const line_items = (body.items || []).map(i => ({ price_data: {
      currency: 'usd',
      product_data: { name: i.title },
      unit_amount: Math.round(i.price * 100)
    }, quantity: i.qty }))

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      success_url: body.successUrl || 'https://your-site.example/success',
      cancel_url: body.cancelUrl || 'https://your-site.example/cancel'
    })

    return { statusCode: 200, body: JSON.stringify({id: session.id}) }
  }catch(err){
    return { statusCode: 500, body: JSON.stringify({error: err.message}) }
  }
}
