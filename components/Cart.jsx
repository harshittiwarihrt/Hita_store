import React, {useEffect, useRef} from 'react'
import Link from 'next/link'
import {AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping} from 'react-icons/ai'
import {TiDeleteOutline} from 'react-icons/ti'
import toast from 'react-hot-toast'

import { useStateContext } from '../context/StateContext'
import { urlFor } from '../lib/client'
import getStripe from '../lib/getStripe'

const Cart = () => {
  const cartRef = useRef();
  const {totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemQuantity, onRemove}  = useStateContext()
  const handleCheckout = async ()=>{
    const stripe = await getStripe();
    const response = await fetch('/api/stripe', {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(cartItems),
    })

    if(response.statusCode === 500) return;

    const data = await response.json()
    toast.loading('Redirecting..')

    stripe.redirectToCheckout({ sessionId: data.id});
  }

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button type='button' className='cart-heading' onClick={()=>setShowCart(false)}>
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>
        <div className='topCartDetailDiv topCartDetailDivM' style={{fontWeight:"600"}}>To pay with stripe in test mode, use card information</div>
        <div className='topCartDetailDiv'>Card number :&nbsp; <span style={{fontWeight:"600"}}> 4242424242424242</span></div>
        <div className='topCartDetailDiv topCartDetailDiv2'>
          <span>Expiry :&nbsp;<span style={{fontWeight:"600"}}>04/24</span></span>
          <span>Cvc :&nbsp; <span style={{fontWeight:"600"}}>424</span> </span>
        </div>

        {cartItems.length<1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href={"/"}>
              <button type='button' onClick={()=>setShowCart(false)} className='btn'>
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className='product-container'>
          {cartItems.length>=1 && cartItems.map((item)=> (
            <div className='product' key={item._id}>
              <img src={urlFor(item?.image[0])} className='cart-product-image'/>
              <div className='item-desc'>
                <div className='flex top'>
                  <h5>{item.name}</h5>
                  <h4>Rs. {item.price}</h4>
                </div>
                <div className='flex bottom'>
                  <div>
                    <p className='quantity-desc'>
                      <span className='minus' onClick={()=>toggleCartItemQuantity(item._id, 'desc')}>
                          <AiOutlineMinus />
                      </span>
                      <span className='num' onClick=''>
                          {item.quantity}
                      </span>
                      <span className='plus' onClick={()=>toggleCartItemQuantity(item._id, 'inc')}>
                          <AiOutlinePlus />
                      </span>
                    </p>
                  </div>
                  <button type='button' className='remove-item' onClick={()=>onRemove(item)}>
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length>=1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Sub total : Rs <span>{totalPrice}</span></h3>
            </div>
            <br/>

            <div className='btn-containerLast'>
              <button type='button' className='btnLast' onClick={handleCheckout}>
                Pay with Stripe
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
