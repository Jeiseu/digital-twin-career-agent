const team = {
  'Team 1 — AI Agent': ['Jayce Reyes', 'Omayra Afreen'],
  'Team 2 — Frontend': ['Dwight Mongaya', 'Christian Raganit', 'Juliene Almojera'],
  'Team 3 — Backend': ['Ariana Siddayao', 'Jenesa Orquesta', 'Alkaeya De la Pena'],
}

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-[#e5e5e5]">
      <div className="max-w-6xl mx-auto px-6 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Brand */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/g1logoupdated.png"
                alt="Digital Twin"
                className="size-10 rounded-full bg-[#0a0a0a] object-contain flex-shrink-0 p-0.5"
              />
              <span className="text-black text-sm font-semibold">Digital Twin</span>
            </div>
            <p className="text-sm text-black leading-relaxed max-w-[240px]">
              An AI-powered career agent that represents skills, experience, and expertise through an interactive digital twin.
            </p>
          </div>

          {/* Team columns */}
          {Object.entries(team).map(([group, members]) => (
            <div key={group}>
              <h3 className="text-xs text-black font-semibold uppercase tracking-wider mb-2">
                {group}
              </h3>
              <ul className="space-y-1">
                {members.map((name) => (
                  <li key={name} className="text-sm text-black">
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#e5e5e5]">
        <div className="max-w-6xl mx-auto px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <p className="text-xs text-black">
              Powered by <span className="underline">Digital Twin</span> · Built by Group 1
            </p>
            {/* GitHub icon */}
            <a
              href="https://github.com/Jeiseu/digital-twin-career-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-[#737373] transition-colors"
            >
              <svg className="size-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>
          <p className="text-xs text-black">ECA Clients</p>
        </div>
      </div>
    </footer>
  )
}
