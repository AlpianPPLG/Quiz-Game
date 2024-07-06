import { useState } from "react";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import "./index.css";

const App = () => {
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const handleQuizCompletion = (finalScore) => {
    setScore(finalScore);
    setIsQuizCompleted(true);
  };

  const handleRestart = () => {
    setScore(0);
    setIsQuizCompleted(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500">
      {!isQuizCompleted ? (
        <Quiz onQuizComplete={handleQuizCompletion} />
      ) : (
        <Result score={score} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default App;
