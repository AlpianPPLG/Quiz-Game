import { useState } from "react";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import AddQuestion from "./components/AddQuestion"; // Import AddQuestion
import "./index.css";

const initialQuestions = [
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

const App = () => {
  const [questions, setQuestions] = useState(initialQuestions);
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

  const handleAddQuestion = (newQuestion) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500">
      {!isQuizCompleted ? (
        <>
          <AddQuestion onAddQuestion={handleAddQuestion} />{" "}
          {/* Tambahkan AddQuestion */}
          <Quiz questions={questions} onQuizComplete={handleQuizCompletion} />
        </>
      ) : (
        <Result score={score} onRestart={handleRestart} />
      )}
    </div>
  );
};

export default App;
