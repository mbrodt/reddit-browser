import React from 'react'

const Subreddit = ({ subreddit, removeSubreddit, toggleActive }) => {
  return (
    <div
      onClick={() => toggleActive(subreddit)}
      className={
        'subreddit relative text-white flex items-center justify-center p-4 mx-2 my-2 cursor-pointer ' +
        (subreddit.isActive ? 'bg-gradient-br-blue-teal' : 'bg-black-50')
      }
    >
      <p>{subreddit.name}</p>
      <svg
        onClick={() => removeSubreddit(subreddit)}
        className="hidden absolute pin-t pin-r"
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 1L1 11M1 1L11 11"
          stroke="#8C0000"
          strokeOpacity="0.51"
          strokeWidth="3"
        />
      </svg>
    </div>
  )
}

export default Subreddit
