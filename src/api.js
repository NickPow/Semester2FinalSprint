import axios from 'axios'
import bcrypt from 'bcryptjs'

const API_URL = 'http://localhost:3001'

export async function fetchProducts(category) {
  const { data } = await axios.get(`${API_URL}/products`)
  return category ? data.filter(p => p.category === category) : data
}

export async function fetchProduct(id) {
  const { data } = await axios.get(`${API_URL}/products/${id}`)
  return data
}

// Cart
export async function getCart() {
  const { data } = await axios.get(`${API_URL}/cart`)
  return data
}

export async function addCartItem(item) {
  const { data } = await axios.post(`${API_URL}/cart`, item)
  return data
}

export async function removeCartItem(id) {
  await axios.delete(`${API_URL}/cart/${id}`)
}

export async function updateUser(userId, oldPassword, newUsername, newPassword, address, city, province, postal) {
  const { data: user } = await axios.get(`${API_URL}/users/${userId}`)
  const valid = bcrypt.compareSync(oldPassword, user.password)
  if (!valid) throw new Error('Invalid current password')

  let updatedData = { ...user }
  if (newUsername && newUsername.trim() !== '') updatedData.username = newUsername
  if (newPassword && newPassword.trim() !== '') {
    updatedData.password = bcrypt.hashSync(newPassword, 10)
  }
  if (address !== undefined) updatedData.address = address
  if (city !== undefined) updatedData.city = city
  if (province !== undefined) updatedData.province = province
  if (postal !== undefined) updatedData.postal = postal

  const { data: updatedUser } = await axios.put(`${API_URL}/users/${userId}`, updatedData)
  return updatedUser
}

export async function registerUser(username, password) {
  const { data: users } = await axios.get(`${API_URL}/users`)
  if (users.find(u => u.username === username)) {
    throw new Error('User exists')
  }
  const hashed = bcrypt.hashSync(password, 10)
  const { data: newUser } = await axios.post(`${API_URL}/users`, { username, password: hashed })
  return newUser
}

export async function loginUser(username, password) {
  const { data: users } = await axios.get(`${API_URL}/users`)
  const user = users.find(u => u.username === username)
  if (!user) throw new Error('Invalid credentials')
  const valid = bcrypt.compareSync(password, user.password)
  if (!valid) throw new Error('Invalid credentials')
  const token = btoa(JSON.stringify({ id: user.id, username: user.username }))
  return { user, token }
}

// Mock payment (in real scenario: integrate stripe on server-side)
export async function processPayment(cart) {
  return new Promise(resolve => {
    // Simulate success
    setTimeout(() => resolve({ success: true, message: 'Payment Successful!' }), 500)
  })
}

// Reviews
export async function fetchReviews(productId) {
  const { data } = await axios.get(`${API_URL}/reviews?productId=${productId}`)
  return data
}

export async function addReview(productId, userId, username, rating, comment) {
  const reviewData = {
    productId,
    userId,
    username,
    rating: parseInt(rating),
    comment,
    date: new Date().toISOString().split('T')[0]
  }
  const { data: newReview } = await axios.post(`${API_URL}/reviews`, reviewData)
  return newReview
}
