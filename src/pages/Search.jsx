import React from 'react';

const Search = ({ results }) => {
  return (
    <div>
      <h1>Search Results</h1>
      {results.length > 0 ? (
        <ul>
          {results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default Search;
