import PropTypes from "prop-types";

const Question = ({ question, onAnswerSelect }) => {
  return (
    <div className="question">
      <h2 className="text-2xl font-bold mb-4">{question.question}</h2>
      <div className="options grid grid-cols-1 gap-4">
        {question.options.map((option) => (
          <button
            key={option}
            onClick={() => onAnswerSelect(option)}
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-200 ease-in-out"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.shape({
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    answer: PropTypes.string.isRequired,
  }).isRequired,
  onAnswerSelect: PropTypes.func.isRequired,
};

export default Question;
