import { useState } from 'react'

function Login({ onLogin, onSwitchToRegister, onForgotPassword, infoMessage }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    const result = onLogin({ email, password })
    if (result.error) {
      setMessage({ type: 'error', text: result.error })
      return
    }

    setMessage({ type: 'success', text: 'Login successful.' })
  }

  return (
    <main className="login-page">
      <section className="login-panel" aria-labelledby="login-heading">
        <div className="brand-badge" aria-hidden="true">
          <div className="badge-ring" />
          <span>Photo</span>
        </div>

        <h2 id="login-heading">Login</h2>
        <p className="panel-description">Sign in with your email and password to access VendorBridge.</p>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            <span>Email Address</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter email"
              autoComplete="email"
            />
          </label>

          <label>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
            />
          </label>

          {infoMessage && <div className="message success">{infoMessage}</div>}
          {message && <div className={`message ${message.type}`}>{message.text}</div>}

          <button type="submit">Login</button>
        </form>

        <div className="auth-footer">
          <button type="button" className="link-button" onClick={onForgotPassword}>
            Forgot password?
          </button>
          <button type="button" className="link-button" onClick={onSwitchToRegister}>
            Create an account
          </button>
        </div>
      </section>
    </main>
  )
}

export default Login
