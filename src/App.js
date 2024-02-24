import React, { useState, useEffect, useCallback  } from 'react';
import './App.css';
import QuestionHandler from './features/questionHandler/QuestionHandler';
import localExam from './examJson/GoogleCloudDigitalLeader.json'; // Import for local development
import {transformQuestionData} from './utils/transformQuestionData';

function App() {
  const [examData, setExamData] = useState(null);

  const handleShowAnswerToggle = useCallback((questionId, newShowAnswerValue) => {
    console.log('Is show answer:', newShowAnswerValue);
    console.log('questionId:', questionId);

    setExamData(currentExamData => currentExamData.map(question => {
      if (question.questionId === questionId) {
        return { ...question, showAnswer: newShowAnswerValue };
      }
      return question;
    }));

  }, []); // Dependency array is empty, indicating this callback doesn't depend on anything to be recreated

  // Add this function inside your App component
  const handleOptionChange = useCallback((questionId, newSelectedOptions) => {
    setExamData(currentExamData => currentExamData.map(question => {
      if (question.questionId === questionId) {
        // Update the question's selectedOptions with the newSelectedOptions
        return { ...question, userSelectedChoices: newSelectedOptions };
      }
      return question;
    }));
  }, []); // Since this callback does not depend on any external variables, the dependency array is empty


  useEffect(() => {
    // This effect only fetches and transforms data once or under specific conditions
    const fetchData = async () => {
      let sortedQuestions;
      if (process.env.NODE_ENV === 'development') {
        sortedQuestions = localExam.exam_questions.sort((a, b) => b.page - a.page);
      } else {
        const response = await fetch('https://exam-bucket-test1.storage.googleapis.com/exam.json');
        const data = await response.json();
        sortedQuestions = data.exam_questions.sort((a, b) => b.page - a.page);
      }
      setExamData(transformQuestionData(sortedQuestions));
    };
  
    fetchData();
  }, []); // Empty dependency array ensures this runs once on mount

  // UseEffect hook for logging changes to examData
  useEffect(() => {
    if (examData) {
      console.log('Exam data has been transformed and set:', examData);
    }
  }, [examData]); // This effect depends on examData, so it runs whenever examData changes

  return (
    <div className="App">
      {examData ? 
        <QuestionHandler 
          questions={examData} 
          onShowAnswerToggle={handleShowAnswerToggle} 
          onUserSelectionChange={handleOptionChange}
        /> 
        : <div>Loading exam questions...</div>}
    </div>
  );
}

export default App;
