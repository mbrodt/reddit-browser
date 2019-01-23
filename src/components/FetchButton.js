import React from 'react'

const FetchButton = ({ getPosts }) => (
  <button
    className="bg-gradient-r-orange-pink font-bold p-8 text-3xl text-white uppercase mt-12 mx-auto block"
    onClick={getPosts}
  >
    Get posts
  </button>
)

export default FetchButton
