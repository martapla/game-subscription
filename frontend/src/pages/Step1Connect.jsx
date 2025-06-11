import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CheckList from '../components/CheckList';
import '../styles/step1Connect.css'

function Step1() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleConnect = async () => {
    setError(null)
    if (!email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }

    try {
      setLoading(true)
      const response = await fetch(`http://localhost:8080/api/send-email?email=${encodeURIComponent(email)}`)
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Something went wrong.')
      } else {
        // Email at localStorage 
        localStorage.setItem('user_email', email)
        navigate('/verify')
      }
    } catch (err) {
      setError('Network error. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (

    <>
      <div className="step1-main">

        <div className="checklist-desktop-position">
          <CheckList />
        </div>

        <div className='right-section'>

          <div className="header-section">
            <h2> Connect your Account</h2>
            <p>...and unlock your benefits!</p>
          </div>

          <div className="checklist-mobile-position">
            <CheckList />
          </div>

          <form className="form-section">
            <input
              type="email"
              placeholder='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='input-email'
            />
            {error && <p className="error">{error}</p>}

            <p> ☑️ Send Me Offers, News, and Fun Stuff!</p>

            <button
              onClick={handleConnect}
              disabled={loading}
              className="btn-connect"
            >
              {loading ? 'Sending...' : 'Connect'}
            </button>
          </form>
        </div>
      </div>

      <footer>
        <p className="services-privacy">
          By continuing, you agree to our <a href="/terms-services">Terms of Service</a> and  <a href="/privacy-policy">Privacy Policy</a>.
        </p>
      </footer>
    </>
  )
}

export default Step1
