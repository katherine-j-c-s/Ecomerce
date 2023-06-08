import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProductById, clearProductDetail } from '../../redux/actions'
import CreateProduct from '../createProduct/createProduct'

export default function EditProductForm() {
  const {productToEdit}  = useSelector(state => state)
  useEffect(() => {
    console.log(productToEdit);
  }, [productToEdit])
  return (
    <div className='w-full'>
      <CreateProduct/>
    </div>
  )
}
