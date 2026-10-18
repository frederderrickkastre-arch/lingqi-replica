import LingQiLogin from './pages/lingqi/LingQiLogin'
import LingQiWorkbench from './pages/lingqi/LingQiWorkbench'

export default function App() {
  const path = window.location.pathname.toLowerCase()
  return path.includes('agentworkbench') || path.includes('workbench')
    ? <LingQiWorkbench />
    : <LingQiLogin />
}
