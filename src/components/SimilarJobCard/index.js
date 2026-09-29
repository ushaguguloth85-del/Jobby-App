import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const SimilarJobCard = props => {
  const {job} = props

  return (
    <li className="similar-job-card">
      <Link to={`/jobs/${job.id}`} className="similar-job-link">
        <div className="similar-title-container">
          <img
            src={job.companyLogoUrl}
            alt="similar job company logo"
            className="similar-logo"
          />

          <div>
            <h1>{job.title}</h1>

            <div className="rating-container">
              <AiFillStar className="star-icon" />

              <p>{job.rating}</p>
            </div>
          </div>
        </div>

        <h2>Description</h2>

        <p>{job.jobDescription}</p>

        <div className="similar-info">
          <p>
            <MdLocationOn />
            {job.location}
          </p>

          <p>
            <BsBriefcaseFill />
            {job.employmentType}
          </p>
        </div>
      </Link>
    </li>
  )
}

export default SimilarJobCard
