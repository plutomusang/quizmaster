// Assuming transformQuestionData is the function that adds unique IDs
// This is a simplified version. You should replace it with your actual logic.
const generateUniqueId = (questionText) => {
    // A simple way to generate a hash from the question text. 
    // In a real scenario, you might want a more robust solution.
    return questionText.split('').reduce((acc, char) => {
      const hash = ((acc << 5) - acc) + char.charCodeAt(0);
      return hash & hash; // Convert to 32bit integer
    }, 0);
  };
  
export const transformQuestionData = (examQuestions) => {
  return examQuestions.map((question, index) => {
    // Generate a unique ID based on the question text or any other unique combination
    const uniqueId = String(generateUniqueId(question.question + index));
    return { ...question, questionId: uniqueId, showAnswer: false, userSelectedChoices: [] };
  });
};
  
export const  extractTitles = (questionData) => {
  if (questionData && questionData.keyPoints && questionData.keyPoints.length > 0) {
    const titles = questionData.keyPoints.map(keyPoint => keyPoint.title);
    return titles;
  } else {
    return []; // Move the default labels here
  }
}

export const highlightKeywordsInQuestionAsString = (label, questionText, keyPoints) => {
  // Check if keyPoints is undefined or not an array
  if (!Array.isArray(keyPoints)) {
    return questionText;
  }

  // Initialize the highlighted question text with the original question text
  let highlightedQuestionText = questionText;

  // Find the key point matching the provided label
  const keyPoint = keyPoints.find(kp => kp.title === label);

  // If a matching key point is found, process its keywords
  if (keyPoint) {
    const { keywords } = keyPoint;
    keywords.forEach(keyword => {
      // Escape special characters for RegExp
      const escapedKeyword = keyword.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      // Create a RegExp to find the keyword in a case-insensitive manner
      const regex = new RegExp(`(${escapedKeyword})`, 'gi');
      highlightedQuestionText = highlightedQuestionText.replace(regex, `<color:magenta>$1</color>`);
    });
  }

  // Return the highlighted question text as a string with color tags
  return highlightedQuestionText;
};
