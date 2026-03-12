import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const query = searchParams.get("query") || "";

  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) return;
      try {
        setError(null);
        const results = await searchMovies(query);
        setMovies(results);
        setHasSearched(true);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setError("Something went wrong. Please try again later.");
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (values, { resetForm }) => {
    const searchQuery = values.query.trim();
    if (!searchQuery) {
      alert("Please enter a valid search query.");
      return;
    }
    setSearchParams({ query: searchQuery });
    resetForm();
  };
  return (
  <div className={s.pageContainer}>
    <div className={s.searchSection}>
      <h2 className={s.title}>Explore Movies</h2>
      <Formik initialValues={{ query }} onSubmit={handleSubmit}>
        <Form className={s.searchForm}>
          <Field
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search films..."
            className={s.searchInput}
          />
          <button type="submit" className={s.searchBtn}>Search</button>
        </Form>
      </Formik>
    </div>

      {error && <p className={s.error}>{error}</p>}

      <div className={s.resultsSection}>
        {hasSearched && movies.length > 0 && <MovieList movies={movies} />}
        {hasSearched && movies.length === 0 && !error && (
          <p className={s.noResults}>No movies found. Try a different query!</p>
        )}
      </div>
    </div>
  );
};

export default MoviesPage;