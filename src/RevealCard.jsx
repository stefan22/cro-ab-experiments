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
      // stagger 6 at a time
      style={{ transitionDelay: `${(index % 6) * 60}ms` }}
    >
      <div className="card__header">
        <span className="card__name">{experiment.name}</span>
        <span className="card__arrow" aria-hidden="true">↗</span>
      </div>
      <p className="card__description">{experiment.description}</p>
      <div className="card__meta">
        <span className="card__stack">{experiment.stack}</span>
        <span className={`card__docs${experiment.hasDocs ? ' card__docs--yes' : ''}`}>
          {experiment.hasDocs ? 'Docs available' : 'No docs'}
        </span>
      </div>
    </a>
  )
}

export default RevealCard
