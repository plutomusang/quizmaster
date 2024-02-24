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
  