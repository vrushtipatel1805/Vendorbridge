import { useState } from 'react'

function ForgotPassword({ onReset, onBackToLogin }) {
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = onReset({ email, newPassword, confirmPassword })
    setMessage(result.error ? { type: 'error', text: result.error } : { type: 'success', text: result.message })
  }

  return (
    <main className="login-page">
      <section className="login-panel" aria-labelledby="forgot-heading">
        <div className="brand-badge" aria-hidden="true">
          <div className="badge-ring" />
          <span>Photo</span>
        </div>

        <h2 id="forgot-heading">Forgot Password</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <label>
            <span>Email Address</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your registered email"
              autoComplete="email"
            />
          </label>

          <label>
            <span>New Password</span>
            <input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="Enter new password"
              autoComplete="new-password"
            />
          </label>

          <label>
            <span>Confirm Password</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Confirm new password"
              autoComplete="new-password"
            />
          </label>

          {message && <div className={`message ${message.type}`}>{message.text}</div>}

          <button type="submit">Reset Password</button>
        </form>

        <div className="auth-footer">
          <button type="button" className="link-button" onClick={onBackToLogin}>
            Back to login
          </button>
        </div>
      </section>
    </main>
  )
}

export default ForgotPassword
