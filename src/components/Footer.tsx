export default function Footer() {
  return (
    <footer className="bg-[#141e30] text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2 text-[10px] sm:text-[11px] text-gray-400">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 sm:w-5 sm:h-5 rounded bg-alta-teal flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            <span>
              <span className="font-bold text-white text-[10px] sm:text-xs">HomeClosing</span>
              <span className="font-bold text-alta-teal text-[10px] sm:text-xs">101</span>
              <span className="mx-1 text-gray-600">|</span>
              <span className="hidden sm:inline">An educational initiative of ALTA.</span>
              &copy; {new Date().getFullYear()}
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <span>601 Pennsylvania Ave NW, Suite 750, Washington, D.C. 20004</span>
            <span className="text-gray-600">|</span>
            <span>202.296.3671</span>
            <a
              href="https://www.alta.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-alta-teal hover:text-white transition-colors font-medium"
            >
              alta.org
            </a>
            <span className="text-gray-600">|</span>
            <div className="flex items-center gap-2">
              <a href="https://www.linkedin.com/company/alta-american-land-title-association" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-alta-teal transition-colors" aria-label="LinkedIn">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="https://twitter.com/ALTAonline" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-alta-teal transition-colors" aria-label="X (Twitter)">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-[10px]" style={{ color: '#d4a843' }}>Designed by <strong>AXG Systems</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
