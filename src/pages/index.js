import React, { useState, useEffect } from 'react'
import snoowrap from 'snoowrap'

import Layout from '../components/layout'
import SEO from '../components/seo'
import '../css/custom.css'

const IndexPage = () => (
  // <Layout>
  <div>
    <div className="bg-gradient-l-purple p-16 m-4 shadow-header">
      <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
      <div className="w-1/2 mx-auto">
        <SubReddits />
        <FetchButton />
      </div>
    </div>
    <PostList />
  </div>
  // <div className="container mx-auto">
  //   <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
  //   <SubReddits />
  //   <PostList />
  // </div>
  // </Layout>
)

const FetchButton = () => (
  <button className="bg-gradient-r-orange-pink font-bold p-8 text-3xl text-white uppercase mt-12 mx-auto block">
    Get posts
  </button>
)

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

const SubReddits = () => {
  const [subreddits, setSubreddits] = useState([
    { name: 'webdev', isActive: true },
    { name: 'cscareer', isActive: false },
    { name: 'omgthisisthelongestredditever', isActive: false },
    { name: 'hey', isActive: true },
    { name: 'verylongreddithaha', isActive: false },
    { name: 'asasasmasas', isActive: true },
    { name: 'ok', isActive: true },
    { name: 'asasasmasasasasaaasasas', isActive: false },
    { name: 'qqasa', isActive: true },
  ])

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
      <div
        className="flex flex-wrap -ml-2"
        // style={{
        //   display: 'grid',
        //   gridTemplateColumns: 'repeat(3,1fr)',
        //   gridGap: '20px',
        // }}
      >
        {subreddits.map(subreddit => (
          <SubReddit
            subreddit={subreddit}
            toggleActive={toggleActive}
            key={subreddit.name}
          />
        ))}
      </div>
    </div>
  )
}

const SubReddit = ({ subreddit, toggleActive }) => {
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

const PostList = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    console.log('USEEFFECT')
    const r = new snoowrap({
      userAgent: 'Alternative browser for reddit',
      clientId: 'JREKZSAtISgDeQ',
      clientSecret: 'XkG0s3aGB20-eZfYfHxSltxtih8',
      refreshToken: '12545867-NDXkedkdqxQQ87L7WmTusQnEaqs',
    })
    r.getSubreddit('webdev')
      .getHot()
      .filter(post => post.score > 100)
      .map(post => {
        console.log('post', post)
        return {
          subreddit: post.subreddit_name_prefixed,
          title: post.title,
          body: post.selftext,
          url: post.url,
          score: post.score,
          thumbnail: post.thumbnail,
          comments_num: post.num_comments,
        }
      })
      .then(posts => {
        console.log('POSTS', posts)
        setPosts(posts)
      })
  }, [])
  return (
    <div className="bg-black-20 container mx-auto border-t-4 border-pink-dark grid p-8">
      {posts.map(post => (
        <Post post={post} key={post.title} />
      ))}
    </div>
  )
}

const Post = ({ post }) => (
  <div className="bg-black-40 flex flex-col justify-between">
    <div className="p-6">
      <p className="font-bold text-xl mb-4 text-blue-lighter">{post.title}</p>
      <div>
        <p
          className="text-teal-lightest"
          onClick={e => {
            e.persist()
            console.log(e)
          }}
        >
          {post.body
            .split(/\s+/)
            .slice(0, 50)
            .join(' ')}
        </p>
      </div>
    </div>
    <PostFooter post={post} />
    {/* <img src={post.thumbnail} alt="" /> */}
  </div>
)

const PostFooter = ({ post }) => (
  <div className="flex justify-between bg-gradient-r-blue-teal ">
    <p className="text-white flex items-center justify-center p-2 ml-6 my-2 bg-black-50">
      {post.subreddit}
    </p>
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
              d="M14,11 L8.00585866,11 C6.89706013,11 6,10.1081436 6,9.00798298 L6,1.99201702 C6,0.900176167 6.89805351,0 8.00585866,0 L17.9941413,0 C19.1029399,0 20,0.891856397 20,1.99201702 L20,9.00798298 C20,10.0998238 19.1019465,11 17.9941413,11 L17,11 L17,14 L14,11 Z M14,13 L14,15.007983 C14,16.1081436 13.1029399,17 11.9941413,17 L6,17 L3,20 L3,17 L2.00585866,17 C0.898053512,17 0,16.0998238 0,15.007983 L0,7.99201702 C0,6.8918564 0.897060126,6 2.00585866,6 L4,6 L4,8.99349548 C4,11.2060545 5.78916089,13 7.99620271,13 L14,13 Z"
              id="Combined-Shape"
            />
          </g>
        </g>
      </svg>
      <p className="font-bold text-white">{post.comments_num}</p>
    </div>
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
    <button className="px-8 border-l-2 border-black-50">
      <a
        className="no-underline text-white font-bold tracking-normal uppercase"
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
    </button>
  </div>
)

export default IndexPage
