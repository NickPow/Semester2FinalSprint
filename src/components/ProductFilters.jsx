import React from 'react'

function ProductFilters({ onFilter, onSort }) {
  const handleKeyword = (e) => onFilter(e.target.value)
  const handleSort = (e) => onSort(e.target.value)

  return (
    <div className="filters">
      <input type="text" placeholder="Search..." onChange={handleKeyword} />
      <select onChange={handleSort}>
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>
    </div>
  )
}

export default ProductFilters
