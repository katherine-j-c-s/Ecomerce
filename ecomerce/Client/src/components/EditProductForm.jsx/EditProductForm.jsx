import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProductById, clearProductDetail } from '../../redux/actions'

export default function EditProductForm() {
  const dispatch = useDispatch()
  const detail  = useSelector(state => state.productDetail)
  useEffect(() => {
    console.log();
    dispatch(getProductById())
    return () => {
      dispatch(clearProductDetail())
    }
}, [])
  return (
    <div>EditProductForm</div>
  )
}
