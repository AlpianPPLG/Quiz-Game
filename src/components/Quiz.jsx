import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Question from "./Question";
import Result from "./Result";

const Quiz = ({ onQuizComplete, questions, difficulty }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const timerSettings = {
    Mudah: 15,
    Sedang: 10,
    Sulit: 5,
  };

  useEffect(() => {
    setTimeLeft(timerSettings[difficulty]);
  }, [difficulty]);

  const handleNextQuestion = useCallback(() => {
    setTimeLeft(timerSettings[difficulty]);
    setShowHint(false);
    setFeedback(null);
    setIsAnswered(false);
    setShowExplanation(false);
    setShowWarning(false);

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuizCompleted(true);
      onQuizComplete(score);
    }
  }, [currentQuestionIndex, onQuizComplete, score, difficulty, questions]);

  useEffect(() => {
    if (timeLeft === 0 && !isAnswered) {
      setFeedback("Waktu habis. Otomatis melanjutkan.");
      setTimeout(handleNextQuestion, 1500);
    } else if (timeLeft > 0 && !quizCompleted) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      if (timeLeft <= 3) {
        setShowWarning(true);
      }
      return () => clearTimeout(timerId);
    }
  }, [timeLeft, handleNextQuestion, isAnswered, quizCompleted]);

  const handleAnswerSelection = (selectedOption) => {
    if (isAnswered) return;
    setIsAnswered(true);

    if (selectedOption === questions[currentQuestionIndex].answer) {
      const points = timeLeft > 5 ? 2 : 1;
      setScore((prevScore) => prevScore + points);
      setFeedback("Benar!");
    } else {
      setFeedback("Salah, coba lagi.");
    }

    setShowExplanation(true);
  };

  const handleShowHint = () => {
    setShowHint(!showHint);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(timerSettings[difficulty]);
    setQuizCompleted(false);
    setShowHint(false);
    setFeedback(null);
    setShowExplanation(false);
    setShowWarning(false);
  };

  return (
    <div className="quiz p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
      {!quizCompleted ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <span>Waktu tersisa: {timeLeft} detik</span>
            {showWarning && (
              <span className="text-red-500">Waktu hampir habis!</span>
            )}
            <button
              onClick={handleShowHint}
              className="text-blue-500 underline"
            >
              {showHint ? "Tutup Hint" : "Tampilkan Hint"}
            </button>
          </div>
          <Question
            question={questions[currentQuestionIndex]}
            onAnswerSelect={handleAnswerSelection}
          />
          {showHint && (
            <p className="text-gray-600 mt-4">
              Hint: {questions[currentQuestionIndex].hint}
            </p>
          )}
          {feedback && <p className="mt-4">{feedback}</p>}
          {showExplanation && (
            <p className="mt-2 text-gray-600">
              Penjelasan: {questions[currentQuestionIndex].explanation}
            </p>
          )}
          {isAnswered && (
            <button
              onClick={handleNextQuestion}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Next
            </button>
          )}
          <div className="mt-6 p-4 bg-gray-100 rounded">
            <h2 className="text-lg font-bold">Tips dan Trik:</h2>
            <ul className="list-disc pl-5">
              <li>Baca setiap pertanyaan dengan seksama.</li>
              <li>Gunakan hint jika Anda merasa kesulitan.</li>
              <li>Perhatikan waktu, tetapi jangan terburu-buru.</li>
            </ul>
          </div>
        </>
      ) : (
        <Result score={score} onRestart={handleRestartQuiz} />
      )}
    </div>
  );
};

Quiz.propTypes = {
  onQuizComplete: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
  difficulty: PropTypes.string.isRequired,
};

export default Quiz;
