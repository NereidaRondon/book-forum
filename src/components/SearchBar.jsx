function SearchBar({ query, setQuery }) {
  return (
    <div className='search-bar'>
      <input
        type='text'
        placeholder='Search posts by title...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
