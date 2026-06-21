export const searchPrompt = (query) => `
Convert the following food search query into valid JSON.

User Query:
"${query}"

Rules:
- Return ONLY JSON
- No markdown
- No explanation
- No extra text

Format:

{
  "category": "",
  "maxPrice": null,
  "rating": null
}
`;