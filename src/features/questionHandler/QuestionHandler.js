import React, { useCallback } from 'react';
import ExamQuestion from '../examQuestion/ExamQuestion';

const QuestionHandler = ({ questions, onShowAnswerToggle, onUserSelectionChange }) => {
  return (
    <div>
      {questions.map((question) => (
        <ExamQuestion
          key={question.questionId}
          questionData={question}
          onShowAnswerToggle={onShowAnswerToggle}
          onUserSelectionChange={onUserSelectionChange}
        />
      ))}
    </div>
  );
};

export default QuestionHandler;