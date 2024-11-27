import { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const AddQuestion = ({ onAddQuestion }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [answer, setAnswer] = useState("");
  const [hint, setHint] = useState("");
  const [explanation, setExplanation] = useState("");

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuestion = {
      question,
      options,
      answer,
      hint,
      explanation,
    };
    onAddQuestion(newQuestion);
    // Reset form
    setQuestion("");
    setOptions(["", "", "", ""]);
    setAnswer("");
    setHint("");
    setExplanation("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl mb-4">Tambah Pertanyaan Baru</h2>
      <input
        type="text"
        placeholder="Pertanyaan"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="block w-full mb-2 border p-2 rounded"
        required
      />
      {options.map((option, index) => (
        <input
          key={index}
          type="text"
          placeholder={`Opsi ${index + 1}`}
          value={option}
          onChange={(e) => handleOptionChange(index, e.target.value)}
          className="block w-full mb-2 border p-2 rounded"
          required
        />
      ))}
      <input
        type="text"
        placeholder="Jawaban Benar"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="block w-full mb-2 border p-2 rounded"
        required
      />
      <input
        type="text"
        placeholder="Hint"
        value={hint}
        onChange={(e) => setHint(e.target.value)}
        className="block w-full mb-2 border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Penjelasan"
        value={explanation}
        onChange={(e) => setExplanation(e.target.value)}
        className="block w-full mb-4 border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Tambah Pertanyaan
      </button>
    </form>
  );
};

// Tambahkan validasi PropTypes
AddQuestion.propTypes = {
  onAddQuestion: PropTypes.func.isRequired, // Menandakan bahwa onAddQuestion adalah fungsi yang diperlukan
};

export default AddQuestion;
