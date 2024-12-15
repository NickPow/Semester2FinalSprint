import { render } from '@testing-library/react'
import CartItem from '../components/CartItem'
import { CartContext } from '../CartContext'

test('displays cart item name', () => {
  const item = { id:1, name:'Cart Item', price:5, image:'/test.jpg' }
  const { getByText } = render(
    <CartContext.Provider value={{removeFromCart:()=>{}}}>
      <CartItem item={item}/>
    </CartContext.Provider>
  )
  expect(getByText('Cart Item')).toBeInTheDocument()
})
