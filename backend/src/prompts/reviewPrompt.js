export const reviewPrompt = (
  reviews
) => `
Analyze these customer reviews:

${reviews}

Provide:

1. Overall sentiment
2. Strengths
3. Weaknesses
4. Short summary

Return plain text.
`;