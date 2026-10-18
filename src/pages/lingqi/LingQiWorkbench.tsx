import { useState } from 'react'
import { BarChart3, Bot, ChevronDown, Database, FileText, Headphones, LayoutDashboard, LogOut, Menu, MessageSquare, Plus, Search, Settings, Sparkles } from 'lucide-react'
import './LingQiWorkbench.css'

const navItems = [
  { label: '工作台', icon: LayoutDashboard },
  { label: '智能体', icon: Bot },
  { label: '知识库', icon: Database },
  { label: '会话记录', icon: MessageSquare },
  { label: '数据报表', icon: BarChart3 },
  { label: '任务中心', icon: FileText },
  { label: '系统设置', icon: Settings },
]

const agents = [
  { title: '红熊AI', desc: '通用全模态 Agent 互动服务平台', color: '#3470ef' },
  { title: '红熊灵通', desc: '客服、外呼与服务流程智能助手', color: '#8055e9' },
  { title: '红熊灵销', desc: '销售线索和转化协作 Agent', color: '#10a77b' },
]

export default function LingQiWorkbench() {
  const [activeNav, setActiveNav] = useState('工作台')
  const [activeAgent, setActiveAgent] = useState('红熊AI')
  const [message, setMessage] = useState('')
  const [collapsed, setCollapsed] = useState(false)
  const [sent, setSent] = useState(false)

  function logout() {
    sessionStorage.removeItem('lingqi-demo-session')
    window.location.assign('/Login')
  }

  function sendMessage() {
    if (!message.trim()) return
    setSent(true)
    setMessage('')
  }

  return (
    <main className={`lingqi-workbench ${collapsed ? 'is-collapsed' : ''}`}>
      <aside className="lingqi-workbench__sidebar">
        <div className="lingqi-workbench__brand"><img src="https://redbear-static-img.oss-cn-hangzhou.aliyuncs.com/lingqi/logo-42%402x.png" alt="" />{!collapsed && <div><strong>红熊AI</strong><span>Agent 服务平台</span></div>}</div>
        <nav className="lingqi-workbench__nav">{navItems.map(({ label, icon: Icon }) => <button key={label} className={activeNav === label ? 'is-active' : ''} onClick={() => setActiveNav(label)}><Icon size={18} />{!collapsed && <span>{label}</span>}</button>)}</nav>
        <div className="lingqi-workbench__side-bottom"><button onClick={() => setCollapsed((value) => !value)}><Menu size={18} />{!collapsed && <span>收起菜单</span>}</button><button onClick={logout}><LogOut size={18} />{!collapsed && <span>退出演示</span>}</button></div>
      </aside>

      <section className="lingqi-workbench__content">
        <header className="lingqi-workbench__topbar"><div className="lingqi-breadcrumb"><span>红熊AI</span><ChevronDown size={15} /><b>{activeNav}</b></div><div className="lingqi-top-actions"><button><Headphones size={16} />在线客服</button><button><Sparkles size={16} />体验中心</button><button className="lingqi-avatar">熊</button></div></header>
        <div className="lingqi-workbench__scroll">
          <div className="lingqi-workbench__hero"><div><p className="lingqi-eyebrow">AGENT WORKBENCH</p><h1>座席工作台</h1><p>连接知识、工具和智能体，开始一场高质量的业务互动。</p></div><button className="lingqi-primary-button"><Plus size={17} />新建会话</button></div>
          <section className="lingqi-agent-strip"><div className="lingqi-section-heading"><div><h2>我的智能体</h2><p>选择一个 Agent 开始工作</p></div><button className="lingqi-link-button">管理智能体</button></div><div className="lingqi-agent-grid">{agents.map((agent) => <button key={agent.title} className={`lingqi-agent-card ${activeAgent === agent.title ? 'is-active' : ''}`} onClick={() => setActiveAgent(agent.title)}><span className="lingqi-agent-icon" style={{ background: agent.color }}><Bot size={22} /></span><span><strong>{agent.title}</strong><small>{agent.desc}</small></span><span className="lingqi-agent-arrow">›</span></button>)}</div></section>
          <section className="lingqi-chat-layout"><div className="lingqi-chat-panel"><div className="lingqi-chat-header"><div><span className="lingqi-online-dot" />{activeAgent}<small> 在线</small></div><button aria-label="关闭会话">×</button></div><div className="lingqi-chat-empty">{sent ? <><div className="lingqi-chat-bubble">已收到你的任务</div><p>这是本地工作台演示，真实 Agent 接口将在完成登录态和接口核对后接入。</p></> : <><span className="lingqi-chat-empty-icon"><MessageSquare size={26} /></span><h3>开始一场新的 Agent 对话</h3><p>输入问题，或者从下方选择常用任务开始。</p></>}</div><div className="lingqi-composer"><textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="请输入你想让 Agent 完成的任务..." onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); sendMessage() } }} /><div className="lingqi-composer__toolbar"><button><Plus size={16} />添加素材</button><button><Sparkles size={16} />技能</button><button><Database size={16} />知识库</button><button className="lingqi-send-button" onClick={sendMessage}>发送</button></div></div></div><aside className="lingqi-history-panel"><div className="lingqi-section-heading"><div><h2>最近会话</h2><p>最近使用的 Agent 记录</p></div><button className="lingqi-icon-button" aria-label="搜索会话"><Search size={17} /></button></div>{['新品上市营销方案讨论','客服知识库更新','跨境电商客户画像分析','红熊灵通欢迎语优化'].map((item, index) => <button className="lingqi-history-item" key={item}><span className="lingqi-history-item__icon"><MessageSquare size={16} /></span><span><strong>{item}</strong><small>{index + 1} 天前 · {index + 2} 条消息</small></span></button>)}</aside></section>
        </div>
      </section>
    </main>
  )
}
