import { useSearchParams } from "react-router-dom";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  return (
    <div>
      <h2>Search Results</h2>
      <p>Showing results for: "{query}"</p>
    </div>
  );
};

export default SearchResults;
