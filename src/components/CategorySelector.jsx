import PropTypes from "prop-types";

const CategorySelector = ({ onSelectCategory }) => {
  const handleCategoryChange = (event) => {
    onSelectCategory(event.target.value);
  };

  return (
    <div className="mb-4">
      <h2 className="text-xl mb-2">Pilih Kategori</h2>
      <select onChange={handleCategoryChange} className="border rounded p-2">
        <option value="Semua">Semua</option>
        <option value="Umum">Umum</option>
        <option value="Ilmu Pengetahuan">Ilmu Pengetahuan</option>
        <option value="Matematika">Matematika</option>
        {/* Tambahkan lebih banyak kategori jika diperlukan */}
      </select>
    </div>
  );
};

// PropTypes
CategorySelector.propTypes = {
  onSelectCategory: PropTypes.func.isRequired,
};

export default CategorySelector;
