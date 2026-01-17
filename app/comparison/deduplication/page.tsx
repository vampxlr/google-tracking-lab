export default function ComparisonDeduplicationPage() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <h1 className="font-mono text-3xl font-bold text-cyan-500 mb-6">
        Deduplication: Meta vs Google
      </h1>
      <p className="text-gray-400 mb-6">
        Compare how each platform handles duplicate events and deduplication strategies.
      </p>
      <div className="rounded-xl border border-gray-800 bg-gray-900/50 p-6">
        <p className="text-sm text-gray-400">
          Coming soon: Learn how Meta uses event_id + time vs Google's event_timestamp + event_name for deduplication. Understand best practices for preventing duplicate conversions across client and server.
        </p>
      </div>
    </div>
  )
}
