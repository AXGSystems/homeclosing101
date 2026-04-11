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
          </div>
        </div>
      </div>
    </footer>
  );
}
