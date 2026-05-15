import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.css";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8081/api";

function ExternalBooksPage() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [query] = useState("react"); // Default search query

  useEffect(() => {
    async function fetchExternalBooks() {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_URL}/external-books/search?query=${query}&page=${currentPage}`
        );
        const data = await response.json();

        setBooks(data.books || []);
        setTotalPages(parseInt(data.total) || 0);
      } catch (e) {
        console.error("Unable to fetch external books", e);
      } finally {
        setLoading(false);
      }
    }
    fetchExternalBooks();
  }, [currentPage, query]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalPages / 10)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container mt-4" style={{ minHeight: "100vh", padding: "20px" }}>
      <h2 className="text-center mb-4" style={{ color: "#000", textShadow: "1px 1px 2px #f5f5f5ff" }}>
        IT Books - React
      </h2>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : books.length === 0 ? (
        <p className="text-center" style={{ color: "#555" }}>
          No books available.
        </p>
      ) : (
        <>
          <div className="row g-3">
            {books.map((book) => (
              <div key={book.isbn13} className="col-md-3">
                <div className="book-card p-2 shadow-sm" style={{ minWidth: "200px", height: "450px" }}>
                  {/* Book Image */}
                  {book.image ? (
                    <img
                      src={book.image}
                      alt={book.title}
                      style={{ width: "100%", height: "250px", objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      style={{
                        height: "250px",
                        backgroundColor: "#eee",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "8px",
                        fontSize: "0.9rem",
                        color: "#888",
                      }}
                    >
                      No Image
                    </div>
                  )}

                  {/* Title */}
                  <h6 style={{ color: "#333", minHeight: "3rem", fontSize: "0.95rem" }}>
                    {book.title}
                  </h6>

                  {/* Subtitle */}
                  <p style={{ color: "#666", fontSize: "0.8rem", minHeight: "2.5rem" }}>
                    {book.subtitle || "No subtitle available"}
                  </p>

                  {/* Price & ISBN */}
                  <div className="d-flex justify-content-between align-items-center">
                    <p style={{ color: "#28a745", fontSize: "0.9rem", fontWeight: "bold", margin: 0 }}>
                      {book.price || "N/A"}
                    </p>
                    <a
                      href={book.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-primary"
                    >
                      View
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="d-flex justify-content-center align-items-center mt-4 gap-3">
            <button
              className="btn btn-secondary"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span style={{ fontSize: "1rem", fontWeight: "500" }}>
              Page {currentPage} of {Math.ceil(totalPages / 10)}
            </span>
            <button
              className="btn btn-secondary"
              onClick={handleNextPage}
              disabled={currentPage >= Math.ceil(totalPages / 10)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ExternalBooksPage;
