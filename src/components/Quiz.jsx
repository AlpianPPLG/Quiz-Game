import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import Question from "./Question";
import Result from "./Result"; // Import komponen Result untuk menampilkan hasil

const questions = [
  {
    question: "Apa warna langit?",
    options: ["Merah", "Biru", "Hijau", "Kuning"],
    answer: "Biru",
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
  },
  {
    question: "Berapa hasil dari 3 + 5?",
    options: ["5", "8", "7", "9"],
    answer: "8",
  },
  {
    question: "Di negara mana Menara Eiffel berada?",
    options: ["Italia", "Spanyol", "Prancis", "Jerman"],
    answer: "Prancis",
  },
  {
    question: "Hewan apa yang dikenal sebagai 'Raja Hutan'?",
    options: ["Singa", "Harimau", "Gajah", "Serigala"],
    answer: "Singa",
  },
];

const Quiz = ({ onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1); // Mulai dari indeks 1
  const [score, setScore] = useState(1);
  const [timeLeft, setTimeLeft] = useState(10); // Set the timer for 10 seconds
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleNextQuestion = useCallback(() => {
    setTimeLeft(10); // Reset the timer for the next question
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex <= questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuizCompleted(true);
      onQuizComplete(score === questions.length ? 5 : score); // Mengirimkan skor ke fungsi onQuizComplete
    }
  }, [currentQuestionIndex, onQuizComplete, score]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
      return;
    }

    const timerId = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [timeLeft, handleNextQuestion]);

  const handleAnswerSelection = (selectedOption) => {
    if (selectedOption === questions[currentQuestionIndex - 1].answer) {
      // Menggunakan currentQuestionIndex - 1 untuk mengakses array questions
      setScore((prevScore) => prevScore + 1);
    }
    handleNextQuestion();
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(1); // Mulai kembali dari indeks 1
    setScore(0);
    setTimeLeft(10);
    setQuizCompleted(false);
  };

  return (
    <div className="quiz p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
      {!quizCompleted ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <span>Waktu tersisa: {timeLeft} detik</span>
          </div>
          <Question
            question={questions[currentQuestionIndex - 1]} // Menggunakan currentQuestionIndex - 1 untuk mengakses array questions
            onAnswerSelect={handleAnswerSelection}
          />
        </>
      ) : (
        <Result score={score} onRestart={handleRestartQuiz} />
      )}
    </div>
  );
};

Quiz.propTypes = {
  onQuizComplete: PropTypes.func.isRequired,
};

export default Quiz;
