import { useState } from "react"
import "./index.css"

export default function App() {
  const [tab, setTab] = useState("dashboard")
  const [note, setNote] = useState("")
  const [aiResult, setAiResult] = useState("")
  const [loading, setLoading] = useState(false)

  const runAnalysis = () => {
    setLoading(true)

    setTimeout(() => {
      setAiResult(
        "AI Summary: Patient shows mild depressive symptoms. Risk: Low. Recommendation: Therapy follow-up."
      )
      setLoading(false)
    }, 800)
  }

  return (
    <div style={styles.app}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>🏥 ClinicAI</div>

        <nav style={styles.nav}>
          <NavItem tab="dashboard" current={tab} setTab={setTab} />
          <NavItem tab="patients" current={tab} setTab={setTab} />
          <NavItem tab="sessions" current={tab} setTab={setTab} />
          <NavItem tab="ai" current={tab} setTab={setTab} />
        </nav>
      </aside>

      {/* MAIN */}
      <main style={styles.main}>
        <div style={styles.header}>
          <h1>{tab}</h1>
          <p>Clinical intelligence dashboard</p>
        </div>

        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <div style={styles.grid}>
            <Card title="Active Patients" value="128" />
            <Card title="Sessions" value="742" />
            <Card title="AI Reports" value="1,284" />
          </div>
        )}

        {/* PATIENTS */}
        {tab === "patients" && (
          <div style={styles.card}>
            <h3>Patients</h3>
            <ul>
              <li>Ayşe Yılmaz</li>
              <li>Mehmet Kaya</li>
              <li>Elif Demir</li>
            </ul>
          </div>
        )}

        {/* SESSIONS */}
        {tab === "sessions" && (
          <div style={styles.card}>
            <h3>Session Notes</h3>
            <textarea
              style={styles.textarea}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Write session notes..."
            />
          </div>
        )}

        {/* AI */}
        {tab === "ai" && (
          <div style={styles.card}>
            <h3>AI Analysis</h3>

            <textarea
              style={styles.textarea}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Enter patient note..."
            />

            <button style={styles.btn} onClick={runAnalysis}>
              {loading ? "Analyzing..." : "Run AI Analysis"}
            </button>

            {aiResult && (
              <div style={styles.result}>
                {aiResult}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  )
}

/* SIDEBAR ITEM */
function NavItem({ tab, current, setTab }) {
  return (
    <button
      onClick={() => setTab(tab)}
      style={{
        ...styles.navItem,
        background: current === tab ? "#1d4ed8" : "transparent",
      }}
    >
      {tab}
    </button>
  )
}

/* CARD */
function Card({ title, value }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <p style={styles.big}>{value}</p>
    </div>
  )
}

/* STYLES */
const styles = {
  app: {
    display: "flex",
    height: "100vh",
    fontFamily: "system-ui",
    background: "#f4f6fb",
  },

  sidebar: {
    width: 240,
    background: "#0f172a",
    color: "white",
    padding: 20,
  },

  logo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  navItem: {
    padding: 10,
    borderRadius: 8,
    border: "none",
    color: "white",
    textAlign: "left",
    cursor: "pointer",
  },

  main: {
    flex: 1,
    padding: 30,
  },

  header: {
    marginBottom: 20,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20,
  },

  card: {
    background: "white",
    padding: 20,
    borderRadius: 14,
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
  },

  big: {
    fontSize: 28,
    fontWeight: "bold",
  },

  textarea: {
    width: "100%",
    height: 120,
    marginTop: 10,
    padding: 10,
  },

  btn: {
    marginTop: 10,
    padding: 10,
    background: "#1d4ed8",
    color: "white",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    marginTop: 10,
  },

  result: {
    marginTop: 15,
    padding: 10,
    background: "#f1f5f9",
    borderRadius: 8,
    whiteSpace: "pre-wrap",
  },
}