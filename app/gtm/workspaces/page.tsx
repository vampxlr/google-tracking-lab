export default function GTMWorkspacesPage() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <h1 className="font-mono text-3xl font-bold text-purple-500 mb-6">
        Workspaces & Versions
      </h1>
      <p className="text-gray-400 mb-6">
        Learn how to use workspaces and version control in GTM.
      </p>
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <p className="text-sm text-gray-400">
          Workspaces allow you to make and test changes without affecting production.
        </p>
        <div className="mt-4 p-4 rounded-lg border border-purple-500/30 bg-purple-600/10">
          <p className="text-xs text-gray-400">
            <span className="text-purple-500 font-mono">📝</span> Coming soon: Complete workspaces guide covering preview mode, publishing, and version history.
          </p>
        </div>
      </div>
    </div>
  )
}
