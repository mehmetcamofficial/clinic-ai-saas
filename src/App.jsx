import { useState } from "react"
import { analyzeSession } from "./services/ai"
import "./index.css"

export default function App() {
  const [tab, setTab] = useState("dashboard")
  const [note, setNote] = useState("")
  const [aiResult, setAiResult] = useState("")
  const [loading, setLoading] = useState(false)

  const runAI = async () => {
    setLoading(true)

    const result = await analyzeSession(note)

    setAiResult(result)
    setLoading(false)
  }

  return (
    <div style={styles.shell}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2>🏥 ClinicAI</h2>

        <button onClick={() => setTab("dashboard")}>Dashboard</button>
        <button onClick={() => setTab("patients")}>Patients</button>
        <button onClick={() => setTab("sessions")}>Sessions</button>
        <button onClick={() => setTab("ai")}>AI Reports</button>
      </div>

      {/* MAIN */}
      <div style={styles.main}>
        <div style={styles.card}>
          {tab === "dashboard" && (
            <>
              <h1>Dashboard</h1>
              <p>Active Patients: 128</p>
              <p>Sessions: 742</p>
              <p>AI Reports: 1284</p>
            </>
          )}

          {tab === "patients" && (
            <>
              <h1>Patients</h1>
              <ul>
                <li>Ayşe Yılmaz</li>
                <li>Mehmet Kaya</li>
                <li>Elif Demir</li>
              </ul>
            </>
          )}

          {tab === "sessions" && (
            <>
              <h1>Sessions</h1>

              <textarea
                style={styles.textarea}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write session notes..."
              />
            </>
          )}

          {tab === "ai" && (
            <>
              <h1>AI Reports</h1>

              <button style={styles.btn} onClick={runAI}>
                {loading ? "Analyzing..." : "Run AI Analysis"}
              </button>

              {aiResult && (
                <pre style={styles.report}>{aiResult}</pre>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  shell: {
    display: "flex",
    height: "100vh",
    fontFamily: "system-ui",
    background: "#f6f7fb",
  },
  sidebar: {
    width: 240,
    background: "#111827",
    color: "white",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  main: {
    flex: 1,
    padding: 30,
    overflow: "auto",
  },
  card: {
    background: "white",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  textarea: {
    width: "100%",
    height: 120,
    marginTop: 10,
    padding: 10,
  },
  btn: {
    padding: 10,
    background: "#7c3aed",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    marginTop: 10,
  },
  report: {
    marginTop: 20,
    background: "#f9fafb",
    padding: 12,
    borderRadius: 8,
    whiteSpace: "pre-wrap",
  },
}