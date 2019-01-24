import React from 'react'

const PostFooter = ({ post }) => (
  <div className="flex justify-between bg-gradient-r-blue-teal ">
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={`https://reddit.com/${post.subreddit}`}
      className="text-white flex items-center justify-center p-2 ml-6 my-2 bg-black-50 no-underline"
    >
      {post.subreddit}
    </a>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={`https://reddit.com/${post.permalink}`}
      className="flex items-center no-underline"
    >
      <svg
        className="fill-current text-grey-40 w-6 mr-2"
        viewBox="0 0 20 20"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Page-1" stroke="none" strokeWidth="1">
          <g id="icon-shape">
            <path
              d="M14,11 L8.00585866,11 C6.89706013,11 6,10.1081436 6,9.00798298 L6,1.99201702 C6,0.900176167 6.89805351,0 8.00585866,0 L17.9941413,0 C19.1029399,0 20,0.891856397 20,1.99201702 L20,9.00798298 C20,10.0998238 19.1019465,11 17.9941413,11 L17,11 L17,14 L14,11 Z M14,13 L14,15.007983 C14,16.1081436 13.1029399,17 11.9941413,17 L6,17 L3,20 L3,17 L2.00585866,17 C0.898053512,17 0,16.0998238 0,15.007983 L0,7.99201702 C0,6.8918564 0.897060126,6 2.00585866,6 L4,6 L4,8.99349548 C4,11.2060545 5.78916089,13 7.99620271,13 L14,13 Z"
              id="Combined-Shape"
            />
          </g>
        </g>
      </svg>
      <p className="font-bold text-white">{post.comments_num}</p>
    </a>
    <div className="flex items-center">
      <svg
        className="fill-current text-grey-40 w-6 mr-2"
        viewBox="0 0 20 20"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Page-1" stroke="none" strokeWidth="1">
          <g id="icon-shape">
            <path
              d="M11.0010436,0 C9.89589787,0 9.00000024,0.886706352 9.0000002,1.99810135 L9,8 L1.9973917,8 C0.894262725,8 0,8.88772964 0,10 L0,12 L2.29663334,18.1243554 C2.68509206,19.1602453 3.90195042,20 5.00853025,20 L12.9914698,20 C14.1007504,20 15,19.1125667 15,18.000385 L15,10 L12,3 L12,0 L11.0010436,0 L11.0010436,0 Z M17,10 L20,10 L20,20 L17,20 L17,10 L17,10 Z"
              id="Fill-97"
            />
          </g>
        </g>
      </svg>
      <p className="font-bold text-white">{post.score}</p>
    </div>
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="no-underline text-white font-bold tracking-normal uppercase px-8 border-l-2 border-black-50 flex  items-center"
      href={post.url}
    >
      <svg
        className="w-5 text-grey-40 fill-current"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
      >
        <path d="M14 3.41l-7.3 7.3a1 1 0 0 1-1.4-1.42L12.58 2H9a1 1 0 1 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V3.41zM12 11a1 1 0 0 1 2 0v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4c0-1.1.9-2 2-2h3a1 1 0 1 1 0 2H2v10h10v-3z" />
      </svg>
    </a>
  </div>
)

export default PostFooter
