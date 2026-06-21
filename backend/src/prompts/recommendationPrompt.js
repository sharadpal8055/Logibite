export const recommendationPrompt = (
  preference,
  budget
) => `
Recommend 5 food items.

Preference:
${preference}

Budget:
₹${budget}

Return only item names.
`;