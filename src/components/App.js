import React, { useState } from 'react'
import snoowrap from 'snoowrap'

import Subreddits from './Subreddits'
import FetchButton from './FetchButton'
import PostList from './PostList'

const App = () => {
  const [posts, setPosts] = useState([])
  const [activeSubreddits, setActiveSubreddits] = useState([])

  const api = new snoowrap({
    userAgent: 'Alternative browser for reddit',
    clientId: 'JREKZSAtISgDeQ',
    clientSecret: 'XkG0s3aGB20-eZfYfHxSltxtih8',
    refreshToken: '12545867-NDXkedkdqxQQ87L7WmTusQnEaqs',
  })

  function getSubredditsFromChild(subreddits) {
    console.log('im the parent')
    let active = subreddits.filter(ele => ele.isActive)
    console.log('active', active)
    setActiveSubreddits(active)
  }

  function getPosts() {
    console.log('active subr', activeSubreddits)
    let fetched = activeSubreddits.map(subr => {
      return api
        .getSubreddit(subr.name)
        .getHot()
        .filter(post => post.score > 100)
        .map(post => {
          console.log('post', post)
          const body = post.selftext_html ? post.selftext_html : ''
          const excerpt = body
            .split(/\s+/)
            .slice(0, 50)
            .join(' ')
          return {
            subreddit: post.subreddit_name_prefixed,
            title: post.title,
            body: body,
            excerpt: excerpt,
            url: post.url,
            score: post.score,
            thumbnail: post.thumbnail,
            comments_num: post.num_comments,
          }
        })
      // .then(fetchedPosts => {
      //   console.log('POSTS', fetchedPosts)
      //   setPosts(fetchedPosts)
      // })
    })
    Promise.all(fetched).then(data => {
      const sorted = []
        .concat(...data)
        .sort((firstEl, secondEl) => secondEl.score - firstEl.score)
      setPosts(sorted)
    })
  }
  return (
    <>
      <div className="bg-gradient-l-purple p-16 mx-4 mt-4 mb-8 shadow-header">
        <div className="w-1/2 mx-auto">
          <Subreddits sendSubredditsToParent={getSubredditsFromChild} />
          <FetchButton getPosts={getPosts} />
        </div>
      </div>
      <PostList posts={posts} />
    </>
  )
}

export default App
