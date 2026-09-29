import {Component} from 'react'
import {ThreeDots} from 'react-loader-spinner'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import Header from '../Header'
import FailureView from '../FailureView'
import SimilarJobCard from '../SimilarJobCard'
import Cookies from 'js-cookie'
import './index.css'

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    status: 'INITIAL',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({status: 'LOADING'})

    const {id} = this.props.match.params
    const token = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    try {
      const response = await fetch(url, options)

      if (response.ok) {
        const data = await response.json()

        const job = data.job_details

        const updatedJob = {
          companyLogoUrl: job.company_logo_url,
          companyWebsiteUrl: job.company_website_url,
          employmentType: job.employment_type,
          id: job.id,
          jobDescription: job.job_description,
          lifeAtCompany: job.life_at_company,
          location: job.location,
          packagePerAnnum: job.package_per_annum,
          rating: job.rating,
          skills: job.skills,
          title: job.title,
        }

        const updatedSimilarJobs = data.similar_jobs.map(eachJob => ({
          companyLogoUrl: eachJob.company_logo_url,
          employmentType: eachJob.employment_type,
          id: eachJob.id,
          jobDescription: eachJob.job_description,
          location: eachJob.location,
          packagePerAnnum: eachJob.package_per_annum,
          rating: eachJob.rating,
          title: eachJob.title,
        }))

        this.setState({
          jobDetails: updatedJob,
          similarJobs: updatedSimilarJobs,
          status: 'SUCCESS',
        })
      } else {
        this.setState({status: 'FAILURE'})
      }
    } catch (error) {
      this.setState({status: 'FAILURE'})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <ThreeDots color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {jobDetails, similarJobs} = this.state

    return (
      <div className="job-details-page">
        <div className="job-details-card">
          {/* Job heading */}
          <div className="job-heading">
            <img
              src={jobDetails.companyLogoUrl}
              alt="job details company logo"
              className="details-logo"
            />

            <div>
              <h1>{jobDetails.title}</h1>

              <div className="rating-container">
                <AiFillStar className="star-icon" />
                <p>{jobDetails.rating}</p>
              </div>
            </div>
          </div>

          {/* Job information */}
          <div className="details-location-container">
            <div>
              <MdLocationOn />
              <p>{jobDetails.location}</p>
            </div>

            <div>
              <BsBriefcaseFill />
              <p>{jobDetails.employmentType}</p>
            </div>

            <p>{jobDetails.packagePerAnnum}</p>
          </div>

          <hr />

          {/* Description */}
          <div className="description-header">
            <h2>Description</h2>

            <a
              href={jobDetails.companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
            >
              Visit
            </a>
          </div>

          <p className="details-description">{jobDetails.jobDescription}</p>

          {/* Skills */}
          <h2>Skills</h2>

          <ul className="skills-list">
            {jobDetails.skills.map(skill => (
              <li key={skill.name} className="skill-item">
                <img src={skill.image_url} alt={skill.name} />

                <p>{skill.name}</p>
              </li>
            ))}
          </ul>

          {/* Life at Company */}
          <div className="life-at-company">
            <div>
              <h2>Life at Company</h2>

              <p>{jobDetails.lifeAtCompany.description}</p>
            </div>

            <img
              src={jobDetails.lifeAtCompany.image_url}
              alt="life at company"
            />
          </div>
        </div>

        {/* Similar Jobs */}
        <h2 className="similar-heading">Similar Jobs</h2>

        <ul className="similar-jobs-list">
          {similarJobs.map(job => (
            <SimilarJobCard key={job.id} job={job} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {status} = this.state

    return (
      <div className="details-page-container">
        <Header />

        {status === 'LOADING' && this.renderLoadingView()}

        {status === 'SUCCESS' && this.renderJobDetails()}

        {status === 'FAILURE' && <FailureView onRetry={this.getJobDetails} />}
      </div>
    )
  }
}

export default JobItemDetails
