import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProduct, fetchReviews, addReview } from '../api'
import { CartContext } from '../CartContext'
import { AuthContext } from '../AuthContext'
import { motion } from 'framer-motion'

function ProductDetailsPage() {
  const { id } = useParams()
  const { addToCart } = useContext(CartContext)
  const { user } = useContext(AuthContext)

  const [product, setProduct] = useState(null)
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState('')
  const [comment, setComment] = useState('')
  const [reviewError, setReviewError] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchProduct(id)
      .then(data => {
        if (!data || !data.id) {
          setError('not_found')
        } else {
          setProduct(data)
        }
      })
      .catch(() => setError('not_found'))
    
    fetchReviews(id).then(setReviews)
  }, [id])

  const handleAddReview = async() => {
    setReviewError(null)
    if (!rating || !comment) {
      setReviewError('Please provide a rating and comment.')
      return
    }
    try {
      const newRev = await addReview(Number(id), user.id, user.username, rating, comment)
      setReviews([...reviews, newRev])
      setRating('')
      setComment('')
    } catch (e) {
      setReviewError(e.message)
    }
  }

  if (error === 'not_found') return <div className="main-content product-details"><h2>Product not found.</h2></div>
  if (!product) return <div className="main-content product-details">Loading...</div>

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      <div className="main-content product-details">
        <Link to="/" style={{display:'inline-block', marginBottom:'10px'}}>← Back to Home</Link>
        <img src={product.image} alt={product.name} className="large-image" />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p><b>Price: </b>${product.price.toFixed(2)}</p>
        <p><b>Available Quantity: </b>{product.quantity}</p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>

        <div className="reviews-section" style={{marginTop:'40px'}}>
          <h3>Reviews</h3>
          {reviews.length === 0 && <p>No reviews yet.</p>}
          {reviews.map(r => (
            <div key={r.id} className="review">
              <p><b>{r.username}</b> - {r.rating} stars</p>
              <p>{r.comment}</p>
              <p style={{fontSize:'0.8em', color:'#555'}}>{r.date}</p>
            </div>
          ))}

          {user && (
            <div className="review-form">
              <h4>Add a Review</h4>
              {reviewError && <p style={{color:'red'}}>{reviewError}</p>}
              <label>Rating:</label>
              <select value={rating} onChange={e=>setRating(e.target.value)}>
                <option value="">Select</option>
                <option value="1">1 - Poor</option>
                <option value="2">2 - Fair</option>
                <option value="3">3 - Good</option>
                <option value="4">4 - Very Good</option>
                <option value="5">5 - Excellent</option>
              </select>
              <label>Comment:</label>
              <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="Your review..." />
              <button onClick={handleAddReview}>Submit Review</button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProductDetailsPage
