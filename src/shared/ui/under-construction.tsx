type Props = {
  section: string;
  description: string;
  features?: string[];
};

export function UnderConstruction({ section, description, features }: Props) {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --bg: #000; --fg: #ededed; --muted: #888; --border: #222; --hover: #111; }
        body { background: var(--bg); color: var(--fg); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
        a { color: inherit; }

        .uc { min-height: 100vh; display: flex; flex-direction: column; }
        .uc-nav { display: flex; align-items: center; justify-content: space-between; padding: 0 1.5rem; height: 48px; border-bottom: 1px solid var(--border); }
        .uc-nav-left { display: flex; align-items: center; gap: 0.625rem; }
        .uc-brand { font-size: 0.875rem; font-weight: 600; letter-spacing: -0.02em; text-decoration: none; }
        .uc-sep { color: #333; font-weight: 300; font-size: 1.125rem; }
        .uc-section { color: var(--muted); font-size: 0.8125rem; }
        .uc-gh { color: var(--muted); text-decoration: none; font-size: 0.8125rem; transition: color 0.15s; }
        .uc-gh:hover { color: var(--fg); }

        .uc-main { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2rem; gap: 1.25rem; }
        .uc-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0.75rem; border: 1px solid var(--border); border-radius: 999px; font-size: 0.75rem; color: var(--muted); }
        .uc-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--fg); animation: uc-pulse 2s ease-in-out infinite; }
        @keyframes uc-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .uc-main h1 { font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 700; letter-spacing: -0.03em; line-height: 1.15; }
        .uc-main p { color: var(--muted); font-size: 0.9375rem; max-width: 400px; line-height: 1.6; }
        .uc-features { display: flex; flex-direction: column; gap: 0.375rem; margin-top: 0.25rem; }
        .uc-feature { display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.8125rem; color: var(--muted); }
        .uc-check { color: #555; }

        .uc-footer { padding: 1rem 1.5rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
        .uc-footer span, .uc-footer a { color: #555; font-size: 0.75rem; text-decoration: none; }
        .uc-footer a:hover { color: var(--muted); }
      `}</style>
      <div className="uc">
        <nav className="uc-nav">
          <div className="uc-nav-left">
            <a href="/" className="uc-brand">w3-kit</a>
            {section !== "Home" && (
              <>
                <span className="uc-sep">/</span>
                <span className="uc-section">{section}</span>
              </>
            )}
          </div>
          <a href="https://github.com/w3-kit" target="_blank" rel="noopener noreferrer" className="uc-gh">GitHub</a>
        </nav>

        <div className="uc-main">
          <div className="uc-badge">
            <span className="uc-dot" />
            Under construction
          </div>
          <h1>{section === "Home" ? "Build and learn web3. Any chain." : section}</h1>
          <p>{description}</p>
          {features && features.length > 0 && (
            <div className="uc-features">
              {features.map((f) => (
                <span key={f} className="uc-feature">
                  <span className="uc-check">—</span> {f}
                </span>
              ))}
            </div>
          )}
        </div>

        <footer className="uc-footer">
          <span>w3-kit</span>
          <a href="https://x.com/nickstoev" target="_blank" rel="noopener noreferrer">@nickstoev</a>
        </footer>
      </div>
    </>
  );
}
