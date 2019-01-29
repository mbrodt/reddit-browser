import React from 'react'

import PostFooter from './PostFooter'

const Post = ({ post }) => {
  let isOpen = false
  return (
    <div className="bg-black-40 flex flex-col justify-between">
      <div className="p-6">
        <p className="font-bold text-xl mb-4 text-blue-lighter">{post.title}</p>
        <div>
          <p
            className="text-teal-lightest overflow-x-hidden leading-normal"
            onClick={e => {
              e.persist()
              isOpen
                ? (e.currentTarget.innerHTML = post.excerpt)
                : (e.currentTarget.innerHTML = post.body)
              isOpen = !isOpen
              // console.log(e.currentTarget)
              // console.log(e)
              // e.currentTarget.innerHTML = post.body
            }}
            dangerouslySetInnerHTML={{
              __html: post.excerpt,
            }}
          >
            {/* {post.body
            .split(/\s+/)
            .slice(0, 50)
            .join(' ')} */}
          </p>
        </div>
      </div>
      <PostFooter post={post} />
      {/* <img src={post.thumbnail} alt="" /> */}
    </div>
  )
}

export default Post
