import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Question from "./Question";
import Result from "./Result";

const questions = [
  {
    question: "Apa warna langit?",
    options: ["Merah", "Biru", "Hijau", "Kuning"],
    answer: "Biru",
    hint: "Pikirkan warna saat hari cerah.",
    explanation:
      "Warna langit terlihat biru karena cahaya matahari yang tersebar di atmosfer.",
  },
  {
    question: "Siapa penemu bola lampu?",
    options: [
      "Thomas Edison",
      "Albert Einstein",
      "Isaac Newton",
      "Nikola Tesla",
    ],
    answer: "Thomas Edison",
    hint: "Penemu terkenal yang juga dikenal karena kontribusinya pada listrik.",
    explanation:
      "Thomas Edison adalah penemu bola lampu yang praktis dan efisien.",
  },
  {
    question: "Berapa hasil dari 3 + 5?",
    options: ["5", "8", "7", "9"],
    answer: "8",
    hint: "Pertambahan sederhana.",
    explanation: "3 + 5 sama dengan 8.",
  },
  {
    question: "Di negara mana Menara Eiffel berada?",
    options: ["Italia", "Spanyol", "Prancis", "Jerman"],
    answer: "Prancis",
    hint: "Negara yang terkenal dengan kota cinta.",
    explanation: "Menara Eiffel terletak di Paris, Prancis.",
  },
  {
    question: "Hewan apa yang dikenal sebagai 'Raja Hutan'?",
    options: ["Singa", "Harimau", "Gajah", "Serigala"],
    answer: "Singa",
    hint: "Hewan dengan julukan raja.",
    explanation:
      "Singa sering disebut sebagai 'Raja Hutan' karena kekuatannya.",
  },
];

const Quiz = ({ onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleNextQuestion = useCallback(() => {
    setTimeLeft(10);
    setShowHint(false);
    setFeedback(null);
    setIsAnswered(false);
    setShowExplanation(false);

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex <= questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuizCompleted(true);
      onQuizComplete(score === questions.length ? 5 : score);
    }
  }, [currentQuestionIndex, onQuizComplete, score]);

  useEffect(() => {
    if (timeLeft === 0 && !isAnswered) {
      setFeedback("Waktu habis. Otomatis melanjutkan.");
      setTimeout(handleNextQuestion, 1500);
    } else if (timeLeft > 0 && !quizCompleted) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft, handleNextQuestion, isAnswered, quizCompleted]);

  const handleAnswerSelection = (selectedOption) => {
    if (isAnswered) return; // Mencegah jawaban ganda
    setIsAnswered(true);

    if (selectedOption === questions[currentQuestionIndex - 1].answer) {
      const points = timeLeft > 5 ? 2 : 1;
      setScore((prevScore) => prevScore + points);
      setFeedback("Benar!");
    } else {
      setFeedback("Salah, coba lagi.");
    }

    // Tampilkan penjelasan setelah jawaban dipilih
    setShowExplanation(true);
  };

  const handleShowHint = () => {
    setShowHint(!showHint);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(1);
    setScore(0);
    setTimeLeft(10);
    setQuizCompleted(false);
    setShowHint(false);
    setFeedback(null);
    setShowExplanation(false);
  };

  return (
    <div className="quiz p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
      {!quizCompleted ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <span>Waktu tersisa: {timeLeft} detik</span>
            <button
              onClick={handleShowHint}
              className="text-blue-500 underline"
            >
              {showHint ? "Tutup Hint" : "Tampilkan Hint"}
            </button>
          </div>
          <Question
            question={questions[currentQuestionIndex - 1]}
            onAnswerSelect={handleAnswerSelection}
          />
          {showHint && (
            <p className="text-gray-600 mt-4">
              Hint: {questions[currentQuestionIndex - 1].hint}
            </p>
          )}
          {feedback && <p className="mt-4">{feedback}</p>}
          {showExplanation && (
            <p className="mt-2 text-gray-600">
              Penjelasan: {questions[currentQuestionIndex - 1].explanation}
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
        </>
      ) : (
        <Result score={score} onRestart={handleRestartQuiz} />
      )}
    </div>
  );
};

// PropTypes
Quiz.propTypes = {
  onQuizComplete: PropTypes.func.isRequired,
};

export default Quiz;
