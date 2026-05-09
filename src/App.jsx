import { useState } from "react"
import "./index.css"

export default function App() {
  const [tab, setTab] = useState("dashboard")

  return (
    <div style={styles.app}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.logo}>🏥 ClinicAI</div>

        <nav style={styles.nav}>
          <button onClick={() => setTab("dashboard")}>Dashboard</button>
          <button onClick={() => setTab("patients")}>Patients</button>
          <button onClick={() => setTab("sessions")}>Sessions</button>
          <button onClick={() => setTab("ai")}>AI Reports</button>
        </nav>
      </aside>

      {/* CONTENT */}
      <main style={styles.main}>
        <div style={styles.header}>
          <h1>{tab.toUpperCase()}</h1>
          <p>Clinical intelligence dashboard</p>
        </div>

        <div style={styles.grid}>
          {tab === "dashboard" && (
            <>
              <Card title="Active Patients" value="128" />
              <Card title="Sessions" value="742" />
              <Card title="AI Reports" value="1,284" />
            </>
          )}

          {tab === "patients" && (
            <CardList
              items={["Ayşe Yılmaz", "Mehmet Kaya", "Elif Demir"]}
            />
          )}

          {tab === "sessions" && (
            <div style={styles.card}>
              <h3>Session Notes</h3>
              <textarea style={styles.textarea} />
            </div>
          )}

          {tab === "ai" && (
            <div style={styles.card}>
              <h3>AI Reports</h3>
              <p>AI module ready for integration</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

/* COMPONENTS */
function Card({ title, value }) {
  return (
    <div style={styles.card}>
      <h3>{title}</h3>
      <p style={styles.big}>{value}</p>
    </div>
  )
}

function CardList({ items }) {
  return (
    <div style={styles.card}>
      <h3>Patients</h3>
      <ul>
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
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
    width: 260,
    background: "#0f172a",
    color: "white",
    padding: 20,
    display: "flex",
    flexDirection: "column",
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