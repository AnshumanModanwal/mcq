import React, { useEffect, useState } from 'react';
import "./App.css"
import { LuPartyPopper } from "react-icons/lu";
const questions = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    id: 2,
    question: "Who wrote 'Hamlet'?",
    options: ["Charles Dickens", "William Shakespeare", "Leo Tolstoy", "Mark Twain"],
    answer: "William Shakespeare",
  },
  {
    id: 3,
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    answer: "Jupiter",
  },
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const [showPopper, setShowPopper] = useState(false);

  useEffect(() => {
    // Show the popper after 3 seconds
    const timer = setTimeout(() => {
      setShowPopper(true);
    }, 3000);

    // Cleanup the timer
    return () => clearTimeout(timer);
  }, []);


  const handleAnswer = (selectedOption) => {
    
    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
    
      setCurrentQuestionIndex(nextIndex);
    } else {
      setShowScore(true);
    }
  };
  useEffect(()=>{
    setSelectedAnswer("");

  },[currentQuestionIndex])

  return (
    <div className='w-[100vw] h-[100vh] m-9'>
      {showScore ? (
        <div className='flex flex-col items-center justify-center w-full h-[60%] gap-8'>
          <h1 className='text-3xl'>Your Score</h1>
          <p className='text-2xl'>
            {score} out of {questions.length}
          </p>
          {showPopper && (
        <LuPartyPopper className="text-8xl text-green-600 animate-popper" />
      )}
        </div>
      ) : (
        <div className='flex flex-col gap-8 justify-start  items-center '>
          <h1 className='text-5xl'>MCQ Game</h1>
          <h2 className='text-3xl '>
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <div className='border border-slate-200 p-4'>
          <p className='text-2xl'>{questions[currentQuestionIndex].question}</p>
          <div className='flex flex-col items-start mt-7 gap-5'>
  {questions[currentQuestionIndex].options.map((option, index) => (
    <label htmlFor={`option-${option}`} key={index} className='flex items-center gap-2'>
      <input 
        type='radio' 
        id={`option-${option}`} 
        name='quiz-option' 
    checked={selectedAnswer===option}
    onChange={()=>setSelectedAnswer(option)}
      
       
      />
      {option}
    </label>
  ))}
</div>
            <button
              className={`mt-5 bg-blue-500 text-white px-4 py-2 rounded `}
              disabled={!selectedAnswer} // Disable button until an answer is selected
              onClick={() => handleAnswer(selectedAnswer)}
            >
              Submit Answer
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;
