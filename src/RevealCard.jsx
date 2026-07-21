import { useEffect, useRef, useState } from 'react'

function RevealCard({ experiment, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(node)
          }
        })
      },
      { threshold: 0.15 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <a
      ref={ref}
      href={experiment.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`card${visible ? ' card--visible' : ''}`}
      style={{ transitionDelay: `${Math.min(index % 6, 5) * 60}ms` }}
    >
      <div className="card__header">
        <span className="card__name">{experiment.name}</span>
        <span className="card__arrow" aria-hidden="true">↗</span>
      </div>
      <p className="card__description">{experiment.description}</p>
      <span className="card__stack">{experiment.stack}</span>
    </a>
  )
}

export default RevealCard
