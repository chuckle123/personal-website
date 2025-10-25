export default function Home() {
  return (
    <main className="container">
      <div className="hero">
        <h1>Welcome to My Personal Website</h1>
        <p className="subtitle">This is a test render deployed with GitHub Pages</p>

        <div className="card-grid">
          <div className="card">
            <h2>About Me</h2>
            <p>Learn more about my background and interests.</p>
          </div>

          <div className="card">
            <h2>Projects</h2>
            <p>Check out my latest work and projects.</p>
          </div>

          <div className="card">
            <h2>Contact</h2>
            <p>Get in touch with me.</p>
          </div>
        </div>

        <div className="deployment-info">
          <p>✅ Deployed successfully with Next.js + GitHub Pages</p>
          <p>Build Date: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </main>
  )
}
