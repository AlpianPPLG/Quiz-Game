import PropTypes from "prop-types";

const DifficultySelector = ({ onSelectDifficulty }) => {
  const handleDifficultyChange = (event) => {
    onSelectDifficulty(event.target.value);
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl mb-2">Pilih Tingkat Kesulitan</h2>
      <select onChange={handleDifficultyChange} className="border rounded p-2">
        <option value="Mudah">Mudah</option>
        <option value="Sedang">Sedang</option>
        <option value="Sulit">Sulit</option>
      </select>
    </div>
  );
};

// PropTypes
DifficultySelector.propTypes = {
  onSelectDifficulty: PropTypes.func.isRequired,
};

export default DifficultySelector;
