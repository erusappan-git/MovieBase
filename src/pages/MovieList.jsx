import Card from "../components/Card"
import { useLocation } from "react-router-dom";
import useFetchMovies from "../hooks/useFetchMovies";
import {useEffect, useState } from "react";

const MovieList = () => {

  const [page, setPage] = useState(1);
  const location = useLocation();

  let url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;

  if (location.pathname === "/movies/top") {
    url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;
  }
  else if (location.pathname === "/movies/popular") {
    url = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`;
  }
  else if (location.pathname === "/movies/upcoming") {
    url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`;
  }

  useEffect(() => {
    setPage(1);
  }, [location.pathname]);

  // const options = useMemo(() => ({
  //   method: 'GET',

  //   headers: {

  //     accept: 'application/json',

  //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDM2NTViZTc0ZTNhOTA5ZTJmZWNiM2Q0ODQxMDc5YyIsIm5iZiI6MTcyNTgzMDMxOC4yNzkwOCwic3ViIjoiNjZkOWVjNjYzMDZkNThhYWI3NjA2ZDYyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.r_RXLcgjqkiKyeqgCE3ofFVqnEiQJXbEEDIqhH8NrKs'

  //   },
  // }), []);

  const { data: movies, loading, error } = useFetchMovies(url);

  if (loading) return <div>Loading...</div>;
  // if (loading) return (
  //   <div className="flex items-center justify-center h-screen">
  //     <div className="flex flex-col items-center">
  //       <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
  //       <p className="mt-4 text-xl text-black">Loading...</p>
  //     </div>
  //   </div>
  // );
  if (error) return <div>{error}</div>;

  return (

    <main>

      <section className="max-w-7xl max-auto py-7">

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {movies && movies.results.map((movie, index) => (
            <Card key={index} movie={movie} />
          ))}

        </div>

        <div className="flex justify-between mt-6">
          <button
            className={`inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white rounded-lg focus:ring-4 focus:outline-none ${page === 1
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              }`}
            onClick={() => setPage(page > 1 ? page - 1 : 1)}
            disabled={page === 1}
          >
            Previous
          </button>

          <span>Page {page}</span>

          <button className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>

      </section>

    </main>

  )

}

export default MovieList
