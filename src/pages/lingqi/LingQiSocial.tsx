import { useState } from 'react'
import {
  Bell, Bot, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Clock3, FileText, Filter, LayoutGrid,
  MessageCircle, MoreHorizontal, Plus, RefreshCw, Search, Send, Settings2, ShieldCheck, SlidersHorizontal,
  UserRound, Users, X
} from 'lucide-react'
import './LingQiSocial.css'

type SocialRoute = 'create' | 'tasks' | 'accounts' | 'chat' | 'comments' | 'sessions' | 'settings'

const socialNav: Array<{ label: string; route?: SocialRoute; icon: typeof Bot; group?: string }> = [
  { label: '社交任务创建', route: 'create', icon: Plus },
  { label: '社媒任务管理', route: 'tasks', icon: FileText },
  { label: '社交账号管理', route: 'accounts', icon: Users },
  { label: '销售在线聊天', route: 'chat', icon: MessageCircle, group: '获客智能销售' },
  { label: '销售评论接入', route: 'comments', icon: MessageCircle, group: '获客智能销售' },
  { label: '销售私信管理', route: 'sessions', icon: MessageCircle, group: '获客智能销售' },
  { label: '销售会话设置', route: 'settings', icon: Settings2, group: '获客智能销售' },
  { label: '线索通知设置', icon: Bell, group: '营销线索中心' },
  { label: '内容任务管理', icon: FileText, group: '营销内容中心' },
  { label: '内容数据分析', icon: LayoutGrid, group: '营销数据洞察' },
  { label: 'AI能力配置', icon: Bot, group: 'AI能力中心' },
  { label: '系统设置', icon: Settings2, group: '系统设置' },
  { label: '人员管理', icon: UserRound, group: '人员管理' },
]

function routeFromPath(): SocialRoute {
  const path = window.location.pathname.toLowerCase()
  if (path.includes('traffictaskmanage')) return 'tasks'
  if (path.includes('trafficacmanage')) return 'accounts'
  if (path.includes('trafficchat')) return 'chat'
  if (path.includes('trafficcommentmanagement')) return 'comments'
  if (path.includes('trafficsessionmanage')) return 'sessions'
  if (path.includes('chatconfig2')) return 'settings'
  return 'create'
}

function pathForRoute(route: SocialRoute) {
  const paths: Record<SocialRoute, string> = {
    create: '/app/Social/TrafficAddTask',
    tasks: '/app/Social/TrafficTaskManage',
    accounts: '/app/Social/TrafficAcManage',
    chat: '/app/Social/TrafficChat',
    comments: '/app/Social/TrafficcommentManagement',
    sessions: '/app/Social/TrafficSessionManage',
    settings: '/app/Social/chatConfig2',
  }
  return paths[route]
}

export default function LingQiSocial() {
  const [route, setRoute] = useState<SocialRoute>(routeFromPath)
  const [collapsed, setCollapsed] = useState(false)
  const [toast, setToast] = useState('')
  const navigate = (next: SocialRoute) => {
    setRoute(next)
    window.history.pushState({}, '', pathForRoute(next))
  }
  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2600)
  }
  const topPath = route === 'create' ? '社交任务创建' : route === 'tasks' ? '社媒任务管理' : route === 'accounts' ? '社交账号管理' : route === 'chat' ? '销售在线聊天' : route === 'comments' ? '销售评论接入' : route === 'sessions' ? '销售私信管理' : '销售会话设置'
  return <main className={`lingqi-social ${collapsed ? 'is-collapsed' : ''}`}>
    <aside className="lingqi-social__sidebar">
      <div className="lingqi-social__brand"><img src="https://redbear-static-img.oss-cn-hangzhou.aliyuncs.com/lingqi/logo-42%402x.png" alt="红熊AI" />{!collapsed && <div><strong>红熊AI</strong><span>一站式智能获客平台</span></div>}<button className="lingqi-social__collapse" onClick={() => setCollapsed(!collapsed)} aria-label="折叠菜单"><ChevronLeft size={16} /></button></div>
      <nav className="lingqi-social__nav">
        <button className="lingqi-social__back" onClick={() => window.location.assign('/Console')}><ChevronLeft size={15} />{!collapsed && '控制台首页'}</button>
        {socialNav.map((item, index) => {
          const isGroupStart = item.group && (index === 0 || socialNav[index - 1]?.group !== item.group)
          return <div key={item.label}>{isGroupStart && !collapsed && <div className="lingqi-social__group">{item.group}<ChevronDown size={13} /></div>}<button className={`lingqi-social__nav-item ${item.route === route ? 'is-active' : ''}`} onClick={() => item.route ? navigate(item.route) : notify('该模块将在完成权限配置后开放')}><item.icon size={16} />{!collapsed && <span>{item.label}</span>}{!collapsed && item.route === route && <span className="nav-dot" />}</button></div>
        })}
      </nav>
      {!collapsed && <div className="lingqi-social__side-foot"><button onClick={() => notify('帮助中心即将开放')}><CircleHelp size={15} />帮助中心</button><button onClick={() => window.location.assign('/Console')}><X size={15} />返回控制台</button></div>}
    </aside>
    <section className="lingqi-social__content">
      <header className="lingqi-social__topbar"><div className="lingqi-social__crumb"><span>红熊AI</span><ChevronRight size={14} /><b>社交营销</b><ChevronRight size={14} /><strong>{topPath}</strong></div><div className="lingqi-social__top-actions"><button onClick={() => notify('通知中心暂无新消息')}><Bell size={16} /></button><button onClick={() => notify('当前账号已登录')}><UserRound size={17} /> <span>账号中心</span></button></div></header>
      <div className="lingqi-social__scroll">{route === 'create' && <CreatePage navigate={navigate} notify={notify} />}{route === 'tasks' && <TaskManagePage notify={notify} />}{route === 'accounts' && <AccountPage notify={notify} />}{route === 'chat' && <ChatPage notify={notify} />}{route === 'comments' && <CommentPage notify={notify} />}{route === 'sessions' && <SessionPage notify={notify} />}{route === 'settings' && <SettingsPage notify={notify} />}</div>
    </section>
    {toast && <div className="lingqi-social__toast">{toast}</div>}
  </main>
}

function PageHeader({ eyebrow, title, desc, action, onAction }: { eyebrow?: string; title: string; desc?: string; action?: string; onAction?: () => void }) {
  return <div className="social-page-header">{eyebrow && <span>{eyebrow}</span>}<div><div><h1>{title}</h1>{desc && <p>{desc}</p>}</div>{action && <button className="social-primary" onClick={onAction}><Plus size={16} />{action}</button>}</div></div>
}

function CreatePage({ navigate, notify }: { navigate: (route: SocialRoute) => void; notify: (message: string) => void }) {
  const [value, setValue] = useState('')
  const [platform, setPlatform] = useState('全平台')
  const [group, setGroup] = useState('默认分组')
  return <div className="social-create"><PageHeader eyebrow="SOCIAL MARKETING" title="一站式智能获客平台" desc="全方位助力业务增长，连接内容、账号与客户" /><div className="social-create__hero"><div className="social-create__hero-copy"><h2>让每一次触达，都更接近成交</h2><p>描述你的获客目标，红熊AI将为你生成可执行的社交任务。</p></div><img src="https://redbear-static-img.oss-cn-hangzhou.aliyuncs.com/lingqi/login-page-lingqi.png" alt="红熊AI" /></div><section className="social-composer-card"><div className="social-composer-card__top"><span className="social-compose-icon"><MessageCircle size={20} /></span><div><h2>开始创建线索采集任务</h2><p>说说你想从哪些平台、以什么方式找到客户</p></div></div><textarea value={value} onChange={e => setValue(e.target.value)} placeholder="例如：帮我寻找近期发布了跨境电商需求的潜在客户..." /><div className="social-compose-toolbar"><button><Plus size={16} />添加素材</button><button><Filter size={16} />技能</button><button><FileText size={16} />提示词库</button><label><span>选择平台</span><select value={platform} onChange={e => setPlatform(e.target.value)}><option>全平台</option><option>小红书</option><option>抖音</option><option>微信公众号</option></select></label><label><span>选择分组</span><select value={group} onChange={e => setGroup(e.target.value)}><option>默认分组</option><option>电商线索</option><option>品牌合作</option></select></label><button className="social-send" disabled={!value.trim()} onClick={() => notify('任务已加入创建队列')}><Send size={16} /></button></div></section><div className="social-create__bottom"><button onClick={() => navigate('tasks')}><Clock3 size={16} />查看历史任务</button><button onClick={() => navigate('accounts')}><Users size={16} />管理社交账号</button><button onClick={() => notify('帮助中心即将开放')}><CircleHelp size={16} />了解使用帮助</button></div></div>
}

function FilterBar({ children, onSearch, onReset }: { children: React.ReactNode; onSearch?: () => void; onReset?: () => void }) { return <div className="social-filterbar"><div className="social-filter-fields">{children}</div><div className="social-filter-actions"><button className="social-primary" onClick={onSearch}>查询</button><button className="social-plain" onClick={onReset}>重置</button></div></div> }
function SelectField({ label, options = ['全部'] }: { label: string; options?: string[] }) { const [value, setValue] = useState(options[0]); return <label className="social-field"><span>{label}</span><select value={value} onChange={e => setValue(e.target.value)}>{options.map(x => <option key={x}>{x}</option>)}</select></label> }

function TaskManagePage({ notify }: { notify: (message: string) => void }) { return <div className="social-table-page"><PageHeader title="社媒任务管理" desc="查看和管理已创建的社交获客任务" action="新建任务" onAction={() => window.location.assign('/app/Social/TrafficAddTask')} /><FilterBar onSearch={() => notify('已按条件查询')} onReset={() => notify('筛选条件已重置')}><label className="social-field search-field"><span>任务名称</span><div><Search size={15} /><input placeholder="请输入任务名称" /></div></label><label className="social-field search-field"><span>账号名称</span><div><Search size={15} /><input placeholder="请输入账号名称" /></div></label><SelectField label="任务状态" options={['全部任务状态', '执行中', '已完成', '已暂停']} /><SelectField label="任务类型" options={['全部任务类型', '线索采集', '内容互动']} /><SelectField label="执行类型" options={['全部执行类型', '自动执行', '手动执行']} /></FilterBar><section className="social-table-card"><div className="social-table-head"><h2>任务列表</h2><button className="social-plain" onClick={() => notify('批量复制需要先选择任务')}><FileText size={15} />批量复制</button></div><table><thead><tr><th>任务名称</th><th>账号名称</th><th>任务类型</th><th>任务状态</th><th>创建时间</th><th>操作</th></tr></thead><tbody><tr><td colSpan={6}><EmptyState title="暂无数据" desc="创建一个社交任务后，将在这里查看执行进度" /></td></tr></tbody></table></section></div> }

function AccountPage({ notify }: { notify: (message: string) => void }) { const [expanded, setExpanded] = useState(false); return <div className="social-table-page"><PageHeader title="社交账号管理" desc="管理已接入的平台账号和自动化权限" /><section className="social-table-card account-card"><div className="social-account-toolbar"><div className="social-search"><Search size={16} /><input placeholder="搜索账号名称" /></div><button className="social-plain" onClick={() => notify('账号列表已刷新')}><RefreshCw size={15} />刷新</button><button className="social-plain" onClick={() => notify('接入程序下载将在新版本开放')}><FileText size={15} />下载接入程序</button></div><div className="social-account-filters"><button className="is-active">全部平台</button><button>全部任务状态</button><button>全部登录状态</button></div><div className="social-account-item"><div className="account-avatar">乔</div><div className="account-main"><strong>乔门红客未来</strong><span>企业号 · 账号：64311522367</span><small><i className="online-dot" /> PC 在线  12674 粉丝数  0 笔记数  0 点赞数</small></div><button className="account-more" onClick={() => setExpanded(!expanded)}><MoreHorizontal size={18} /></button></div>{expanded && <div className="account-settings"><div><b>任务占用</b><span className="status-chip">空闲</span></div><label>设为私信账号 <input type="checkbox" onChange={() => notify('已更新本地演示状态')} /></label><label>评论自动回复 <input type="checkbox" onChange={() => notify('已更新本地演示状态')} /></label></div>} {!expanded && <EmptyState title="" desc="点击右侧菜单查看账号设置" compact />}</section></div> }

function ChatPage({ notify }: { notify: (message: string) => void }) { const [tab, setTab] = useState('AI会话'); const [message, setMessage] = useState(''); return <div className="social-chat-page"><PageHeader title="销售在线聊天" desc="集中处理来自各社交平台的客户对话" /><div className="social-chat-layout"><section className="social-chat-list"><div className="chat-tabs">{['AI会话', '进行中', '排队', '已结会话'].map(x => <button key={x} className={tab === x ? 'is-active' : ''} onClick={() => setTab(x)}>{x}</button>)}</div><div className="chat-list-tools"><button className="date-chip"><Clock3 size={14} />近一周<ChevronDown size={14} /></button><div className="social-search"><Search size={15} /><input placeholder="搜索用户" /></div></div><EmptyState title="暂无会话" desc="新的客户对话会出现在这里" /></section><section className="social-chat-detail"><div className="chat-detail-header"><div><span className="account-avatar small">熊</span><strong>红熊用户</strong><small>未选择会话</small></div><div><button className="social-plain" onClick={() => notify('暂无可转接会话')}>转接</button><button className="social-plain" onClick={() => notify('暂无可结束会话')}>结束会话</button></div></div><div className="chat-detail-empty"><MessageCircle size={34} /><h3>选择一个会话开始处理</h3><p>客户消息、AI回复和人工接管记录将在这里展示</p></div><div className="chat-detail-compose"><input value={message} onChange={e => setMessage(e.target.value)} placeholder="输入回复内容" /><button disabled={!message.trim()} onClick={() => { setMessage(''); notify('演示消息已发送') }}><Send size={16} /></button></div></section></div></div> }

function CommentPage({ notify }: { notify: (message: string) => void }) { const [filter, setFilter] = useState('全部'); return <div className="social-table-page"><PageHeader title="评论管理" desc="统一查看和处理社交平台评论" /><div className="social-comment-stats"><Stat title="待回复评论" value="0" /><Stat title="@我的评论" value="0" /><Stat title="评论总数" value="0" /><Stat title="今日已回复" value="0" /></div><section className="social-table-card comment-card"><div className="comment-toolbar"><div className="radio-row">{['全部', '待回复', '@我的', '回复我的'].map(x => <button key={x} className={filter === x ? 'is-active' : ''} onClick={() => setFilter(x)}>{x}</button>)}</div><div className="comment-actions"><SelectField label="平台筛选" options={['全部平台', '小红书', '抖音']} /><SelectField label="账号筛选" options={['全部账号', '乔门红客未来']} /><button className="social-primary" onClick={() => notify('评论筛选已应用')}>筛选</button><button className="social-plain" onClick={() => notify('批量回复需要先选择评论')}>批量回复</button><button className="social-plain" onClick={() => notify('AI评论设置已打开')}>AI评论设置</button></div></div><EmptyState title="暂无评论" desc="接入社交账号后，评论会在这里实时同步" /></section></div> }

function SessionPage({ notify }: { notify: (message: string) => void }) { return <div className="social-table-page"><PageHeader title="销售私信管理" desc="查看客户会话、线索状态和 AI 评分" /><div className="social-comment-stats"><Stat title="总会话数" value="0" /><Stat title="AI处理数" value="0" /><Stat title="今日新增" value="0" /></div><FilterBar onSearch={() => notify('已按条件查询')} onReset={() => notify('筛选条件已重置')}><label className="social-field search-field"><span>客户账号昵称</span><div><Search size={15} /><input placeholder="请输入昵称" /></div></label><SelectField label="业务线" options={['全部业务线', '跨境电商']} /><SelectField label="线索状态" options={['全部状态', '待跟进', '已转化']} /><label className="social-field"><span>AI评分</span><div className="range-inputs"><input placeholder="最低" /><i>-</i><input placeholder="最高" /></div></label></FilterBar><section className="social-table-card"><div className="social-table-head"><h2>会话记录</h2><button className="social-plain" disabled><FileText size={15} />导出</button></div><table><thead><tr><th>客户账号昵称</th><th>业务线</th><th>线索状态</th><th>AI评分</th><th>最近会话</th><th>操作</th></tr></thead><tbody><tr><td colSpan={6}><EmptyState title="暂无数据" desc="来自社交平台的客户私信会展示在这里" /></td></tr></tbody></table></section></div> }

function SettingsPage({ notify }: { notify: (message: string) => void }) { const [auto, setAuto] = useState(true); return <div className="social-table-page"><PageHeader title="销售会话设置" desc="设置 AI 会话、接管规则和回复策略" /><section className="social-settings-grid"><div className="settings-card"><div className="settings-title"><ShieldCheck size={20} /><div><h2>AI 会话设置</h2><p>配置自动回复和人工接管规则</p></div></div><SettingRow title="开启 AI 自动回复" desc="新会话优先由 AI 回复" checked={auto} onChange={() => setAuto(!auto)} /><SettingRow title="敏感词命中后转人工" desc="检测到风险内容时暂停 AI 回复" checked onChange={() => notify('本地演示设置已更新')} /><SettingRow title="显示 AI 回复建议" desc="人工接管时显示可用回复建议" checked onChange={() => notify('本地演示设置已更新')} /></div><div className="settings-card"><div className="settings-title"><SlidersHorizontal size={20} /><div><h2>会话策略</h2><p>按业务线配置客户接待方式</p></div></div><label className="social-field wide"><span>默认业务线</span><select><option>跨境电商</option><option>品牌合作</option></select></label><label className="social-field wide"><span>人工接管等待时间</span><select><option>5 分钟</option><option>10 分钟</option><option>30 分钟</option></select></label><button className="social-primary save-setting" onClick={() => notify('设置已保存到本地演示')}>保存设置</button></div></section></div> }

function SettingRow({ title, desc, checked, onChange }: { title: string; desc: string; checked: boolean; onChange: () => void }) { return <div className="setting-row"><div><strong>{title}</strong><p>{desc}</p></div><button className={`switch ${checked ? 'is-on' : ''}`} onClick={onChange} aria-label={title}><span /></button></div> }
function Stat({ title, value }: { title: string; value: string }) { return <div className="social-stat"><span>{title}</span><strong>{value}</strong><small>较昨日 +0</small></div> }
function EmptyState({ title, desc, compact = false }: { title: string; desc: string; compact?: boolean }) { return <div className={`social-empty ${compact ? 'is-compact' : ''}`}><span><FileText size={compact ? 16 : 25} /></span>{title && <h3>{title}</h3>}<p>{desc}</p></div> }
