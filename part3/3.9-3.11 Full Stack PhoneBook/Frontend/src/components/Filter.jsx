const Filter = ({ searchText, handleSearchInput }) => (
  <div>
    filter shown with: <input value={searchText} onChange={handleSearchInput} />
  </div>
)

export default Filter
