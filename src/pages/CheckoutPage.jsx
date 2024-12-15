import React, { useContext, useState } from 'react'
import { CartContext } from '../CartContext'
import { motion } from 'framer-motion'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import PaymentForm from '../components/PaymentForm'

const stripePromise = loadStripe('pk_test_1234567890abcdefg') // Your Stripe test public key

function CheckoutPage() {
  const { cart, setCart } = useContext(CartContext)
  const [message, setMessage] = useState(null)

  const onPaymentComplete = () => {
    setMessage('Payment Successful!')
    setCart([])
  }

  if (message) return <div className="main-content checkout-confirmation">{message}</div>

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      <div className="main-content checkout-page">
        <h2>Checkout</h2>
        <p>Enter your payment details below:</p>
        <Elements stripe={stripePromise}>
          <div className="payment-form-container">
            <PaymentForm onPaymentComplete={onPaymentComplete}/>
          </div>
        </Elements>
      </div>
    </motion.div>
  )
}

export default CheckoutPage
