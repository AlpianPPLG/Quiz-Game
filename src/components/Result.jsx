import PropTypes from "prop-types";

const Result = ({ score, onRestart }) => {
  return (
    <div className="result p-6 bg-white rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-4">Quiz Selesai!</h2>
      <p className="text-lg mb-4">Skor Anda: {score}</p>
      <button
        onClick={onRestart}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 ease-in-out"
      >
        Mulai Ulang
      </button>
    </div>
  );
};

Result.propTypes = {
  score: PropTypes.number.isRequired,
  onRestart: PropTypes.func.isRequired,
};

export default Result;
