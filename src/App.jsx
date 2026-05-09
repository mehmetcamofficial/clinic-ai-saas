import { useState } from "react"
import { analyzeSession } from "./services/ai"

export default function App() {
  const [note, setNote] = useState("")
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)

  const runAI = async () => {
    if (!note.trim()) return

    setLoading(true)
    setSummary("")

    try {
      const result = await analyzeSession(note)
      setSummary(result)
    } catch (err) {
      setSummary("AI Error")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* SIDEBAR */}
      <div className="w-72 bg-slate-900 border-r border-slate-800 p-6">

        <h1 className="text-2xl font-bold mb-10">
          🏥 ClinicAI
        </h1>

        <div className="space-y-3">

          <div className="bg-slate-800 p-4 rounded-xl">
            Dashboard
          </div>

          <div className="bg-slate-800 p-4 rounded-xl">
            Patients
          </div>

          <div className="bg-slate-800 p-4 rounded-xl">
            Sessions
          </div>

          <div className="bg-slate-800 p-4 rounded-xl">
            AI Reports
          </div>

        </div>

        <div className="mt-10">
          <h3 className="text-slate-400 mb-3">
            Active Patients
          </h3>

          <div className="space-y-2">

            <div className="bg-slate-800 p-3 rounded-lg">
              Ayşe Yılmaz
            </div>

            <div className="bg-slate-800 p-3 rounded-lg">
              Mehmet Kaya
            </div>

            <div className="bg-slate-800 p-3 rounded-lg">
              Elif Demir
            </div>

          </div>
        </div>

      </div>

      {/* MAIN */}
      <div className="flex-1 p-10">

        <div className="mb-10">

          <h1 className="text-4xl font-bold mb-2">
            AI Clinical Assistant
          </h1>

          <p className="text-slate-400">
            Analyze therapy sessions with AI-powered summaries.
          </p>

        </div>

        {/* CARDS */}
        <div className="grid grid-cols-3 gap-6 mb-8">

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3 className="text-slate-400">Patients</h3>
            <p className="text-3xl font-bold mt-2">128</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3 className="text-slate-400">Sessions</h3>
            <p className="text-3xl font-bold mt-2">742</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3 className="text-slate-400">AI Reports</h3>
            <p className="text-3xl font-bold mt-2">1,284</p>
          </div>

        </div>

        {/* NOTE AREA */}
        <div className="bg-slate-900 rounded-2xl p-6">

          <h2 className="text-2xl font-bold mb-4">
            Session Notes
          </h2>

          <textarea
            className="w-full h-52 bg-slate-800 rounded-xl p-4 outline-none border border-slate-700"
            placeholder="Write session notes..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <button
            onClick={runAI}
            disabled={loading}
            className="mt-5 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold transition"
          >
            {loading ? "Analyzing..." : "Run AI Analysis"}
          </button>

        </div>

        {/* AI OUTPUT */}
        <div className="bg-slate-900 rounded-2xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-4">
            AI Summary
          </h2>

          <div className="text-slate-300 whitespace-pre-wrap">
            {summary || "AI response will appear here."}
          </div>

        </div>

      </div>

    </div>
  )
}