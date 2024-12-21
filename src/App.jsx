import { useState } from "react";
import Quiz from "./components/Quiz";
import Result from "./components/Result";
import AddQuestion from "./components/AddQuestion";
import DifficultySelector from "./components/DifficultySelector";
import CategorySelector from "./components/CategorySelector";
import "./index.css";

const initialQuestions = [
  {
    question: "Apa warna langit?",
    options: ["Merah", "Biru", "Hijau", "Kuning"],
    answer: "Biru",
    hint: "Pikirkan warna saat hari cerah.",
    explanation:
      "Warna langit terlihat biru karena cahaya matahari yang tersebar di atmosfer.",
    category: "Umum",
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
    category: "Ilmu Pengetahuan",
  },
  {
    question: "Berapa hasil dari 3 + 5?",
    options: ["5", "8", "7", "9"],
    answer: "8",
    hint: "Pertambahan sederhana.",
    explanation: "3 + 5 sama dengan 8.",
    category: "Matematika",
  },
  {
    question: "Di negara mana Menara Eiffel berada?",
    options: ["Italia", "Spanyol", "Prancis", "Jerman"],
    answer: "Prancis",
    hint: "Negara yang terkenal dengan kota cinta.",
    explanation: "Menara Eiffel terletak di Paris, Prancis.",
    category: "Geografi",
  },
  {
    question: "Hewan apa yang dikenal sebagai 'Raja Hutan'?",
    options: ["Singa", "Harimau", "Gajah", "Serigala"],
    answer: "Singa",
    hint: "Hewan dengan julukan raja.",
    explanation:
      "Singa sering disebut sebagai 'Raja Hutan' karena kekuatannya.",
    category: "Biologi",
  },
];

const App = () => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [customQuestions, setCustomQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [difficulty, setDifficulty] = useState("Mudah");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [congratulationsMessage, setCongratulationsMessage] = useState("");

  const handleQuizCompletion = (finalScore) => {
    setScore(finalScore);
    setIsQuizCompleted(true);
    setCongratulationsMessage(`Selamat! Skor Anda: ${finalScore}`);
  };

  const handleRestart = () => {
    setScore(0);
    setIsQuizCompleted(false);
    setCongratulationsMessage("");
  };

  const handleAddQuestion = (newQuestion) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    setCustomQuestions((prev) => [...prev, newQuestion]);
  };

  const showGuide = () => {
    alert(
      "Panduan:\n1. Pilih kategori dan tingkat kesulitan.\n2. Tambahkan pertanyaan jika perlu.\n3. Jawab setiap pertanyaan dan gunakan hint jika diperlukan.\n4. Setelah selesai, lihat hasil kuis dan dapatkan penjelasan."
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-500">
      <button
        onClick={showGuide}
        className="absolute top-4 right-4 bg-white text-blue-500 px-4 py-2 rounded shadow hover:bg-gray-200"
      >
        Panduan
      </button>
      {!isQuizCompleted ? (
        <>
          <DifficultySelector onSelectDifficulty={setDifficulty} />
          <CategorySelector onSelectCategory={setSelectedCategory} />
          <AddQuestion onAddQuestion={handleAddQuestion} />
          <Quiz
            questions={[...questions, ...customQuestions].filter(
              (q) =>
                selectedCategory === "Semua" || q.category === selectedCategory
            )}
            onQuizComplete={handleQuizCompletion}
            difficulty={difficulty}
          />
        </>
      ) : (
        <Result score={score} onRestart={handleRestart} />
      )}
      {congratulationsMessage && (
        <div className="absolute bottom-4 text-white text-lg">
          {congratulationsMessage}
        </div>
      )}
    </div>
  );
};

export default App;
