import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import {ThreeDots} from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobCard from '../JobCard'
import FailureView from '../FailureView'
import './index.css'

const employmentTypesList = [
  {
    employmentTypeId: 'FULLTIME',
    label: 'Full Time',
  },
  {
    employmentTypeId: 'PARTTIME',
    label: 'Part Time',
  },
  {
    employmentTypeId: 'FREELANCE',
    label: 'Freelance',
  },
  {
    employmentTypeId: 'INTERNSHIP',
    label: 'Internship',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profileDetails: {},
    profileStatus: 'INITIAL',
    jobs: [],
    jobsStatus: 'INITIAL',
    searchInput: '',
    employmentTypes: [],
    salaryRange: '',
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getProfile = async () => {
    this.setState({profileStatus: 'LOADING'})

    const token = Cookies.get('jwt_token')

    const response = await fetch('https://apis.ccbp.in/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.ok) {
      const data = await response.json()

      this.setState({
        profileDetails: data.profile_details,
        profileStatus: 'SUCCESS',
      })
    } else {
      this.setState({profileStatus: 'FAILURE'})
    }
  }

  getJobs = async () => {
    this.setState({jobsStatus: 'LOADING'})

    const {searchInput, employmentTypes, salaryRange} = this.state

    const employmentTypeValue = employmentTypes.join(',')

    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeValue}&minimum_package=${salaryRange}&search=${searchInput}`

    const token = Cookies.get('jwt_token')

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.ok) {
      const data = await response.json()

      const updatedJobs = data.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))

      this.setState({
        jobs: updatedJobs,
        jobsStatus: 'SUCCESS',
      })
    } else {
      this.setState({jobsStatus: 'FAILURE'})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getJobs()
  }

  onChangeEmploymentType = event => {
    const {value, checked} = event.target

    this.setState(prevState => {
      let updatedEmploymentTypes = [...prevState.employmentTypes]

      if (checked) {
        updatedEmploymentTypes.push(value)
      } else {
        updatedEmploymentTypes = updatedEmploymentTypes.filter(
          eachType => eachType !== value,
        )
      }

      return {
        employmentTypes: updatedEmploymentTypes,
      }
    }, this.getJobs)
  }

  onChangeSalaryRange = event => {
    this.setState(
      {
        salaryRange: event.target.value,
      },
      this.getJobs,
    )
  }

  renderProfile = () => {
    const {profileStatus, profileDetails} = this.state

    if (profileStatus === 'LOADING') {
      return (
        <div className="loader-container" data-testid="loader">
          <ThreeDots color="#ffffff" height="50" width="50" />
        </div>
      )
    }

    if (profileStatus === 'FAILURE') {
      return <FailureView onRetry={this.getProfile} />
    }

    return (
      <div className="profile-container">
        <img
          src={profileDetails.profile_image_url}
          alt="profile"
          className="profile-image"
        />

        <h1>{profileDetails.name}</h1>

        <p>{profileDetails.short_bio}</p>
      </div>
    )
  }

  renderJobs = () => {
    const {jobsStatus, jobs} = this.state

    if (jobsStatus === 'LOADING') {
      return (
        <div className="loader-container" data-testid="loader">
          <ThreeDots color="#ffffff" height="50" width="50" />
        </div>
      )
    }

    if (jobsStatus === 'FAILURE') {
      return <FailureView onRetry={this.getJobs} />
    }

    if (jobs.length === 0) {
      return (
        <div className="no-jobs-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs found"
            className="no-jobs-image"
          />

          <h1>No Jobs Found</h1>

          <p>We could not find any jobs. Try other filters</p>
        </div>
      )
    }

    return (
      <ul className="jobs-list">
        {jobs.map(job => (
          <JobCard job={job} key={job.id} />
        ))}
      </ul>
    )
  }

  render() {
    const {searchInput} = this.state
    const {employmentTypesList, salaryRangesList} = this.props

    return (
      <div className="jobs-page">
        <Header />

        <div className="jobs-container">
          <aside className="sidebar">
            {this.renderProfile()}

            <hr />

            <h2>Type of Employment</h2>

            <ul className="filter-list">
              {employmentTypesList.map(type => (
                <li key={type.employmentTypeId}>
                  <input
                    type="checkbox"
                    id={type.employmentTypeId}
                    value={type.employmentTypeId}
                    onChange={this.onChangeEmploymentType}
                  />

                  <label htmlFor={type.employmentTypeId}>{type.label}</label>
                </li>
              ))}
            </ul>

            <hr />

            <h2>Salary Range</h2>

            <ul className="filter-list">
              {salaryRangesList.map(range => (
                <li key={range.salaryRangeId}>
                  <input
                    type="radio"
                    id={range.salaryRangeId}
                    name="salary"
                    value={range.salaryRangeId}
                    onChange={this.onChangeSalaryRange}
                  />

                  <label htmlFor={range.salaryRangeId}>{range.label}</label>
                </li>
              ))}
            </ul>
          </aside>

          <main className="jobs-main">
            <div className="search-container">
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                className="search-input"
              />

              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.onClickSearch}
              >
                <BsSearch />
              </button>
            </div>

            {this.renderJobs()}
          </main>
        </div>
      </div>
    )
  }
}

export default Jobs
