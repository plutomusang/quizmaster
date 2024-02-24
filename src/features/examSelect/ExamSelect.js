import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const DropdownContainer = styled.div`
  position: relative;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const DropdownButton = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  outline: none;
`;

const DropdownContent = styled.div`
  position: absolute;
  width: 100%;
  border: 1px solid #ccc;
  border-top: none;
  z-index: 1;
  background-color: #F8F8F8;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover, &:focus {
    background-color: #f2f2f2;
  }
`;

function ExamSelect({ examConfig, currentExamKey, onExamChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && itemRefs.current.length > 0) {
      itemRefs.current[0].focus();
    }
  }, [isOpen]);

  const handleSelect = (key) => {
    onExamChange(key);
    setIsOpen(false);
    buttonRef.current.focus();
  };

  const handleKeyDown = (event) => {
    const { key } = event;
    const activeIndex = examConfig.findIndex(exam => exam.key === currentExamKey);
    let nextIndex;

    if (key === 'Enter' || key === ' ') {
      setIsOpen(!isOpen);
      event.preventDefault(); // Prevent the default action to avoid scrolling the page on space press
    } else if (key === 'Escape') {
      setIsOpen(false);
      buttonRef.current.focus();
    } else if (key === 'ArrowDown') {
      nextIndex = (activeIndex + 1) % examConfig.length;
      onExamChange(examConfig[nextIndex].key);
      if (isOpen && itemRefs.current[nextIndex]) {
        itemRefs.current[nextIndex].focus();
      }
    } else if (key === 'ArrowUp') {
      nextIndex = (activeIndex - 1 + examConfig.length) % examConfig.length;
      onExamChange(examConfig[nextIndex].key);
      if (isOpen && itemRefs.current[nextIndex]) {
        itemRefs.current[nextIndex].focus();
      }
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectedExamTitle = examConfig.find(exam => exam.key === currentExamKey)?.title || 'Select Exam';

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        tabIndex="0"
        ref={buttonRef}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedExamTitle}
        <span>{isOpen ? '▲' : '▼'}</span>
      </DropdownButton>
      {isOpen && (
        <DropdownContent role="listbox" aria-label="Select Exam">
          {examConfig.map((exam, index) => (
            <DropdownItem
              key={exam.key}
              onClick={() => handleSelect(exam.key)}
              tabIndex="-1"
              ref={(el) => itemRefs.current[index] = el}
              role="option"
              aria-selected={currentExamKey === exam.key}
            >
              {exam.title}
            </DropdownItem>
          ))}
        </DropdownContent>
      )}
    </DropdownContainer>
  );
}

export default ExamSelect;
