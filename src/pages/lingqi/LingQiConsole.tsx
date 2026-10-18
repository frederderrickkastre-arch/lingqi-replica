import { useState } from 'react'
import { BarChart3, Bot, BriefcaseBusiness, ChevronRight, Database, FileText, Headphones, LayoutGrid, LockKeyhole, MessageSquare, Package, ReceiptText, Settings2, Sparkles, Users, Workflow } from 'lucide-react'
import './LingQiConsole.css'

const assetRoot = 'https://redbear-static-img.oss-cn-hangzhou.aliyuncs.com/lingqi'
const platformTabs = ['智能客服', '智能营销', '智能教育', 'Chat BI', '智能应用']
const platformCards: Record<string, string[]> = {
  智能客服: ['在线客服', '呼叫中心', '工单中心', '质检中心', '通用 AI'],
  智能营销: ['外呼营销', '智能创作', '社交营销', '智能销冠', '智能CRM', '全渠道营销系统'],
  智能教育: ['智能教育'],
  'Chat BI': ['ChatBI', 'BI决策中心'],
  智能应用: ['数字人', '智能标书'],
}

const cardColors = ['orange', 'purple', 'green', 'blue', 'pink', 'indigo']
const systemCards = [
  ['租户权限', Users], ['应用权限', LayoutGrid], ['交付管理', BriefcaseBusiness], ['资源市场', Package], ['发票管理', ReceiptText], ['订单管理', ReceiptText],
  ['订阅资源', Sparkles], ['部门管理', Users], ['岗位管理', Settings2], ['人员管理', Users], ['收件地址', BriefcaseBusiness], ['开票信息', FileText], ['合同管理', FileText],
] as const

export default function LingQiConsole() {
  const [activeTab, setActiveTab] = useState('智能营销')
  const [toast, setToast] = useState('')
  const cards = platformCards[activeTab]

  function locked(name: string) {
    setToast(name === '社交营销' ? '请从社交营销入口进入应用' : '抱歉，暂未查询到您的权限，请联系管理员添加权限！')
    window.setTimeout(() => setToast(''), 2800)
  }

  return (
    <main className="lingqi-console">
      <header className="lingqi-console__header"><img src={`${assetRoot}/login-page-logo.png`} alt="红熊AI" /><span>把人工智能带入每一家企业</span><div className="lingqi-console__header-actions"><button><Headphones size={16} />客服</button><button className="lingqi-console__avatar">熊</button></div></header>
      <div className="lingqi-console__body">
        <section className="lingqi-console__stats">
          <Stat title="AI客服 Agent 可用量" value="5000 点" sub="累计购买 5000 点" tone="blue" icon={<MessageSquare />} />
          <Stat title="AI外呼 Agent 可用量" value="0 分钟" sub="累计购买 0 分钟" tone="purple" icon={<BarChart3 />} />
          <Stat title="获客企业数据查询 可用量" value="0 次" sub="累计购买 0 次" tone="blue" icon={<Database />} />
          <Stat title="即将到期的服务" value="0" sub="30天内到期" tone="red" icon={<LockKeyhole />} />
        </section>

        <section className="lingqi-console__section lingqi-console__recommend"><div className="lingqi-console__section-title"><h2>推荐应用</h2><span>提供高效快捷的智能应用</span></div><div className="lingqi-recommend-grid"><RecommendCard title="外呼营销" desc="自动呼叫、精准数据分析、高效触达" icon={<Headphones />} onClick={() => locked('外呼营销')} /><RecommendCard title="智能创作" desc="实现更精准的语义理解和场景化智能决策" icon={<Sparkles />} onClick={() => locked('智能创作')} /></div></section>

        <section className="lingqi-console__section lingqi-console__platform"><div className="lingqi-console__section-title"><h2>平台应用</h2></div><div className="lingqi-console__platform-tabs" role="tablist">{platformTabs.map((tab) => <button key={tab} className={activeTab === tab ? 'is-active' : ''} onClick={() => setActiveTab(tab)}>{tab}</button>)}</div><div className="lingqi-platform-grid">{cards.map((card, index) => <button className={`lingqi-platform-card ${cardColors[index % cardColors.length]} ${card === '社交营销' ? 'is-link' : ''}`} key={card} onClick={() => card === '社交营销' ? window.location.assign('/app/Social/TrafficAddTask') : locked(card)}><span className="lingqi-platform-icon">{index === 0 && activeTab === '智能应用' ? <Bot /> : <LockKeyhole />}</span><span>{card}</span></button>)}</div></section>

        <section className="lingqi-console__section lingqi-console__utilities"><div className="lingqi-console__memory"><img src={`${assetRoot}/login-page-lingqi.png`} alt="记忆熊" /><span>记忆熊 <ChevronRight size={15} /></span></div><div className="lingqi-utility-grid"><UtilityCard title="记忆空间" icon={<Package />} /><UtilityCard title="MCP服务" icon={<Workflow />} /><UtilityCard title="模型广场" icon={<Database />} /></div><div className="lingqi-quick-grid"><UtilityCard title="Agent" icon={<Bot />} /><UtilityCard title="工作流" icon={<Workflow />} /><UtilityCard title="知识库" icon={<Database />} /><UtilityCard title="提示词" icon={<MessageSquare />} /></div></section>

        <section className="lingqi-console__section lingqi-console__system"><div className="lingqi-console__section-title"><h2>灵启系统管理</h2></div><div className="lingqi-system-grid">{systemCards.map(([label, Icon]) => <button key={label} onClick={() => locked(label)}><span><Icon /></span><b>{label}</b></button>)}</div></section>
        <section className="lingqi-console__bottom"><div><h3>红熊AI官网</h3><p>快速访问通道，查看产品详情与服务说明</p></div><button onClick={() => window.open('https://redbearai.com/marketing', '_blank')}>进入官网 <ChevronRight size={15} /></button><div className="lingqi-doc-card"><h3>产品使用说明</h3><p>查看更多最新文档和学习文档</p></div></section>
      </div>
      {toast && <div className="lingqi-console__toast">{toast}</div>}
    </main>
  )
}

function Stat({ title, value, sub, tone, icon }: { title: string; value: string; sub: string; tone: string; icon: React.ReactNode }) { return <div className={`lingqi-stat ${tone}`}><div><p>{title}</p><strong>{value}</strong><small>{sub}</small></div><span>{icon}</span></div> }
function RecommendCard({ title, desc, icon, onClick }: { title: string; desc: string; icon: React.ReactNode; onClick: () => void }) { return <button className="lingqi-recommend-card" onClick={onClick}><span>{icon}</span><div><strong>{title}</strong><p>{desc}</p></div><b>开启服务</b></button> }
function UtilityCard({ title, icon }: { title: string; icon: React.ReactNode }) { return <button className="lingqi-utility-card"><span>{icon}</span><b>{title}</b></button> }
