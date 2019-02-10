import React from 'react'

const FetchButton = ({ getPosts, disabled }) => (
  <button
    className="bg-gradient-r-orange-pink font-bold p-8 text-3xl text-white uppercase mt-16 mx-auto block"
    onClick={getPosts}
    disabled={disabled}
  >
    Get posts
  </button>
)

export default FetchButton
