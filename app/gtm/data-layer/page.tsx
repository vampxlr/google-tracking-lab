export default function GTMDataLayerPage() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <h1 className="font-mono text-3xl font-bold text-purple-500 mb-6">
        The Data Layer
      </h1>
      <p className="text-gray-400 mb-6">
        Learn how to use the data layer to pass information to GTM.
      </p>
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <p className="text-sm text-gray-400">
          The data layer is a JavaScript object that holds information for GTM tags.
        </p>
        <div className="mt-4 p-4 rounded-lg border border-purple-500/30 bg-purple-600/10">
          <p className="text-xs text-gray-400">
            <span className="text-purple-500 font-mono">📝</span> Coming soon: Complete data layer guide including push/receive methods, e-commerce events, and best practices.
          </p>
        </div>
      </div>
    </div>
  )
}
