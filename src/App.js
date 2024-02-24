import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import QuestionHandler from './features/questionHandler/QuestionHandler';
import { transformQuestionData } from './utils/transformQuestionData';
import examConfig from './config/examConfig';
import ExamSelect from './features/examSelect/ExamSelect';

function App() {
  const [examStates, setExamStates] = useState({});
  // Initialize currentExamKey with the key of the first exam in the examConfig array
  const [currentExamKey, setCurrentExamKey] = useState(examConfig[0].key);
  const handleExamChange = useCallback((newExamKey) => {
    setCurrentExamKey(newExamKey);
  }, []);
  const handleShowAnswerToggle = useCallback((examKey, questionId, newShowAnswerValue) => {
    setExamStates(currentStates => ({
      ...currentStates,
      [examKey]: currentStates[examKey].map(question => {
        if (question.questionId === questionId) {
          return { ...question, showAnswer: newShowAnswerValue };
        }
        return question;
      })
    }));
  }, []);

  const handleOptionChange = useCallback((examKey, questionId, newSelectedOptions) => {
    setExamStates(currentStates => ({
      ...currentStates,
      [examKey]: currentStates[examKey].map(question => {
        if (question.questionId === questionId) {
          return { ...question, userSelectedChoices: newSelectedOptions };
        }
        return question;
      })
    }));
  }, []);

  useEffect(() => {
    const fetchData = async (examKey, path, url) => {
      if (examStates[examKey]) return;

      let sortedQuestions;
      if (process.env.NODE_ENV === 'development') {
        const module = await import(`${path}`);
        sortedQuestions = module.default.exam_questions.sort((a, b) => b.page - a.page);
      } else {
        const response = await fetch(url);
        const data = await response.json();
        sortedQuestions = data.exam_questions.sort((a, b) => b.page - a.page);
      }

      const transformedData = transformQuestionData(sortedQuestions);
      setExamStates(currentStates => ({
        ...currentStates,
        [examKey]: transformedData
      }));
    };

    if (currentExamKey) {
      const examConfigItem = examConfig.find(exam => exam.key === currentExamKey);
      if (examConfigItem) {
        fetchData(currentExamKey, examConfigItem.path, examConfigItem.url);
      }
    }
  }, [currentExamKey, examStates]);

  return (
    <>
      <ExamSelect 
        examConfig={examConfig} 
        currentExamKey={currentExamKey} 
        onExamChange={handleExamChange} 
      />
      {currentExamKey && examStates[currentExamKey] ? 
        <QuestionHandler 
          questions={examStates[currentExamKey]} 
          onShowAnswerToggle={(questionId, newShowAnswerValue) => handleShowAnswerToggle(currentExamKey, questionId, newShowAnswerValue)} 
          onUserSelectionChange={(questionId, newSelectedOptions) => handleOptionChange(currentExamKey, questionId, newSelectedOptions)}
        /> 
        : <div>Loading exam questions...</div>}
    </>
  );
}

export default App;
