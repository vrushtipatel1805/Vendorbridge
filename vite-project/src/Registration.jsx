import { useState } from 'react'
import axios from "axios";

function Registration({ onRegister, onBackToLogin, onRegisterSuccess }) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'Officer',
    country: '',
    password: '',
    confirmPassword: '',
    additional_info: '',
  })
  const [photoPreview, setPhotoPreview] = useState(null)
  const [message, setMessage] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
  }

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setPhotoPreview(reader.result)
      setForm((current) => ({ ...current, photo: reader.result }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (event) => {

    event.preventDefault();

    try {

        const response = await axios.post(
            "http://localhost:5000/register",
            form
        );

        setMessage({
            type: "success",
            text: response.data.message
        });

        onRegisterSuccess();

    } catch (error) {

        setMessage({
            type: "error",
            text: "Registration failed"
        });

    }

};

  return (
    <main className="login-page registration-page">
      <section className="login-panel" aria-labelledby="register-heading">
        <div className="brand-badge" aria-hidden="true">
          <div className="badge-ring">
            {photoPreview ? <img src={photoPreview} alt="Profile" className="photo-preview" /> : null}
          </div>
          <label className="photo-label">
            <span>{photoPreview ? 'Change profile image' : 'Upload profile image'}</span>
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
          </label>
        </div>

        <h2 id="register-heading">Signup</h2>
        <p className="panel-description">Create an account to access procurement workflows.</p>

        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="field-row">
            <label>
              <span>First Name</span>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First name"
              />
            </label>
            <label>
              <span>Last Name</span>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last name"
              />
            </label>
          </div>

          <div className="field-row">
            <label>
              <span>Email Address</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email address"
              />
            </label>
            <label>
              <span>Phone Number</span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone number"
              />
            </label>
          </div>

          <div className="field-row">
            <label>
              <span>Role</span>
              <select name="role" value={form.role} onChange={handleChange}>
                <option value="Officer">Officer</option>
                <option value="Admin">Admin</option>
              </select>
            </label>
            <label>
              <span>Country</span>
              <input
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Country"
              />
            </label>
          </div>

          <div className="field-row">
            <label>
              <span>Password</span>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create password"
                autoComplete="new-password"
              />
            </label>
            <label>
              <span>Confirm Password</span>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                autoComplete="new-password"
              />
            </label>
          </div>

          <label className="full-width">
            <span>Additional Information</span>
            <textarea
              name="additional_info"
              value={form.additional_info}
              onChange={handleChange}
              placeholder="Additional information ..."
            />
          </label>

          {message && <div className={`message ${message.type}`}>{message.text}</div>}
          <button type="submit">Register</button>
        </form>

        <div className="auth-footer">
          <button type="button" className="link-button" onClick={onBackToLogin}>
            ← Back to login
          </button>
        </div>
      </section>
    </main>
  )
}

export default Registration
