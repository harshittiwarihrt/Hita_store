import React,{useState} from 'react'
import Link from 'next/link'
import {HiOutlineEmojiSad} from 'react-icons/hi'
const cancel = () => {

  return (
    <div className='cancel-wrapper'>
      <div className='cancel'>
        <p className='icon'>
            <HiOutlineEmojiSad size = "100" />
        </p>
        <h3>Sorry to see you here!</h3>
        <h2>Your transaction was not able to process</h2>
        <p className='description'>
            If you have any questions, please email : 
            <a className='email' href='mailto:harshittiwarirt@gmail.com'>harshittiwarirt@gmail.com</a>
        </p>
        <Link href="/">
            <button type='button' width='300px' className='btn'>Continue shopping</button>
        </Link>
      </div>
    </div>
  )
}

export default cancel
