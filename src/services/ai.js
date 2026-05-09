export async function analyzeSession(note) {
  const key = import.meta.env.VITE_OPENROUTER_API_KEY

  // 1. ENV kontrol
  if (!key) {
    return "❌ API key missing (Vercel ENV not loaded)"
  }

  try {
    // 2. API request
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
          // Stable model (en az hata veren)
          model: "openai/gpt-3.5-turbo",

          messages: [
            {
              role: "system",
              content:
                "You are a clinical AI assistant. Provide structured, concise medical summaries for patient notes.",
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

    // 3. JSON parse
    const data = await response.json()

    console.log("OPENROUTER RESPONSE:", data)

    // 4. Safe return (multi-fallback)
    return (
      data?.choices?.[0]?.message?.content ||
      data?.error?.message ||
      "❌ No valid AI response"
    )
  } catch (err) {
    console.error("AI ERROR:", err)
    return "❌ AI request failed (network or API issue)"
  }
}