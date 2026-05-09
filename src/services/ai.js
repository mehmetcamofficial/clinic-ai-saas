export async function analyzeSession(note) {
  const key = import.meta.env.VITE_OPENROUTER_API_KEY

  // 1. ENV CHECK (kritik)
  if (!key) {
    console.error("❌ ENV missing: VITE_OPENROUTER_API_KEY")
    return "❌ API key not loaded from Vercel environment"
  }

  console.log("✅ API KEY LOADED")

  try {
    // 2. API CALL
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "Clinic AI SaaS",
        },
        body: JSON.stringify({
          // 🔥 STABLE MODEL (en az hata veren)
          model: "mistralai/mistral-7b-instruct",

          messages: [
            {
              role: "system",
              content:
                "You are a professional clinical AI assistant. Summarize patient notes in structured medical format.",
            },
            {
              role: "user",
              content: note,
            },
          ],

          temperature: 0.3,
        }),
      }
    )

    // 3. RAW RESPONSE
    const data = await response.json()

    console.log("🧠 OPENROUTER RAW RESPONSE:", data)

    // 4. ERROR CHECK
    if (data.error) {
      console.error("❌ API ERROR:", data.error)
      return `❌ API Error: ${data.error.message}`
    }

    // 5. SAFE OUTPUT
    const output = data?.choices?.[0]?.message?.content

    if (!output) {
      return "❌ Empty AI response"
    }

    return output
  } catch (err) {
    console.error("❌ NETWORK ERROR:", err)
    return "❌ Network or API failure"
  }
}