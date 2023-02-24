import React from 'react'
import '../styles/Styles.scss'
import NavBar from '../components/NavBar'

function Home() {
  return (
    <div className="container">
        <NavBar />
        <div className="bod">
            <h1>Because it's obvious</h1>
        </div>
        <div className="footer"></div>
    </div>
  )
}

export default Home
