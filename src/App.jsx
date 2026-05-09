import { useState } from "react"
import "./index.css"

export default function App() {
  const [tab, setTab] = useState("dashboard")
  const [note, setNote] = useState("")
  const [aiResult, setAiResult] = useState("")

  const runMockAI = () => {
    setAiResult({
      summary: "Patient shows mild depressive symptoms.",
      risk: "Low",
      recommendation: "Therapy follow-up recommended",
      nextStep: "Weekly monitoring advised",
    })
  }

  return (
    <div style={styles.app}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2>🏥 ClinicAI</h2>

        <button onClick={() => setTab("dashboard")} style={styles.btn}>
          Dashboard
        </button>

        <button onClick={() => setTab("patients")} style={styles.btn}>
          Patients
        </button>

        <button onClick={() => setTab("sessions")} style={styles.btn}>
          Sessions
        </button>

        <button onClick={() => setTab("ai")} style={styles.btn}>
          AI Reports
        </button>
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

              <button style={styles.primaryBtn} onClick={runMockAI}>
                Run AI Analysis
              </button>

              {aiResult && (
                <div style={styles.reportCard}>
                  <h3>Clinical Summary</h3>

                  <p>
                    <b>Summary:</b> {aiResult.summary}
                  </p>

                  <p>
                    <b>Risk Level:</b> {aiResult.risk}
                  </p>

                  <p>
                    <b>Recommendation:</b> {aiResult.recommendation}
                  </p>

                  <p>
                    <b>Next Step:</b> {aiResult.nextStep}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const styles = {
  app: {
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
  btn: {
    padding: 10,
    background: "#1f2937",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    textAlign: "left",
  },
  primaryBtn: {
    padding: 10,
    background: "#7c3aed",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    marginTop: 10,
  },
  textarea: {
    width: "100%",
    height: 120,
    marginTop: 10,
    padding: 10,
  },
  reportCard: {
    marginTop: 20,
    padding: 16,
    background: "#f9fafb",
    borderRadius: 10,
    border: "1px solid #e5e7eb",
  },
}