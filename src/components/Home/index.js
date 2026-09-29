import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <div className="home-container">
    <Header />

    <div className="home-content">
      <div className="home-text-container">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>

        <p className="home-description">
          Millions of people are searching for jobs, salary information, company
          reviews, and interview questions.
        </p>

        <Link to="/jobs">
          <button type="button" className="find-jobs-button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </div>
)

export default Home
