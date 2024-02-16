import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #ffffff;;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
  text-align: left; /* Add this line to align text to the left */
`;

const SectionHeader = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: left; /* Add this line to align text to the left */
`;

const QuestionText = styled.p`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: left; /* Add this line to align text to the left */
`;

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
const AnswerButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
`;

const Answer = styled.div`
  font-weight: bold;
  margin-top: 10px;
`;

const SourceAndTopic = styled.div`
  margin-top: 5px;
  a {
    color: #007bff;
    text-decoration: none;
    margin-right: 10px;
  }
`;

const HideAnswerButton = styled.button`
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  ${({ isCorrect }) => isCorrect ? `
    background-color: #28a745; /* Green for correct */
  ` : `
    background-color: #dc3545; /* Red for wrong */
  `}
`;

const InfoText = styled.span`
  display: inline-block;
  margin-right: 10px;
  font-weight: normal;
  color: #333; /* Adjust the color as needed */
`;

const ConditionalSection = ({ title, content }) => {
  if (content) {
    return (
      <>
        <SectionHeader>{title}</SectionHeader>
        <p>{content}</p>
      </>
    );
  }
  return null;
};

const ConditionalLink = ({ href, text }) => {
  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    );
  }
  return null;
};

const renderTextWithLineBreaks = (text) => {
  return text.split('\n').map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
};

const ExamQuestion = ({ questionData, onUserSelectionChange }) => {
  const [showAnswer, setShowAnswer] = useState(false);
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
  };

  const handleOptionChange = (choiceKey) => {
    if (questionData.type === 'option') {
      // For radio buttons, just set the selected option
      const newSelection = new Set([choiceKey]);
      setSelectedOptions(newSelection);
      onUserSelectionChange?.(Array.from(newSelection));
    } else {
      // For checkboxes, add or remove the selected option from the set
      setSelectedOptions(prevSelectedOptions => {
        const updatedOptions = new Set(prevSelectedOptions);
        updatedOptions.has(choiceKey) ? updatedOptions.delete(choiceKey) : updatedOptions.add(choiceKey);
        onUserSelectionChange?.(Array.from(updatedOptions));
        return updatedOptions;
      });
    }
  };

  const renderChoices = () => {
    const correctAnswers = Array.isArray(questionData.answer) ? questionData.answer : [questionData.answer];

    return Object.entries(questionData.choices).map(([choiceKey, choiceText]) => (
      <Choice
        key={choiceKey}
        className={ showAnswer && correctAnswers.includes(choiceKey) ? 'correct' : ''}
      >
        <label>
          <input
            type={questionData.type === 'option' ? 'radio' : 'checkbox'}
            name={questionData.question} // Added for radio buttons to group them
            checked={selectedOptions.has(choiceKey)}
            onChange={() => handleOptionChange(choiceKey)}
            id={`choice-${choiceKey}`} // Ensuring the input is associated with its label
          />
          <span className="choiceKey">{choiceKey}:</span> 
          <span className="choiceText">{renderTextWithLineBreaks(choiceText)}</span>
        </label>

      </Choice>
    ));
  };

  useEffect(() => {
    setSelectedOptions(new Set(questionData.userSelectedChoices || []));
  }, [questionData.userSelectedChoices]);

  return (
    <Container>
      <ConditionalSection title="Company Overview" content={questionData['Company Overview']} />
      <ConditionalSection title="Executive Statement" content={questionData['Executive Statement']} />
      <ConditionalSection title="Solution Concept" content={questionData['Solution Concept']} />
      <ConditionalSection title="Existing Technical Environment" content={questionData['Existing Technical Environment']} />
      <ConditionalSection title="Business Requirements" content={questionData['Business Requirements']} />
      <ConditionalSection title="Technical Requirements" content={questionData['Technical Requirements']} />

      <QuestionText>{renderTextWithLineBreaks(questionData.question)}</QuestionText>
      <ChoicesContainer>{renderChoices()}</ChoicesContainer>
      {!showAnswer && <AnswerButton onClick={handleAnswerClick}>Show Answer</AnswerButton>}
      {showAnswer && (
        <>
          <Answer>
            Answer: {questionData.answer}
            <SourceAndTopic>
              <ConditionalLink href={questionData.source} text="Source" />
              <ConditionalLink href={questionData.topic} text="Topic" />
            </SourceAndTopic>
            <InfoText>Page: {questionData.page}</InfoText>
            <InfoText>Most Voted: {questionData.most_voted}</InfoText>
          </Answer>
          <HideAnswerButton onClick={handleAnswerClick} isCorrect={isCorrect}>
            Hide Answer
          </HideAnswerButton>
        </>
      )}
    </Container>
  );
};

export default ExamQuestion;
