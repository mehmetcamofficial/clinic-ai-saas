export async function analyzeSession(note) {
  const key = import.meta.env.VITE_OPENROUTER_API_KEY

  const res = await fetch(
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
              "You are a clinical assistant. Give structured medical summaries. Be concise.",
          },
          {
            role: "user",
            content: note,
          },
        ],
      }),
    }
  )

  const data = await res.json()

  if (data?.error) {
    return "❌ " + data.error.message
  }

  return data?.choices?.[0]?.message?.content || "No response"
}