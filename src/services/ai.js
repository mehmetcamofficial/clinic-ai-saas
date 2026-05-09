export async function analyzeSession(note) {
  const key = import.meta.env.VITE_OPENROUTER_API_KEY

  // 1. ENV CHECK (kritik)
  if (!key) {
    return "❌ API key not loaded from Vercel env"
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
        model: "openai/gpt-3.5-turbo",

        messages: [
          {
            role: "system",
            content: "You are a clinical assistant AI.",
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

  console.log("OPENROUTER RESPONSE:", data)

  return (
    data?.choices?.[0]?.message?.content ||
    data?.error?.message ||
    "❌ No response"
  )
}