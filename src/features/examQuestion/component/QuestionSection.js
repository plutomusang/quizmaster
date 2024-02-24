import React from 'react';
import styled from 'styled-components';
import questionSectionConfig from '../config/questionSectionConfig';
import ConditionalSection from './ConditionalSection'; // Assuming this is the path
import ContentFormatter from './ContentFormatter'; // Assuming you have this component

const QuestionText = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: left; /* This aligns text to the left */
`;

const QuestionSection = ({ questionData }) => {
  return (
    <>
      {questionSectionConfig.map(({ title, key }) => (
        <ConditionalSection
          key={title} // Use title as the key for React elements
          title={title}
          content={questionData[key]}
        />
      ))}
      <QuestionText><ContentFormatter text={questionData.question}/></QuestionText>
    </>
  );
};

export default QuestionSection;
