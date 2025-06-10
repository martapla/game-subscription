import React from 'react'
import CheckList from './CheckList'

const Step1Connect = () => {
  return (
    <div className='step1-main'>

       
        <div>
            <h1> Connect your Account</h1>
            <p>...and unlock your benefits!</p>
        </div>

       < CheckList />

       <div>

            <input type="email" 
                placeholder='Email Address'
                className='input-email'
                required
            />
            <p> Send Me Offers, News, and Fun Stuff!</p>

            <button onClick={() => alert('Connect your account')}
                    className='btn-connect'>
                    Connect 

            </button>
       </div>



    </div>
  )
}

export default Step1Connect