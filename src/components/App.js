import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import snoowrap from 'snoowrap'
import { SwappingSquaresSpinner } from 'react-epic-spinners'

import Subreddits from './Subreddits'
import FetchButton from './FetchButton'
import PostList from './PostList'

import tw from '../../tailwind'

const App = () => {
  const [posts, setPosts] = useState([])
  const [upvoteCount, setUpvoteCount] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [activeSubreddits, setActiveSubreddits] = useState([])

  const api = new snoowrap({
    userAgent: 'Alternative browser for reddit',
    clientId: 'JREKZSAtISgDeQ',
    clientSecret: 'XkG0s3aGB20-eZfYfHxSltxtih8',
    refreshToken: '12545867-NDXkedkdqxQQ87L7WmTusQnEaqs',
  })

  function getSubredditsFromChild(subreddits) {
    let active = subreddits.filter(ele => ele.isActive)
    setActiveSubreddits(active)
  }

  function getUpvotesFromChild(valueObj) {
    setUpvoteCount(valueObj)
  }

  function getPosts() {
    // probably not needed since button is disabled with no active subreddits
    // if (!activeSubreddits.length) {
    //   setIsError(true)
    //   return
    // }
    setIsError(false)
    setIsLoading(true)
    let fetched = activeSubreddits.map(subr => {
      return api
        .getSubreddit(subr.name)
        .getHot()
        .filter(post => post.score > upvoteCount.value)
        .filter(post => !post.stickied)
        .map(post => {
          return createPost(post)
        })
    })
    Promise.all(fetched)
      .then(data => {
        const sorted = []
          .concat(...data)
          .sort((firstEl, secondEl) => secondEl.score - firstEl.score)
        setPosts(sorted)
        setIsLoading(false)
      })
      .catch(err => {
        setIsError(true)
        setIsLoading(false)
      })
  }
  return (
    <>
      <div className="bg-gradient-l-purple p-16 mx-4 mt-4 mb-8 shadow-header">
        <div className="w-1/2 mx-auto">
          <Subreddits sendSubredditsToParent={getSubredditsFromChild} />
          <div className="mt-12">
            <UpvoteSelect sendUpvotesToParent={getUpvotesFromChild} />
            <FetchButton
              getPosts={getPosts}
              disabled={isLoading || !activeSubreddits.length}
            />
          </div>
        </div>
      </div>

      {isLoading && (
        // <div className="mx-auto">
        <SwappingSquaresSpinner
          className="mx-auto mb-8"
          color={tw.colors['pink-dark']}
        />
        // </div>
      )}
      {isError && <Error />}
      {posts.length > 0 && <PostList posts={posts} />}
    </>
  )
}

const UpvoteSelect = ({ sendUpvotesToParent }) => {
  const options = [
    { value: 25, label: '25 Upvotes' },
    { value: 50, label: '50 Upvotes' },
    { value: 100, label: '100 Upvotes' },
  ]

  const [currentUpvotes, setCurrentUpvotes] = useState(options[1])
  useEffect(
    () => {
      sendUpvotesToParent(currentUpvotes)
    },
    [currentUpvotes]
  )
  return (
    <div className="w-1/3 mx-auto mb-4">
      <p className="text-center text-blue-lighter text-xs mb-2">
        Only show posts above this upvote count
      </p>
      <Select
        className=""
        onChange={value => setCurrentUpvotes(value)}
        value={currentUpvotes}
        options={options}
      />
    </div>
  )
}

const createPost = post => {
  const body = post.selftext_html ? post.selftext_html : ''

  return {
    subreddit: post.subreddit_name_prefixed,
    title: post.title,
    created: post.created_utc * 1000, //multiplied by 1000 to get seconds rather than ms
    body: body,
    url: post.url,
    permalink: post.permalink,
    score: post.score,
    thumbnail: post.thumbnail,
    comments_num: post.num_comments,
  }
}

const Error = () => {
  return (
    <p className="text-center mb-8 text-3xl text-red">
      Something went wrong. Maybe one of the subreddits don't exist?
    </p>
  )
}

export default App
