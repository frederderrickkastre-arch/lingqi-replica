import LingQiLogin from './pages/lingqi/LingQiLogin'
import LingQiWorkbench from './pages/lingqi/LingQiWorkbench'
import LingQiConsole from './pages/lingqi/LingQiConsole'
import LingQiSocial from './pages/lingqi/LingQiSocial'

export default function App() {
  const path = window.location.pathname.toLowerCase()
  if (path.includes('/console')) return <LingQiConsole />
  if (path.includes('/app/social/')) return <LingQiSocial />
  return path.includes('agentworkbench') || path.includes('workbench')
    ? <LingQiWorkbench />
    : <LingQiLogin />
}
