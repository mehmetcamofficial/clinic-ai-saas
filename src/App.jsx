{tab === "ai" && (
  <>
    <h1>AI Reports</h1>

    {/* INPUT BOX */}
    <textarea
      style={styles.textarea}
      value={note}
      onChange={(e) => setNote(e.target.value)}
      placeholder="Write patient session notes..."
    />

    {/* BUTTON */}
    <button style={styles.primaryBtn} onClick={runMockAI}>
      Run AI Analysis
    </button>

    {/* OUTPUT */}
    {aiResult && (
      <div style={styles.reportCard}>
        <h3>Clinical Summary</h3>

        <p><b>Summary:</b> {aiResult.summary}</p>
        <p><b>Risk Level:</b> {aiResult.risk}</p>
        <p><b>Recommendation:</b> {aiResult.recommendation}</p>
        <p><b>Next Step:</b> {aiResult.nextStep}</p>
      </div>
    )}
  </>
)}