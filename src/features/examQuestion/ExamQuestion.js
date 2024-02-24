import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import RenderChoices from './component/RenderChoices';
import QuestionSection from './component/QuestionSection';
import ShowAnswerSection from './component/ShowAnswerSection';

const Container = styled.div`
  background-color: #ffffff;;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: left; /* Add this line to align text to the left */
`;

const ExamQuestion = ({ questionData, onUserSelectionChange, onShowAnswerToggle  }) => {
  const [showAnswer, setShowAnswer] = useState(questionData.showAnswer);
  const [selectedOptions, setSelectedOptions] = useState( new Set(questionData.userSelectedChoices || []));
  const [isCorrect, setIsCorrect] = useState(false);

  const checkAnswerCorrectness = () => {
    const correctAnswers = new Set(
      Array.isArray(questionData.answer) ? questionData.answer : [questionData.answer]
    );
    return Array.from(selectedOptions).every(option => correctAnswers.has(option)) &&
           correctAnswers.size === selectedOptions.size;
  };

  const handleAnswerClick = () => {
    setIsCorrect(!showAnswer ? checkAnswerCorrectness() : false);
    if (showAnswer) setSelectedOptions(new Set());
    setShowAnswer(!showAnswer);
    onShowAnswerToggle(questionData.questionId, !showAnswer);
  };

  const handleOptionChange = (choiceKey) => {
    if (questionData.type === 'option') {
      // For radio buttons, just set the selected option
      const newSelection = new Set([choiceKey]);
      setSelectedOptions(newSelection);
      onUserSelectionChange?.(questionData.questionId, Array.from(newSelection));
    } else {
      // For checkboxes, add or remove the selected option from the set
      setSelectedOptions(prevSelectedOptions => {
        const updatedOptions = new Set(prevSelectedOptions);
        updatedOptions.has(choiceKey) ? updatedOptions.delete(choiceKey) : updatedOptions.add(choiceKey);
        onUserSelectionChange?.(questionData.questionId, Array.from(updatedOptions));
        return updatedOptions;
      });
    }
  };


  useEffect(() => {
    setSelectedOptions(new Set(questionData.userSelectedChoices || []));
  }, [questionData.userSelectedChoices]);

  return (
    <Container>
      {/* question portion */}
      <QuestionSection questionData={questionData} />
      {/* Choices portion */}
      <RenderChoices
        questionData={questionData}
        selectedOptions={selectedOptions} // State tracking selected options
        handleOptionChange={handleOptionChange} // Function to handle option selection
        showAnswer={showAnswer} // Boolean to control answer visibility
        correctAnswers={Array.isArray(questionData.answer) ? questionData.answer : [questionData.answer]} // Array of correct answer keys
      />

      {/* Show Answer portion */}
      <ShowAnswerSection {...{ showAnswer, handleAnswerClick, questionData, isCorrect }} />
    </Container>
  );
};

export default ExamQuestion;
