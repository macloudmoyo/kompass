import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

function AppLayout() {
  return (
    <div className="min-h-screen bg-kompass-bg">
      <Sidebar />
      <TopBar />
      <main className="pl-16 pt-14">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AppLayout
