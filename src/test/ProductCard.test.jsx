import { render } from '@testing-library/react'
import ProductCard from '../components/ProductCard'
import { CartContext } from '../CartContext'

test('renders product name', () => {
  const product = { id:1, name:'Test Product', price:9.99, image:'/test.jpg' }
  const { getByText } = render(
    <CartContext.Provider value={{addToCart:()=>{}}}>
      <ProductCard product={product}/>
    </CartContext.Provider>
  )
  expect(getByText('Test Product')).toBeInTheDocument()
})
