import Link from 'next/link'

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Services', href: '#' },
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#' },
]

export default function Header() {
  return (
    <header className="w-full bg-white border-b border-[#e5e5e5]">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/g1logoupdated.png"
            alt="Digital Twin"
            className="size-14 rounded-full bg-[#0a0a0a] object-contain flex-shrink-0 p-1"
          />
          <span className="text-black text-lg font-semibold tracking-tight">
            Digital Twin
          </span>
          {/* Online status */}
          <div className="flex items-center gap-1.5 ml-2">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-green-500" />
            </span>
            <span className="text-sm text-black">24/7 Active</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="btn-hover relative text-sm font-normal text-black hover:text-black transition-colors pb-0.5"
            >
              <span className="btn-label">{link.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
