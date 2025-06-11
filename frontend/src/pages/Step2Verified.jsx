import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckList from '../components/CheckList';
import '../styles/step2Verified.css'


const Step2Verified = () => {

  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const email = localStorage.getItem('user_email');

  const handleVerify = async () => {
    setError(null);
    if (code.length !== 6) {
      setError('Please enter the 6-digit code.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/validate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Invalid code.');
      } else {
        localStorage.setItem('user_id', data.user_id);
        navigate('/products');  
      }
    } catch (err) {
      setError('Network error. Try again.');
    } finally {
      setLoading(false);
    }
  }



  return (
    <>
      <div className="step2-main">

        <div className="checklist-desktop-position">
          <CheckList />
        </div>

        <div className='right-section'>

          <div className="header-section">
            <h2> Get Verified!</h2>
            <p>Enter the one-time code we sent to:</p>
            <p className="email-highlight">{localStorage.getItem('user_email')}</p>

          </div>

          <div className="checklist-mobile-position">
            <CheckList />
          </div>

          <form className="form-section" onSubmit={e => e.preventDefault()}>
            <input
              type="text"
              placeholder='Enter 6-digit code'
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              className='input-code'
            />

            {error && <p className="error">{error}</p>}

            <button
              onClick={handleVerify}
              disabled={loading}
              className="btn-verify"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </form>
        </div>
      </div>
      <footer>
        <p className="resend-code">
          Didn’t get an email? <a href="/resend-code">Resend Code</a>

        </p>
      </footer>
    </>
  )
}

export default Step2Verified