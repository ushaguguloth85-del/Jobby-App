import './index.css'

const FailureView = props => {
  const {onRetry} = props

  return (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />

      <h1 className="failure-heading">Oops! Something Went Wrong</h1>

      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>

      <button type="button" className="retry-button" onClick={onRetry}>
        Retry
      </button>
    </div>
  )
}

export default FailureView
