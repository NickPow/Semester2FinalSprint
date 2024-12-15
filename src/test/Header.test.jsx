import { render } from '@testing-library/react'
import Header from '../components/Header'
import { AuthContext } from '../AuthContext'
import { CartContext } from '../CartContext'

test('Header shows Home, Comics, Cards links', () => {
  const { getByText } = render(
    <AuthContext.Provider value={{ user: null }}>
      <CartContext.Provider value={{ notification: null }}>
        <Header />
      </CartContext.Provider>
    </AuthContext.Provider>
  )
  
  expect(getByText('Comic & Card Store')).toBeInTheDocument()
  expect(getByText('Home')).toBeInTheDocument()
  expect(getByText('Comics')).toBeInTheDocument()
  expect(getByText('Cards')).toBeInTheDocument()
})
