import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  componentDidMount() {
    const token = Cookies.get('jwt_token')

    if (token !== undefined) {
      this.props.history.replace('/')
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitLogin = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const userDetails = {
      username,
      password,
    }

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token, {
          expires: 30,
        })

        this.props.history.replace('/')
      } else {
        this.setState({
          showSubmitError: true,
          errorMsg: data.error_msg,
        })
      }
    } catch (error) {
      this.setState({
        showSubmitError: true,
        errorMsg: 'Something went wrong',
      })
    }
  }

  render() {
    const token = Cookies.get('jwt_token')

    if (token !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, showSubmitError, errorMsg} = this.state

    return (
      <div className="login-container">
        <div className="login-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo"
          />

          <form onSubmit={this.onSubmitLogin} className="login-form">
            <label htmlFor="username">USERNAME</label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={this.onChangeUsername}
              className="login-input"
              placeholder="Username"
            />

            <label htmlFor="password">PASSWORD</label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={this.onChangePassword}
              className="login-input"
              placeholder="Password"
            />

            <button type="submit" className="login-button">
              Login
            </button>

            {showSubmitError && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
