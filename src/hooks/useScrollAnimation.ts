'use client'

import { useEffect, useRef, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const useScrollAnimation = (threshold = 0.1) => {
  // Visible by default: the server-rendered and pre-hydration markup must never
  // depend on JS running to show its copy. Only flip to a hidden pre-animation
  // state once we've confirmed JS is running and the user allows motion.
  const [isVisible, setIsVisible] = useState(true)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Reduced-motion users keep the copy visible, without waiting on scroll
    if (prefersReducedMotion()) {
      return
    }

    setIsVisible(false)

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Once visible, stop observing to prevent re-triggering
          observer.unobserve(entry.target)
        }
      },
      {
        threshold,
        rootMargin: '50px 0px -50px 0px'
      }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [threshold])

  return { elementRef, isVisible }
}

export const useStaggeredScrollAnimation = (itemCount: number, threshold = 0.1) => {
  // Visible by default for the same reason as useScrollAnimation above: no
  // JS, no problem — items only become hidden once JS confirms it's running.
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(itemCount).fill(true))
  const elementRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    // Reduced-motion users keep all items visible, without waiting on scroll
    if (prefersReducedMotion()) {
      return
    }

    setVisibleItems(new Array(itemCount).fill(false))

    const observers = elementRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisibleItems(prev => {
                const newState = [...prev]
                newState[index] = true
                return newState
              })
            }, index * 100) // Stagger by 100ms
            observer.unobserve(entry.target)
          }
        },
        {
          threshold,
          rootMargin: '50px 0px -50px 0px'
        }
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach(observer => observer?.disconnect())
    }
  }, [itemCount, threshold])

  const setRef = (index: number) => (ref: HTMLDivElement | null) => {
    elementRefs.current[index] = ref
  }

  return { visibleItems, setRef }
} 