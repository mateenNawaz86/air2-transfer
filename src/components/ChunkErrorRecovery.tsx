'use client'

import { useEffect } from 'react'

const RELOAD_FLAG_KEY = 'chunk-error-reload'

// Site audit — "Monitor _next/static/* 404 responses after deployments":
// a stale-chunk failure recovers silently for the visitor (see reload()
// below), which is the right UX, but it also means nobody finds out a
// deployment left old chunk references live unless something reports it.
// This posts a small, fire-and-forget beacon - just when, which page, and
// the browser's error message - to a webhook URL you control (Discord,
// Slack, or a plain endpoint like webhook.site all accept this shape).
// Deliberately not a full error-tracking setup: no stack trace, no session
// replay, no PII beyond the user agent string. Configure by setting
// NEXT_PUBLIC_CHUNK_ERROR_WEBHOOK_URL in .env/.env.local; with it unset,
// reporting is skipped entirely and only the reload behavior below runs.
function reportChunkError(message: string) {
  const webhookUrl = process.env.NEXT_PUBLIC_CHUNK_ERROR_WEBHOOK_URL
  if (!webhookUrl || typeof navigator === 'undefined') return

  const text =
    `Air2Transport: chunk load error detected\n` +
    `Time: ${new Date().toISOString()}\n` +
    `Page: ${window.location.href}\n` +
    `User agent: ${navigator.userAgent}\n` +
    `Error: ${message}`

  // Both keys included so this works unmodified against a Discord webhook
  // (reads "content"), a Slack webhook (reads "text"), or a plain inspector
  // like webhook.site (shows the raw body either way).
  const payload = JSON.stringify({ content: text, text })

  try {
    if (navigator.sendBeacon) {
      // sendBeacon is the right tool here specifically because the page is
      // about to reload/unload - a normal fetch() can get cancelled mid-flight
      // when that happens, sendBeacon is designed to survive it.
      const blob = new Blob([payload], { type: 'application/json' })
      navigator.sendBeacon(webhookUrl, blob)
    } else {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {})
    }
  } catch {
    // Reporting must never block or break the actual recovery below.
  }
}

function isChunkLoadError(message?: string | null) {
  if (!message) return false
  return /Loading chunk .* failed|ChunkLoadError|Loading CSS chunk/i.test(message)
}

export default function ChunkErrorRecovery() {
  useEffect(() => {
    const reload = (message: string) => {
      // Guard first, so a burst of near-simultaneous chunk failures (several
      // requests failing at once after one bad deploy) reports and reloads
      // exactly once, not once per failed request.
      if (sessionStorage.getItem(RELOAD_FLAG_KEY)) return
      sessionStorage.setItem(RELOAD_FLAG_KEY, '1')
      reportChunkError(message)
      window.location.reload()
    }

    const onError = (event: ErrorEvent) => {
      if (isChunkLoadError(event.message)) reload(event.message)
    }

    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason
      const message = reason?.message || String(reason)
      if (isChunkLoadError(message)) reload(message)
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
