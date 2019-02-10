import React, { useState, useEffect } from 'react'

import AddSubreddit from './AddSubreddit'
import Subreddit from './Subreddit'

const useLocalStorage = (key, initialValue) => {
  const [item, setInnerValue] = useState(() => {
    try {
      return window.localStorage.getItem(key)
        ? JSON.parse(window.localStorage.getItem(key))
        : initialValue
    } catch (err) {
      return initialValue
    }
  })

  const setValue = value => {
    try {
      setInnerValue(value)
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch (err) {
      console.log('error', err)
    }
  }

  return [item, setValue]
}

const Subreddits = ({ sendSubredditsToParent }) => {
  const initVal = [
    { name: 'webdev', isActive: true },
    { name: 'cscareerquestions', isActive: true },
    // { name: 'web_design', isActive: true },
    // { name: 'reactjs', isActive: true },
    // { name: 'javascript', isActive: true },
    // { name: 'learnprogramming', isActive: true },
  ]
  const [subreddits, setSubreddits] = useLocalStorage('subreddits', initVal)

  useEffect(
    () => {
      sendSubredditsToParent(subreddits)
    },
    [subreddits]
  )

  function addSubreddit(name) {
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

  function removeSubreddit(name) {
    let index = subreddits.indexOf(name)
    subreddits.splice(index, 1)
    setSubreddits([...subreddits])
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
            removeSubreddit={removeSubreddit}
            toggleActive={toggleActive}
            key={subreddit.name}
          />
        ))}
      </div>
    </div>
  )
}

export default Subreddits
