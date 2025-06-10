import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Step1 from './pages/Step1Connect'
import Step2 from './pages/Step2Verified'
import Step3 from './pages/Step3Plan'
import Step4 from './pages/Step4Congrats'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Step1 />} />
        <Route path="/verify" element={<Step2 />} />
        <Route path="/choose-plan" element={<Step3 />} />
        <Route path="/success" element={<Step4 />} />
      </Routes>
    </Router>
  )
}

export default App
