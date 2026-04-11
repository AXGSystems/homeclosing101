export default function AltaMembershipCTA() {
  return (
    <section className="py-12 bg-gradient-to-r from-alta-navy to-[#0d3a5c] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl font-bold mb-3">Are You a Title Professional?</h2>
        <p className="text-gray-300 max-w-xl mx-auto mb-6 text-sm leading-relaxed">
          Join the American Land Title Association and gain access to industry best practices, compliance resources, advocacy on Capitol Hill, networking events, and listing in the ALTA member directory.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://www.alta.org/membership/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 bg-alta-teal text-white font-semibold rounded-lg hover:bg-alta-teal-dark transition-colors inline-flex items-center justify-center gap-2"
          >
            Become an ALTA Member
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <a
            href="https://www.alta.org/about/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-7 py-3 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center"
          >
            Learn About ALTA
          </a>
        </div>
        <p className="text-[10px] text-gray-400 mt-4">6,000+ member companies across all 50 states</p>
      </div>
    </section>
  );
}
