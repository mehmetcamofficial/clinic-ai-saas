export async function analyzeSession(note) {
  const key = import.meta.env.VITE_OPENROUTER_API_KEY

  if (!key) {
    return "❌ API key yüklenmedi (ENV hatası)"
  }

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a clinical AI assistant. Summarize patient notes clearly and medically.",
          },
          {
            role: "user",
            content: note,
          },
        ],
      }),
    }
  )

  const data = await response.json()

  return data.choices?.[0]?.message?.content || "AI response empty"
}