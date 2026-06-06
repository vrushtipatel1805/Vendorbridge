import { useEffect, useState } from 'react'
import './App.css'
import Dashboard from './Dashboard.jsx'
import Login from './Login.jsx'
import Registration from './Registration.jsx'
import ForgotPassword from './ForgotPassword.jsx'

const USERS_STORAGE = 'vendorbridge-users'
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function App() {
  const [authView, setAuthView] = useState('login')
  const [infoMessage, setInfoMessage] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [users, setUsers] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(USERS_STORAGE)) || {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  useEffect(() => {
    localStorage.setItem(USERS_STORAGE, JSON.stringify(users))
  }, [users])

  const loginUser = ({ email: rawEmail, password }) => {
    const email = rawEmail.trim().toLowerCase()
    if (!emailPattern.test(email)) return { error: 'Enter a valid email address.' }
    if (!password) return { error: 'Enter your password.' }

    const user = users[email]
    if (!user) return { error: 'No account found for that email. Please create an account first.' }
    if (user.password !== password) return { error: 'Incorrect password.' }

    const sessionUser = {
      ...user,
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || email,
    }
    setCurrentUser(sessionUser)
    return { success: true }
  }

  const registerUser = (newUser) => {
    const email = newUser.email.trim().toLowerCase()
    if (!emailPattern.test(email)) return { error: 'Enter a valid email address.' }
    if (users[email]) return { error: 'This email is already registered.' }
    if (!newUser.password || newUser.password.length < 6) return { error: 'Password must be at least 6 characters.' }
    if (newUser.password !== newUser.confirmPassword) return { error: 'Passwords do not match.' }
    if (!newUser.firstName || !newUser.lastName) return { error: 'Enter both first name and last name.' }

    const user = {
      ...newUser,
      email,
      role: newUser.role || 'Officer',
      createdAt: Date.now(),
    }
    setUsers((current) => ({ ...current, [email]: user }))
    setInfoMessage('Account created successfully. Please login with your new credentials.')
    return { success: true }
  }

  const resetPassword = ({ email: rawEmail, newPassword, confirmPassword }) => {
    const email = rawEmail.trim().toLowerCase()
    if (!emailPattern.test(email)) return { error: 'Enter a valid email address.' }
    const user = users[email]
    if (!user) return { error: 'No account found for that email.' }
    if (!newPassword || newPassword.length < 6) return { error: 'Password must be at least 6 characters.' }
    if (newPassword !== confirmPassword) return { error: 'Passwords do not match.' }

    setUsers((current) => ({
      ...current,
      [email]: { ...user, password: newPassword },
    }))
    return { success: true, message: 'Your password has been updated. You can now sign in.' }
  }

  if (authView === 'register') {
    return (
      <Registration
        onRegister={registerUser}
        onBackToLogin={() => {
          setInfoMessage('')
          setAuthView('login')
        }}
        onRegisterSuccess={() => setAuthView('login')}
      />
    )
  }

  if (currentUser) {
    return <Dashboard session={currentUser} onLogout={() => setCurrentUser(null)} />
  }

  if (authView === 'forgot') {
    return (
      <ForgotPassword
        onReset={resetPassword}
        onBackToLogin={() => {
          setInfoMessage('')
          setAuthView('login')
        }}
      />
    )
  }

  return (
    <Login
      onLogin={loginUser}
      onSwitchToRegister={() => {
        setInfoMessage('')
        setAuthView('register')
      }}
      onForgotPassword={() => {
        setInfoMessage('')
        setAuthView('forgot')
      }}
      
      infoMessage={infoMessage}
    />
    
  )
}

export default App
