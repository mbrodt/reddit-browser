import React, { useState, useEffect } from 'react'

import AddSubreddit from './AddSubreddit'
import Subreddit from './Subreddit'

const Subreddits = ({ sendSubredditsToParent }) => {
  const [subreddits, setSubreddits] = useState([
    { name: 'webdev', isActive: true },
    { name: 'cscareerquestions', isActive: true },
    { name: 'web_design', isActive: true },
    { name: 'reactjs', isActive: true },
    { name: 'javascript', isActive: true },
    { name: 'learnprogramming', isActive: true },
  ])

  useEffect(
    () => {
      console.log('EFFECT')
      sendSubredditsToParent(subreddits)
    },
    [subreddits]
  )

  function addSubreddit(name) {
    console.log('adding', name)
    let exists = false
    subreddits.forEach(subreddit => {
      if (subreddit.name === name) {
        exists = true
        return //break out of the foreach
      }
    })
    if (!exists) {
      let subreddit = {
        name: name,
        isActive: true,
      }
      setSubreddits([subreddit, ...subreddits])
    }
  }

  function toggleActive(subreddit) {
    let updated = subreddits.map(ele => {
      if (ele.name === subreddit.name) {
        return {
          isActive: !subreddit.isActive,
          name: subreddit.name,
        }
      } else {
        return ele
      }
    })
    setSubreddits(updated)
  }

  return (
    <div>
      <AddSubreddit addSubreddit={addSubreddit} />
      <div className="flex flex-wrap -ml-2">
        {subreddits.map(subreddit => (
          <Subreddit
            subreddit={subreddit}
            toggleActive={toggleActive}
            key={subreddit.name}
          />
        ))}
      </div>
    </div>
  )
}

export default Subreddits
