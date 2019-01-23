import React from 'react'

const Subreddit = ({ subreddit, toggleActive }) => {
  return (
    <div
      onClick={() => toggleActive(subreddit)}
      className={
        'text-white flex items-center justify-center p-4 mx-2 my-2 ' +
        (subreddit.isActive ? 'bg-gradient-br-blue-teal' : 'bg-black-50')
      }
    >
      <p>{subreddit.name}</p>
    </div>
  )
}

export default Subreddit
