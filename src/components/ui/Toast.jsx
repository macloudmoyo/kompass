import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { Check, TrendingUp, AlertCircle, Sparkles, X } from 'lucide-react'

const ToastContext = createContext(null)

const VARIANTS = {
  purple: { bg: 'bg-kompass-purple/10', border: 'border-kompass-purple/30', text: 'text-kompass-purple', Icon: Sparkles },
  green: { bg: 'bg-kompass-green/10', border: 'border-kompass-green/30', text: 'text-kompass-green', Icon: Check },
  blue: { bg: 'bg-kompass-blue/10', border: 'border-kompass-blue/30', text: 'text-kompass-blue', Icon: TrendingUp },
  amber: { bg: 'bg-kompass-amber/10', border: 'border-kompass-amber/30', text: 'text-kompass-amber', Icon: AlertCircle },
}

function ToastItem({ toast, onDismiss }) {
  const [visible, setVisible] = useState(false)
  const v = VARIANTS[toast.variant] || VARIANTS.blue

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onDismiss(toast.id), 300)
    }, 3000)
    return () => clearTimeout(timer)
  }, [toast.id, onDismiss])

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border ${v.border} ${v.bg} px-4 py-3 shadow-lg backdrop-blur-sm transition-all duration-300 ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <v.Icon size={16} className={v.text} />
      <span className="text-sm text-kompass-text-primary">{toast.message}</span>
      <button onClick={() => { setVisible(false); setTimeout(() => onDismiss(toast.id), 300) }} className="ml-2 text-kompass-text-muted hover:text-kompass-text-secondary">
        <X size={14} />
      </button>
    </div>
  )
}

let _toastId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, variant = 'blue') => {
    const id = ++_toastId
    setToasts((prev) => [...prev, { id, message, variant }])
  }, [])

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="fixed right-4 top-4 z-[100] flex flex-col gap-2">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={dismiss} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
