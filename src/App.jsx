import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastProvider } from './components/ui/Toast'
import AppLayout from './components/layout/AppLayout'
import Onboarding from './pages/Onboarding'
import AccountsList from './pages/AccountsList'
import AccountDetail from './pages/AccountDetail'

function App() {
  return (
    <ToastProvider>
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
    </ToastProvider>
  )
}

export default App
