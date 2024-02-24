import React from 'react';
import styled from 'styled-components';
import ContentFormatter from './ContentFormatter';
// Styled components here (ChoicesContainer, Choice)
const ChoicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left; /* Add this line to align text to the left */
`;

const Choice = styled.div`
margin: 5px 0;

label {
  display: grid;
  grid-template-columns: auto auto 1fr; /* Three columns: auto width for input, auto for choice key, 1fr for text */
  align-items: start; /* Align items vertically */
  gap: 10px; /* Space between the input, choice key, and the text */
  cursor: pointer;
}

input[type='radio'],
input[type='checkbox'] {
  grid-column: 1; /* Position input in the first column */
  margin-top: 4.5px;
}

.choiceKey {
  grid-column: 2; /* Position choice key in the second column */
  /* Ensuring choice key is also aligned left, consistent with choice text */
  text-align: left;
}

.choiceText {
  grid-column: 3; /* Position choice text in the third column */
  text-align: left; /* Align choice text to the left */
  /* Optional: for better control over wrapping or overflow */
}

/* Styles for highlighting the correct choice */
&.correct {
  background-color: #d4edda; /* Green background color for correct choice */
  color: #155724; /* Dark green text color for correct choice */
}
`;

const RenderChoices = ({ questionData, selectedOptions, handleOptionChange, showAnswer}) => {
  const correctAnswers = Array.isArray(questionData.answer) ? questionData.answer : [questionData.answer];
  return (
    <ChoicesContainer>
      {Object.entries(questionData.choices).map(([choiceKey, choiceText]) => (
        <Choice
          key={choiceKey}
          className={showAnswer && correctAnswers.includes(choiceKey) ? 'correct' : ''}
        >
          <label htmlFor={`choice-${questionData.questionId + choiceKey}`}>
            <input
              type={questionData.type  === 'option' ? 'radio' : 'checkbox'}
              name={questionData.question}
              checked={selectedOptions.has(choiceKey)}
              onChange={() => handleOptionChange(choiceKey)}
              id={`choice-${questionData.questionId + choiceKey}`}
            />
            <span className="choiceKey">{choiceKey}:</span>
            <div className="choiceText"><ContentFormatter text={choiceText}/></div>
          </label>
        </Choice>
      ))}
    </ChoicesContainer>
  );
};

export default RenderChoices;