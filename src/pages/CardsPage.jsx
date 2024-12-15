import React, { useEffect, useState } from 'react'
import { fetchProducts } from '../api'
import ProductCard from '../components/ProductCard'
import ProductFilters from '../components/ProductFilters'
import { motion } from 'framer-motion'

function CardsPage() {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [sortKey, setSortKey] = useState('name')
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    fetchProducts('cards').then(data => {
      setProducts(data)
      setFiltered(data)
    })
  }, [])

  useEffect(() => {
    let res = products.filter(p => p.name.toLowerCase().includes(keyword.toLowerCase()))
    if (sortKey === 'name') res.sort((a,b)=>a.name.localeCompare(b.name))
    if (sortKey === 'price') res.sort((a,b)=>a.price - b.price)
    setFiltered(res)
  }, [keyword, sortKey, products])

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
      <div className="main-content page-container">
        <h2>Cards</h2>
        <ProductFilters onFilter={setKeyword} onSort={setSortKey} />
        <div className="product-list">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </motion.div>
  )
}

export default CardsPage
