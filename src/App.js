import React, { useState, useEffect } from 'react';
import './App.css';
import ExamQuestion from './ExamQuestion';
import localExam from './exam.json'; // Import for local development

function App() {
  const [examData, setExamData] = useState(null);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Use local data in development
      const sortedQuestions = localExam.exam_questions.sort((a, b) => b.page - a.page);
      setExamData(sortedQuestions);
    } else {
      // Fetch data in production
      fetch('https://exam-bucket-test1.storage.googleapis.com/exam.json')
        .then(response => response.json())
        .then(data => {
          const sortedQuestions = data.exam_questions.sort((a, b) => b.page - a.page);
          setExamData(sortedQuestions);
        })
        .catch(error => {
          console.error('Error fetching exam data:', error);
        });
    }
  }, []);

  return (
    <div className="App">
      {examData ? examData.map((question, index) => (
        <ExamQuestion key={index} questionData={question} />
      )) : <p>Loading exam questions...</p>}
    </div>
  );
}

export default App;
