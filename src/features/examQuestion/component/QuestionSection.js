import React, { useState } from 'react';
import styled from 'styled-components';
import questionSectionConfig from '../config/questionSectionConfig';
import ConditionalSection from './ConditionalSection'; // Assuming this is the path
import ContentFormatter from './ContentFormatter'; // Assuming you have this component
import SelectableLabels from './subcomponents/SelectableLabels';
import { extractTitles, highlightKeywordsInQuestionAsString } from '../../../utils/transformQuestionData';

const QuestionText = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: left; /* This aligns text to the left */
`;

const QuestionSection = ({ questionData }) => {

  // Get the labels based on the questionData
  const labels = extractTitles(questionData);

  // State to manage the selected label
  const [selectedLabel, setSelectedLabel] = useState('Clear');
  const questionText = highlightKeywordsInQuestionAsString(selectedLabel, questionData.question, questionData.keyPoints);
  // Callback function to be called when a label is selected
  const handleLabelSelection = (_selectedLabel) => {
    setSelectedLabel(_selectedLabel);
    // Perform any action based on the selected label here
  };

  return (
    <>
      {/* Render conditional sections */}
      {questionSectionConfig.map(({ title, key }) => (
        <ConditionalSection
          key={title} // Use title as the key for React elements
          title={title}
          content={questionData[key]}
        />
      ))}
      {/* Render the question text with ContentFormatter */}
      <QuestionText><ContentFormatter text={questionText}/></QuestionText>
      {/* Render the SelectableLabels component */}
      {labels.length > 0 && <SelectableLabels labels={labels} onLabelSelect={handleLabelSelection} />}
    </>
  );
};

export default QuestionSection;
