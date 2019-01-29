import React, { useState } from 'react'

const AddSubreddit = ({ addSubreddit }) => {
  const [input, setInput] = useState('')

  return (
    <div className="flex mb-2 ">
      <div className="bg-gradient-br-pink-pink-dark text-white font-semibold flex items-center px-4">
        /r/
      </div>
      <input
        className="py-4 bg-grey-40 text-white p-4 flex-1"
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => {
          console.log('KEYDOWN')
          if (e.keyCode === 13) {
            addSubreddit(input)
            setInput('')
          }
        }}
        value={input}
        type="text"
        placeholder="Type any subreddit in here to add it"
      />
      <button
        className="py-4 bg-grey-40 text-green p-4 uppercase tracking-wide border-l-4 border-black"
        onClick={() => {
          addSubreddit(input)
          setInput('')
        }}
      >
        Add Subreddit
      </button>
    </div>
  )
}

export default AddSubreddit
