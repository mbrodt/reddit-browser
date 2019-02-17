import React, { useState } from 'react'

import PostFooter from './PostFooter'

const Post = ({ post }) => {
  const [isOpen, setIsOpen] = useState(false)
  let excerpt = post.body
  const words = post.body.split(/\s+/)
  const EXCERPT_SIZE = 50
  const isLong = words.length > EXCERPT_SIZE
  if (isLong) {
    excerpt = words.slice(0, EXCERPT_SIZE).join(' ')
  }
  const content = isOpen ? post.body : excerpt
  return (
    <div className="bg-black-40 flex flex-col justify-between">
      <div className="p-6">
        <p className="font-bold text-xl mb-4 text-blue-lighter">{post.title}</p>
        <div>
          <p
            className="text-teal-lightest overflow-x-hidden leading-normal"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />
          {isLong && <ExpandButton isOpen={isOpen} setIsOpen={setIsOpen} />}
        </div>
      </div>
      <PostFooter post={post} />
      {/* <img src={post.thumbnail} alt="" /> */}
    </div>
  )
}

const ExpandButton = ({ isOpen, setIsOpen }) => {
  return (
    <button
      className="text-white py-2 hover:bg-purple-lighter"
      onClick={e => {
        e.persist()
        setIsOpen(!isOpen)
      }}
    >
      {isOpen ? (
        <div className="flex items-center">
          <p className="mr-1">See less</p>
          <svg
            className="w-3 h-3 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M7 10v8h6v-8h5l-8-8-8 8h5z" />
          </svg>
        </div>
      ) : (
        <div className="flex items-center">
          <p className="mr-1">See more</p>
          <svg
            className="w-3 h-3 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M7 10V2h6v8h5l-8 8-8-8h5z" />
          </svg>
        </div>
      )}
    </button>
  )
}

export default Post
