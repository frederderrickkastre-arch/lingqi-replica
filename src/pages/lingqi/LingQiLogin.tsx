import { useEffect, useMemo, useState } from 'react'
import { Check, Eye, EyeOff, MessageCircle, Phone, X } from 'lucide-react'
import './LingQiLogin.css'

const assetRoot = 'https://redbear-static-img.oss-cn-hangzhou.aliyuncs.com/lingqi'

const products = [
  { label: '红熊AI', image: 'login-page-lingqi.png', title: '红熊 AI', description: '全模态大模型与记忆科学的 Agent 互动服务平台' },
  { label: '红熊灵通', image: 'login-page-lingtong.png', title: '红熊灵通', description: '让客户沟通更高效，让每一次服务都有记忆' },
  { label: '红熊灵销', image: 'login-page-lingxiao.png', title: '红熊灵销', description: '面向销售团队的智能线索与转化助手' },
  { label: '红熊灵智', image: 'login-page-lingzhi.png', title: '红熊灵智', description: '知识、流程和业务经验的统一智能入口' },
  { label: 'Agent互动服务平台', image: 'login-page-agent.png', title: 'Agent 互动服务平台', description: '全球首个融合全模态大模型与记忆科学的 Agent 互动服务平台' },
  { label: '记忆熊', image: 'login-page-memory.png', title: '记忆熊', description: '把重要信息留在每一次长期互动中' },
]

type LoginMode = 'phone' | 'password'

export default function LingQiLogin() {
  const [activeProduct, setActiveProduct] = useState(4)
  const [mode, setMode] = useState<LoginMode>('phone')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [agree, setAgree] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [error, setError] = useState('')
  const [trialOpen, setTrialOpen] = useState(false)

  const product = useMemo(() => products[activeProduct], [activeProduct])

  useEffect(() => {
    if (!countdown) return undefined
    const timer = window.setInterval(() => setCountdown((value) => Math.max(0, value - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [countdown])

  function sendCode() {
    if (!/^1\d{10}$/.test(phone)) {
      setError('请输入正确的手机号码')
      return
    }
    setError('验证码已发送，请查收短信')
    setCountdown(60)
  }

  function submitLogin() {
    setError('')
    if (!agree) {
      setError('请先阅读并同意用户服务协议和隐私政策')
      return
    }
    if (!/^1\d{10}$/.test(phone)) {
      setError('请输入正确的手机号码')
      return
    }
    if (mode === 'phone' && code.length < 4) {
      setError('请输入验证码')
      return
    }
    if (mode === 'password' && password.length < 6) {
      setError('密码至少需要 6 位')
      return
    }
    sessionStorage.setItem('lingqi-demo-session', '1')
    window.location.assign('/agentworkbench')
  }

  return (
    <main className="lingqi-login" style={{ backgroundImage: `url(${assetRoot}/login-page-bg.png)` }}>
      <section className="lingqi-login__left">
        <div className="lingqi-login__left-inner">
          <header className="lingqi-brand-block">
            <img className="lingqi-brand" src={`${assetRoot}/login-page-logo.png`} alt="红熊AI" />
            <p className="lingqi-slogan">全球首个融合全模态大模型与记忆科学的<span>Agent互动服务平台</span></p>
          </header>

          <div className="lingqi-product-tabs" role="tablist" aria-label="产品切换">
            {products.map((item, index) => (
              <button
                key={item.label}
                className={`lingqi-product-tab ${index === activeProduct ? 'is-active' : ''}`}
                onClick={() => setActiveProduct(index)}
                role="tab"
                aria-selected={index === activeProduct}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="lingqi-carousel-card"><img src={`${assetRoot}/${product.image}`} alt={product.title} /></div>
          <div className="lingqi-product-caption"><span className="lingqi-product-caption__dot" /><div><strong>{product.title}</strong><p>{product.description}</p></div></div>
        </div>
      </section>

      <section className="lingqi-login__right">
        <div className="lingqi-login-card">
          <div className="lingqi-login-card__header"><img src={`${assetRoot}/logo-42%402x.png`} alt="" /><h1>欢迎使用红熊AI</h1></div>
          <div className="lingqi-login-card__tabs" role="tablist">
            <button className={mode === 'phone' ? 'is-active' : ''} onClick={() => { setMode('phone'); setError('') }}>手机验证登录</button>
            <button className={mode === 'password' ? 'is-active' : ''} onClick={() => { setMode('password'); setError('') }}>密码登录</button>
          </div>

          <div className="lingqi-login-form">
            <label className="lingqi-field"><Phone size={17} /><input value={phone} onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 11))} placeholder="请输入手机号" inputMode="numeric" /></label>
            {mode === 'phone' ? (
              <div className="lingqi-code-row"><label className="lingqi-field"><MessageCircle size={17} /><input value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="请输入验证码" inputMode="numeric" /><span className="lingqi-code-count">{code.length} / 6</span></label><button className="lingqi-send-code" onClick={sendCode} disabled={countdown > 0}>{countdown ? `${countdown}s 后重发` : '发送验证码'}</button></div>
            ) : (
              <label className="lingqi-field"><Eye size={17} /><input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="请输入密码" /><button className="lingqi-eye" onClick={() => setShowPassword((value) => !value)} aria-label="显示或隐藏密码">{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></label>
            )}
            <button className="lingqi-login-button" onClick={submitLogin}>登录</button>
            <label className="lingqi-agreement"><button className={`lingqi-checkbox ${agree ? 'is-checked' : ''}`} onClick={() => setAgree((value) => !value)} aria-label="同意协议">{agree && <Check size={13} />}</button><span>我已阅读并同意 <a href="#agreement" onClick={(event) => event.preventDefault()}>用户服务协议</a>、<a href="#privacy" onClick={(event) => event.preventDefault()}>隐私政策</a></span></label>
            {error && <p className={`lingqi-form-message ${error.includes('已发送') ? 'is-success' : ''}`}>{error}</p>}
          </div>
          <button className="lingqi-trial-banner" onClick={() => setTrialOpen(true)}><img src={`${assetRoot}/TrialApplication-login.png`} alt="立即申请 AI 试用" /></button>
        </div>
      </section>
      <div className="lingqi-customer-links"><span>在线客服</span><span>微信咨询</span><span>电话咨询</span></div>
      {trialOpen && <TrialModal onClose={() => setTrialOpen(false)} />}
    </main>
  )
}

function TrialModal({ onClose }: { onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false)
  return (
    <div className="lingqi-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div className="lingqi-trial-modal" role="dialog" aria-modal="true" aria-label="立即申请 AI 试用">
        <button className="lingqi-modal-close" onClick={onClose} aria-label="关闭"><X size={19} /></button>
        {!submitted ? <><div className="lingqi-trial-modal__icon">AI</div><h2>立即申请 AI 试用</h2><p>留下联系方式，体验红熊 AI 的 Agent 服务平台。</p><input placeholder="请输入手机号" inputMode="numeric" /><button className="lingqi-login-button" onClick={() => setSubmitted(true)}>提交申请</button></> : <div className="lingqi-trial-success"><Check size={38} /><h2>申请已提交</h2><p>工作人员会尽快与您联系。</p><button className="lingqi-outline-button" onClick={onClose}>知道了</button></div>}
      </div>
    </div>
  )
}
