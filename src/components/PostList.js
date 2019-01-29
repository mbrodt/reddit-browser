import React from 'react'

import Post from './Post'

const PostList = ({ posts }) => {
  return (
    <div className="bg-black-20 container mx-auto border-t-4 border-pink-dark grid p-8 mb-8">
      {posts.map(post => (
        <Post post={post} key={post.title} />
      ))}
    </div>
  )
}

export default PostList
