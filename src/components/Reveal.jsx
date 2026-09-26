import { useEffect, useRef, useState } from 'react'

export function Reveal({ children, as: Tag = 'div', delay = 0, className = '', style, ...props }) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  // the stagger delay is for the entrance only; left on, it would lag every later hover
  const [settled, setSettled] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setInView(true)
        observer.unobserve(el)
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal${inView ? ' is-in' : ''}${className ? ` ${className}` : ''}`}
      style={delay && !settled ? { ...style, transitionDelay: `${delay}ms` } : style}
      onTransitionEnd={(e) => inView && e.target === e.currentTarget && setSettled(true)}
      {...props}
    >
      {children}
    </Tag>
  )
}
