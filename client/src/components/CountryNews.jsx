import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EverythingCard from "./EverythingCard";
import Loader from "./Loader";

function CountryNews() {
  const { iso } = useParams();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const pageSize = 6;

  useEffect(() => {
    if (!iso) return;
    setPage(1); // जब भी country बदले, पेज 1 पर रीसेट करो
  }, [iso]);

  useEffect(() => {
    if (!iso) return;

    setIsLoading(true);
    setError(null);

    fetch(`http://localhost:3000/country/${iso}?page=${page}&pageSize=${pageSize}`)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((json) => {
        if (json.success) {
          setTotalResults(json.data.totalResults || 0);
          setData(json.data.articles || []);
        } else {
          throw new Error(json.message || "An error occurred");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        setError("Failed to fetch news. Please try again later.");
      })
      .finally(() => setIsLoading(false));
  }, [page, iso]);

  return (
    <>
      {error && <div className="text-red-500 text-center bg-red-100 p-4 rounded-lg mb-4">{error}</div>}

      <div className="my-10 grid lg:place-content-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xs:grid-cols-1 xs:gap-4 md:gap-10 lg:gap-14 md:px-16 xs:p-3">
        {isLoading ? (
          <Loader />
        ) : data.length > 0 ? (
          data.map((element) => <EverythingCard key={element.url} {...element} />)
        ) : (
          <div className="text-center text-gray-500 font-semibold text-lg">
            No news articles found for this country.
          </div>
        )}
      </div>

      {!isLoading && data.length > 0 && totalResults > pageSize && (
        <div className="pagination flex justify-center gap-10 my-10 items-center">
          <button 
            disabled={page <= 1} 
            className={`pagination-btn ${page <= 1 ? "opacity-50 cursor-not-allowed" : ""}`} 
            onClick={() => setPage(page - 1)}
          >
            Prev
          </button>
          <p className="font-semibold opacity-80">
            {page} of {Math.ceil(totalResults / pageSize)}
          </p>
          <button 
            disabled={page >= Math.ceil(totalResults / pageSize)} 
            className={`pagination-btn ${page >= Math.ceil(totalResults / pageSize) ? "opacity-50 cursor-not-allowed" : ""}`} 
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default CountryNews;
