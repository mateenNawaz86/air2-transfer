'use client'

import { useEffect } from 'react'

const RELOAD_FLAG_KEY = 'chunk-error-reload'

function isChunkLoadError(message?: string | null) {
  if (!message) return false
  return /Loading chunk .* failed|ChunkLoadError|Loading CSS chunk/i.test(message)
}

export default function ChunkErrorRecovery() {
  useEffect(() => {
    const reload = () => {
      if (sessionStorage.getItem(RELOAD_FLAG_KEY)) return
      sessionStorage.setItem(RELOAD_FLAG_KEY, '1')
      window.location.reload()
    }

    const onError = (event: ErrorEvent) => {
      if (isChunkLoadError(event.message)) reload()
    }

    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason
      const message = reason?.message || String(reason)
      if (isChunkLoadError(message)) reload()
    }

    window.addEventListener('error', onError)
    window.addEventListener('unhandledrejection', onRejection)

    // Once the page has stayed up for a few seconds, clear the flag so a
    // genuinely new chunk-load failure later in the session can still
    // trigger one more automatic recovery, instead of only ever firing once.
    const clearFlagTimer = setTimeout(() => {
      sessionStorage.removeItem(RELOAD_FLAG_KEY)
    }, 3000)

    return () => {
      window.removeEventListener('error', onError)
      window.removeEventListener('unhandledrejection', onRejection)
      clearTimeout(clearFlagTimer)
    }
  }, [])

  return null
}
