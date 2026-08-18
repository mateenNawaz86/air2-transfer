'use client'

import { useEffect, useRef, useState } from 'react'

export const useScrollAnimation = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
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
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(itemCount).fill(false))
  const elementRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
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