import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import questionSectionConfig from '../config/questionSectionConfig';
import ConditionalSection from './ConditionalSection'; // Assuming this is the path
import ContentFormatter from './ContentFormatter'; // Assuming you have this component
import SelectableLabels from './subcomponents/SelectableLabels';
import { extractTitles, highlightKeywordsInQuestionAsString } from '../../../utils/transformQuestionData';

const QuestionText = styled.div`
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 1.6em;
  text-align: left;
`;

const Popup = styled.div`
  position: fixed;
  cursor: move;
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  z-index: 100;
  width: 300px;
  top: 20%;
  left: calc(50% - 150px);
`;

const PopupTitle = styled.h4`
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
`;

const QuestionSection = ({ questionData }) => {
  const [selectedLabel, setSelectedLabel] = useState('Clear');
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState('');
  const [popupTitle, setPopupTitle] = useState('');
  const labels = extractTitles(questionData);

  const questionText = highlightKeywordsInQuestionAsString(selectedLabel, questionData.question, questionData.keyPoints);

  const handleLabelSelection = (_selectedLabel) => {
    setSelectedLabel(_selectedLabel);
  };

  const handleDoubleClick = () => {
    const keyPoint = questionData.keyPoints.find(kp => kp.title === selectedLabel);
    if (keyPoint) {
      setPopupTitle(keyPoint.title);
      setPopupContent(keyPoint.explanation);
      setShowPopup(true);
    }
  };
  // Initialize position state with default values
  const [position, setPosition] = useState({ x: 200, y: 100 }); // Default position for the popup
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    setStartPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  }, [position]);

  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startPosition.x,
        y: e.clientY - startPosition.y,
      });
    }
  }, [isDragging, startPosition]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);
  return (
    <>
      {labels.length > 0 && <SelectableLabels labels={labels} onLabelSelect={handleLabelSelection} />}
      {questionSectionConfig.map(({ title, key }) => (
        <ConditionalSection key={title} title={title} content={questionData[key]} />
      ))}
      <QuestionText onDoubleClick={handleDoubleClick}>
        <ContentFormatter text={questionText}/>
      </QuestionText>
      {showPopup && (
          <Popup
            className="draggable-popup"
            onMouseDown={handleMouseDown}
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
          >
          <PopupTitle>{popupTitle}</PopupTitle>
          <p>{popupContent}</p>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </Popup>
      )}
    </>
  );
};

export default QuestionSection;
