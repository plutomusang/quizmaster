// SelectableLabels.js
import React, { useState } from 'react';
import styled from 'styled-components';
import PointOfInterestIcon from './PointOfInterestIcon';
const Label = styled.div`
  display: inline-block;
  background-color: ${({ $isSelected }) => ($isSelected ? '#4CAF50' : '#ddd')};
  color: ${({ $isSelected }) => ($isSelected ? 'white' : '#666')};
  padding: 2px 10px;
  border-radius: 5px;
  font-family: monospace;
  font-size: 12px;
  margin-bottom: 5px;
  margin-left: auto;
  margin-right: 0;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

const LabelsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: start; /* Aligns the grid items to the right */
  gap: 10px; /* Space between labels */
  padding-bottom: 20px;
`;

const SelectableLabels = ({ labels, onLabelSelect }) => {
  const [selectedLabel, setSelectedLabel] = useState('');
  const [isLabelVisible, setIsLabelVisible] = useState(false); // Add this state to manage visibility

  const handleLabelClick = (label) => {
    const newSelectedLabel = selectedLabel === label ? '' : label;
    setSelectedLabel(newSelectedLabel);
    onLabelSelect(newSelectedLabel); // Call the callback function with the selected label
  };

  const toggleLabelVisibility = () => {
    setIsLabelVisible(!isLabelVisible); // Toggle the visibility state
  };

  return (
    <LabelsContainer>
      {isLabelVisible && labels.map((label) => ( // Check visibility before rendering labels
        <Label
          key={label}
          $isSelected={selectedLabel === label}
          onClick={() => handleLabelClick(label)}
        >
          {label}
        </Label>
      ))}
      <PointOfInterestIcon onClick={toggleLabelVisibility} isLabelVisible={isLabelVisible} /> {/* Pass the toggle function */}
    </LabelsContainer>
  );
};

export default SelectableLabels;
