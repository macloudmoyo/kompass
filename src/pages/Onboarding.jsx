import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Compass,
  Check,
  Globe,
  Loader2,
  Cloud,
  Mail,
} from 'lucide-react'

function LinkedinIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

const STEP_LABELS = ['Your Product', 'Connect CRM', 'Add Channels']

const PROCESSING_MESSAGES = [
  'Reading your website...',
  'Inferring your buying committee structure...',
  'Mapping your CRM contacts to roles...',
  'Pulling in engagement signals...',
  'Identifying detected contacts...',
  'Building your account intelligence...',
]

function ProgressIndicator({ currentStep }) {
  return (
    <div className="mb-8 flex items-center justify-center gap-0">
      {STEP_LABELS.map((label, i) => {
        const stepNum = i + 1
        const isCompleted = stepNum < currentStep
        const isActive = stepNum === currentStep
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  isCompleted
                    ? 'bg-kompass-green text-white'
                    : isActive
                      ? 'bg-kompass-blue text-white'
                      : 'border border-kompass-border text-kompass-text-muted'
                }`}
              >
                {isCompleted ? <Check size={16} /> : stepNum}
              </div>
              <span className="mt-1.5 text-xs text-kompass-text-muted">
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div
                className={`mx-3 mb-5 h-px w-16 ${
                  stepNum < currentStep
                    ? 'bg-kompass-green'
                    : 'bg-kompass-border'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

function StepOne({ onNext }) {
  const [url, setUrl] = useState('')
  const [industry, setIndustry] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    setLoading(true)
    setTimeout(() => onNext(), 2000)
  }

  return (
    <>
      <h2 className="text-xl font-bold text-white">
        Let's set up your account intelligence
      </h2>
      <p className="mt-2 mb-6 text-sm text-kompass-text-secondary">
        We'll analyse your product and build your buying committee framework
        automatically
      </p>

      <div className="mb-4">
        <label className="mb-1.5 block text-sm text-kompass-text-secondary">
          Your website URL
        </label>
        <div className="relative">
          <Globe
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-kompass-text-muted"
          />
          <input
            type="text"
            placeholder="https://yourcompany.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full rounded-lg border border-kompass-border bg-kompass-bg py-2.5 pl-9 pr-3 text-sm text-kompass-text-primary placeholder-kompass-text-muted outline-none transition-colors focus:ring-2 focus:ring-kompass-blue"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="mb-1.5 block text-sm text-kompass-text-secondary">
          Your industry
        </label>
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="w-full appearance-none rounded-lg border border-kompass-border bg-kompass-bg px-3 py-2.5 text-sm text-kompass-text-primary outline-none transition-colors focus:ring-2 focus:ring-kompass-blue"
        >
          <option value="">Select industry</option>
          <option>Fintech / Financial Services</option>
          <option>RegTech / Compliance</option>
          <option>B2B SaaS</option>
          <option>HR Tech</option>
          <option>Legal Tech</option>
          <option>Cybersecurity</option>
          <option>Other B2B</option>
        </select>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-kompass-blue py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Analysing...
          </>
        ) : (
          'Analyse My Product →'
        )}
      </button>

      <p className="mt-3 text-center text-xs text-kompass-text-muted">
        Our AI reads your website and infers your typical buying committee
        structure. Takes about 30 seconds.
      </p>
    </>
  )
}

function ConnectCard({ icon, name, description, color, connected, onConnect }) {
  return (
    <div
      className={`rounded-lg border p-4 transition-colors ${
        connected
          ? 'border-kompass-green'
          : 'border-kompass-border hover:border-kompass-blue'
      }`}
    >
      <div
        className="mb-3 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
      <p className="font-bold text-white">{name}</p>
      <p className="mb-3 text-xs text-kompass-text-muted">{description}</p>
      {connected ? (
        <div className="flex items-center gap-1.5 text-sm text-kompass-green">
          <Check size={14} />
          Connected
        </div>
      ) : (
        <button
          onClick={onConnect}
          className="w-full rounded-md border border-kompass-blue px-3 py-1.5 text-sm text-kompass-blue transition-colors hover:bg-kompass-blue/10"
        >
          Connect {name}
        </button>
      )}
    </div>
  )
}

function StepTwo({ onNext }) {
  const [hubspot, setHubspot] = useState(false)
  const [salesforce, setSalesforce] = useState(false)
  const [skipped, setSkipped] = useState(false)

  const canContinue = hubspot || salesforce || skipped

  return (
    <>
      <h2 className="text-xl font-bold text-white">Connect your CRM</h2>
      <p className="mt-2 mb-6 text-sm text-kompass-text-secondary">
        We'll map your existing contacts to buying committee roles automatically
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <ConnectCard
          icon="H"
          name="HubSpot"
          description="Map contacts, accounts and deal stages"
          color="#FF7A59"
          connected={hubspot}
          onConnect={() => setHubspot(true)}
        />
        <ConnectCard
          icon={<Cloud size={18} />}
          name="Salesforce"
          description="Map contacts, accounts and deal stages"
          color="#00A1E0"
          connected={salesforce}
          onConnect={() => setSalesforce(true)}
        />
      </div>

      <button
        onClick={() => setSkipped(true)}
        className="mb-4 block w-full text-center text-sm text-kompass-text-muted transition-colors hover:text-kompass-text-secondary hover:underline"
      >
        Skip for now — I'll connect later
      </button>

      <button
        onClick={onNext}
        disabled={!canContinue}
        className="w-full rounded-lg bg-kompass-blue py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-40"
      >
        Continue →
      </button>
    </>
  )
}

function StepThree({ onFinish }) {
  const [connected, setConnected] = useState({
    linkedin: false,
    google: false,
    email: false,
    website: false,
  })

  const toggle = (key) =>
    setConnected((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <>
      <h2 className="text-xl font-bold text-white">
        Connect your marketing channels
      </h2>
      <p className="mt-2 mb-6 text-sm text-kompass-text-secondary">
        We'll pull engagement signals across every channel into your account
        views
      </p>

      <div className="mb-6 grid grid-cols-2 gap-3">
        <ConnectCard
          icon={<LinkedinIcon size={18} />}
          name="LinkedIn Ads"
          description="Ad impressions and engagement by account"
          color="#0A66C2"
          connected={connected.linkedin}
          onConnect={() => toggle('linkedin')}
        />
        <ConnectCard
          icon={
            <span className="text-sm font-bold" style={{ color: '#fff' }}>
              G
            </span>
          }
          name="Google Ads"
          description="Search and display campaign signals"
          color="#4285F4"
          connected={connected.google}
          onConnect={() => toggle('google')}
        />
        <ConnectCard
          icon={<Mail size={18} />}
          name="Email / HubSpot"
          description="Email open and click signals"
          color="#F59E0B"
          connected={connected.email}
          onConnect={() => toggle('email')}
        />
        <ConnectCard
          icon={<Globe size={18} />}
          name="Website Analytics"
          description="Page visits and behaviour by company"
          color="#10B981"
          connected={connected.website}
          onConnect={() => toggle('website')}
        />
      </div>

      <button
        onClick={onFinish}
        className="w-full rounded-lg bg-kompass-blue py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Finish Setup →
      </button>
    </>
  )
}

function ProcessingScreen() {
  const navigate = useNavigate()
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setMessageIndex((prev) => (prev + 1) % PROCESSING_MESSAGES.length)
        setFade(true)
      }, 200)
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const start = Date.now()
    const duration = 6000
    const tick = () => {
      const elapsed = Date.now() - start
      const pct = Math.min((elapsed / duration) * 100, 100)
      setProgress(pct)
      if (pct < 100) {
        requestAnimationFrame(tick)
      } else {
        navigate('/accounts')
      }
    }
    requestAnimationFrame(tick)
  }, [navigate])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-kompass-bg">
      <Compass size={64} className="animate-compass-spin text-kompass-blue" />
      <h2 className="mt-6 text-lg font-bold text-white">
        Building your account intelligence
      </h2>
      <p
        className={`mt-3 text-sm text-kompass-text-secondary transition-opacity duration-200 ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {PROCESSING_MESSAGES[messageIndex]}
      </p>
      <div className="mt-6 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-kompass-border">
        <div
          className="h-full rounded-full bg-kompass-blue transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

function Onboarding() {
  const [step, setStep] = useState(1)
  const [showProcessing, setShowProcessing] = useState(false)

  const nextStep = useCallback(() => setStep((s) => s + 1), [])

  if (showProcessing) {
    return <ProcessingScreen />
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-kompass-bg px-4">
      {step === 1 && (
        <div className="mb-6 flex items-center gap-2">
          <Compass size={32} className="text-kompass-blue" />
          <span className="text-xl font-bold text-white">Kompass</span>
        </div>
      )}

      <div className="w-full max-w-[480px]">
        <ProgressIndicator currentStep={step} />

        <div className="rounded-xl border border-kompass-border bg-kompass-surface p-8">
          {step === 1 && <StepOne onNext={nextStep} />}
          {step === 2 && <StepTwo onNext={nextStep} />}
          {step === 3 && (
            <StepThree onFinish={() => setShowProcessing(true)} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Onboarding
