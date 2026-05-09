export async function analyzeSession(note) {
  const key = import.meta.env.VITE_OPENROUTER_API_KEY

  if (!key) {
    return "❌ Missing API key in Vercel env"
  }

  try {
    const res = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct",

          messages: [
            {
              role: "system",
              content:
                "You are a clinical AI assistant. Summarize patient notes clearly.",
            },
            {
              role: "user",
              content: note || "No input provided",
            },
          ],
        }),
      }
    )

    const data = await res.json()

    return (
      data?.choices?.[0]?.message?.content ||
      data?.error?.message ||
      "❌ No response from AI"
    )
  } catch (err) {
    return "❌ Network error"
  }
}