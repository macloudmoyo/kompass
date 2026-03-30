import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import Onboarding from './pages/Onboarding'
import AccountsList from './pages/AccountsList'
import AccountDetail from './pages/AccountDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/onboarding" replace />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route element={<AppLayout />}>
          <Route path="/accounts" element={<AccountsList />} />
          <Route path="/accounts/:accountId" element={<AccountDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
