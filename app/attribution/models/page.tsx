export default function AttributionModelsPage() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <h1 className="font-mono text-3xl font-bold text-orange-500 mb-6">
        Attribution Models
      </h1>
      <p className="text-gray-400 mb-6">
        Understand different attribution models and when to use each.
      </p>
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <p className="text-sm text-gray-400">
          Attribution models determine how credit is assigned to touchpoints in the user journey.
        </p>
        <div className="mt-4 p-4 rounded-lg border border-orange-500/30 bg-orange-600/10">
          <p className="text-xs text-gray-400">
            <span className="text-orange-500 font-mono">📝</span> Coming soon: Complete attribution models guide covering Data-Driven, Last Click, First Click, Linear, Time Decay, and Position-Based.
          </p>
        </div>
      </div>
    </div>
  )
}
