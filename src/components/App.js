import React, { useState } from 'react'
import snoowrap from 'snoowrap'
import { SwappingSquaresSpinner } from 'react-epic-spinners'

import Subreddits from './Subreddits'
import FetchButton from './FetchButton'
import PostList from './PostList'

import tw from '../../tailwind'

const App = () => {
  const [posts, setPosts] = useState([])
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

  function getPosts() {
    if (!activeSubreddits.length) {
      setIsError(true)
      return
    }
    setIsError(false)
    setIsLoading(true)
    let fetched = activeSubreddits.map(subr => {
      return api
        .getSubreddit(subr.name)
        .getHot()
        .filter(post => post.score > 50)
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
          <FetchButton
            getPosts={getPosts}
            disabled={isLoading || !activeSubreddits.length}
          />
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
