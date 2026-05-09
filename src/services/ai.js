export async function analyzeSession(note) {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_OPENROUTER_API_KEY",
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
    return data.choices?.[0]?.message?.content
  }