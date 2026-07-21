import { useEffect, useState } from 'react'
import experiments from './data.js'
import RevealCard from './RevealCard.jsx'

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner" />
        <p>Loading experiments…</p>
      </div>
    )
  }

  return (
    <div className="page">
      <header className="hero">
        <h1>CRO / AB Testing Experiments</h1>
        <p>
          A hub linking together every conversion-rate-optimisation and A/B-testing experiment
          across my repositories — client-side DOM-injection experiments and reusable starter
          scaffolding for building new test variations.
        </p>
      </header>

      <main className="grid">
        {experiments.map((experiment, index) => (
          <RevealCard key={experiment.name} experiment={experiment} index={index} />
        ))}
      </main>

      <footer className="footer">
        <a href="https://github.com/stefan22" target="_blank" rel="noopener noreferrer">
          @stefan22 on GitHub
        </a>
      </footer>
    </div>
  )
}

export default App
