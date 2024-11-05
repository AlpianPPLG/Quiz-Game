import PropTypes from "prop-types";
import { useState } from "react";

const Question = ({ question, onAnswerSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    onAnswerSelect(option);
  };

  return (
    <div className="question">
      <h2 className="text-2xl font-bold mb-4">{question.question}</h2>
      <div className="options grid grid-cols-1 gap-4">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            disabled={selectedOption !== null} // Nonaktifkan tombol setelah pilihan
            className={`px-4 py-2 rounded transition duration-200 ease-in-out
           ${
             selectedOption === null
               ? "bg-indigo-500 hover:bg-indigo-700 text-white"
               : option === question.answer
               ? "bg-green-500 text-white" // Warna hijau untuk jawaban benar
               : selectedOption === option
               ? "bg-red-500 text-white" // Warna merah untuk jawaban salah
               : "bg-gray-300 text-gray-600" // Warna netral untuk opsi yang tidak dipilih
           }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

// PropTypes
Question.propTypes = {
  question: PropTypes.shape({
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    answer: PropTypes.string.isRequired,
  }).isRequired,
  onAnswerSelect: PropTypes.func.isRequired,
};

export default Question;
