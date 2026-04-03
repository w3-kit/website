type Props = {
  section: string;
  description: string;
  showSubdomains?: boolean;
};

export function UnderConstruction({ section, description, showSubdomains }: Props) {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --bg: #000; --fg: #ededed; --muted: #888; --dimmed: #555; --border: #333; }
        body { background: var(--bg); color: var(--fg); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
        a { color: inherit; }

        .uc { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 2rem; gap: 1.5rem; }
        .uc-logo { width: 64px; height: 64px; }
        .uc-desc { color: var(--muted); font-size: 0.875rem; max-width: 360px; line-height: 1.6; }
        .uc-buttons { display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: center; }
        .uc-btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.625rem 1.5rem; border-radius: 0.5rem; font-size: 0.875rem; font-weight: 500; text-decoration: none; transition: all 0.15s; }
        .uc-btn-primary { background: var(--fg); color: var(--bg); }
        .uc-btn-primary:hover { background: #fff; }
        .uc-btn-secondary { border: 1px solid var(--border); color: var(--fg); }
        .uc-btn-secondary:hover { background: #111; }
        .uc-links { display: flex; gap: 1.5rem; flex-wrap: wrap; justify-content: center; padding-top: 0.5rem; }
        .uc-link { display: inline-flex; align-items: center; gap: 0.375rem; font-size: 0.8125rem; color: var(--muted); text-decoration: none; transition: color 0.15s; }
        .uc-link:hover { color: var(--fg); }
        .uc-link svg { width: 14px; height: 14px; }
      `}</style>
      <div className="uc">
        <img src="/logo.png" alt="w3-kit" className="uc-logo" />

        <p className="uc-desc">{description}</p>

        <div className="uc-buttons">
          <a href="https://github.com/w3-kit" target="_blank" rel="noopener noreferrer" className="uc-btn uc-btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
          {section !== "Home" && (
            <a href="/" className="uc-btn uc-btn-secondary">Back to home</a>
          )}
        </div>

        {showSubdomains && (
          <div className="uc-links">
            <a href="https://ui.w3-kit.com" className="uc-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
              UI Library
            </a>
            <a href="https://docs.w3-kit.com" className="uc-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>
              Docs
            </a>
            <a href="https://registry.w3-kit.com" className="uc-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
              Registry
            </a>
          </div>
        )}
      </div>
    </>
  );
}
