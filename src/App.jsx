import { useState } from "react"
import "./index.css"

export default function App() {
  const [tab, setTab] = useState("dashboard")
  const [note, setNote] = useState("")
  const [aiResult, setAiResult] = useState("")
  const [loading, setLoading] = useState(false)

  const runMockAI = async () => {
    setLoading(true)

    try {
      // güvenli fallback (API olmasa bile crash yok)
      await new Promise((r) => setTimeout(r, 800))

      setAiResult(
        "AI Summary: Patient shows mild depressive symptoms. Recommend structured therapy and follow-up."
      )
    } catch (err) {
      setAiResult("AI Error occurred")
    }

    setLoading(false)
  }

  return (
    <div style={styles.app}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2>🏥 ClinicAI</h2>

        <button style={styles.btn} onClick={() => setTab("dashboard")}>
          Dashboard
        </button>

        <button style={styles.btn} onClick={() => setTab("patients")}>
          Patients
        </button>

        <button style={styles.btn} onClick={() => setTab("sessions")}>
          Sessions
        </button>

        <button style={styles.btn} onClick={() => setTab("ai")}>
          AI Reports
        </button>
      </div>

      {/* CONTENT */}
      <div style={styles.content}>
        {tab === "dashboard" && (
          <div>
            <h1>Dashboard</h1>
            <p>Active Patients: 128</p>
            <p>Sessions: 742</p>
            <p>AI Reports: 1284</p>
          </div>
        )}

        {tab === "patients" && (
          <div>
            <h1>Patients</h1>
            <ul>
              <li>Ayşe Yılmaz</li>
              <li>Mehmet Kaya</li>
              <li>Elif Demir</li>
            </ul>
          </div>
        )}

        {tab === "sessions" && (
          <div>
            <h1>Session Notes</h1>

            <textarea
              style={styles.textarea}
              placeholder="Write session notes..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        )}

        {tab === "ai" && (
          <div>
            <h1>AI Reports</h1>

            <button style={styles.primaryBtn} onClick={runMockAI}>
              {loading ? "Analyzing..." : "Run AI Analysis"}
            </button>

            <div style={{ marginTop: 20 }}>
              {aiResult && <p>{aiResult}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* SAFE INLINE STYLES (CSS CRASH YOK) */
const styles = {
  app: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "system-ui",
  },
  sidebar: {
    width: 220,
    borderRight: "1px solid #ddd",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  content: {
    flex: 1,
    padding: 30,
  },
  btn: {
    padding: 10,
    cursor: "pointer",
    background: "#f3f3f3",
    border: "none",
    borderRadius: 6,
    textAlign: "left",
  },
  primaryBtn: {
    padding: 10,
    background: "#7c3aed",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  textarea: {
    width: "100%",
    height: 120,
    padding: 10,
    marginTop: 10,
  },
}