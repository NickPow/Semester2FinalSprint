import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

function PaymentForm({ onPaymentComplete }) {
  const stripe = useStripe()
  const elements = useElements()
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!stripe || !elements) return

    setProcessing(true)
    setError(null)

    // Normally, you'd create a PaymentIntent on the server and confirm here.
    // We'll simulate success:
    setTimeout(() => {
      setProcessing(false)
      onPaymentComplete()
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} style={{maxWidth:'300px', margin:'20px auto'}}>
      {error && <p style={{color:'red'}}>{error}</p>}
      <CardElement style={{base:{fontSize:'16px'}}}/>
      <button type="submit" disabled={!stripe || processing} style={{marginTop:'10px'}}>
        {processing ? 'Processing...' : 'Pay'}
      </button>
      <p style={{fontSize:'12px', marginTop:'10px'}}>
        Use test card: 4242 4242 4242 4242, any future expiry, any CVC
      </p>
    </form>
  )
}

export default PaymentForm
