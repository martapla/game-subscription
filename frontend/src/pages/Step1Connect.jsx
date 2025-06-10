import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
    <div className="step1-main">
       <div>
            <h2> Connect your Account</h2>
            <p>...and unlock your benefits!</p>
      </div>
      <div className='checklist-main'>
      <ul>
        <li>Access to 100+ GAMES for FREE thanks <br/> to ads</li>
        <li>Log In Across All Your Devices</li>
        <li>Skip the Line with Customer Support</li>
      </ul>
      </div>
      
      <input
        type="email"
        placeholder='Email Address'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='input-email'
      />
      {error && <p className="error">{error}</p>}
      
      <p> Send Me Offers, News, and Fun Stuff!</p>

      <button
        onClick={handleConnect}
        disabled={loading}
        className="btn-connect"
      >
        {loading ? 'Sending...' : 'Connect'}
      </button>

      <p className="services-privacy">
      By continuing, you agree to our <a href="/terms-services">Terms of Service</a> and  <a href="/privacy-policy">Privacy Policy</a>.
      </p>
    </div>
  )
}

export default Step1
