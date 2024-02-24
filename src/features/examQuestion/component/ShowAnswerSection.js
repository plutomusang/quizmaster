// ShowAnswerSection.js
import React from 'react';
import styled from 'styled-components';

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
  background-color: ${({ $isCorrect }) => $isCorrect ? '#28a745' : '#dc3545'};
`;

const InfoText = styled.span`
  display: inline-block;
  margin-right: 10px;
  font-weight: normal;
  color: #333;
`;

const ConditionalLink = ({ href, text }) => {
  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer">{text}</a>;
  }
  return null;
};

const ShowAnswerSection = ({ showAnswer, handleAnswerClick, questionData, isCorrect }) => (
  <>
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
        <HideAnswerButton onClick={(e) => {e.preventDefault(); handleAnswerClick(); }} $isCorrect={isCorrect}>
          Hide Answer
        </HideAnswerButton>
      </>
    )}
  </>
);

export default ShowAnswerSection;
