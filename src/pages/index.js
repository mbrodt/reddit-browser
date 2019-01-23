import React from 'react'

import App from '../components/App'
import SEO from '../components/seo'
import '../css/style.css'
import '../css/custom.css'

const IndexPage = () => (
  <>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <App />
  </>
)

export default IndexPage
