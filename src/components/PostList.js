import React from 'react'

import Post from './Post'

const PostList = ({ posts }) => {
  return (
    <div className="bg-black-20 container mx-auto border-t-4 border-pink-dark grid p-8 mb-8">
      {posts.map((post, index) => (
        <Post post={post} key={index} />
      ))}
    </div>
  )
}

export default PostList
