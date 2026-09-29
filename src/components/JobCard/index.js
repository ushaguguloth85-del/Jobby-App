import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import './index.css'

const JobCard = props => {
  const {job} = props

  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = job

  return (
    <li className="job-card">
      <Link to={`/jobs/${id}`} className="job-link">
        <div className="job-title-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />

          <div>
            <h1 className="job-title">{title}</h1>

            <div className="rating-container">
              <AiFillStar className="star-icon" />
              <p>{rating}</p>
            </div>
          </div>
        </div>

        <div className="job-details-container">
          <div className="job-location-container">
            <MdLocationOn />
            <p>{location}</p>
          </div>

          <div className="job-location-container">
            <BsBriefcaseFill />
            <p>{employmentType}</p>
          </div>

          <p className="package">{packagePerAnnum}</p>
        </div>

        <hr />

        <h2 className="description-heading">Description</h2>

        <p className="job-description">{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobCard
