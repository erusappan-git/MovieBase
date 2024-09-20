import { useLocation } from "react-router-dom";
import useFetchMovies from "../hooks/useFetchMovies";
import Card from "../components/Card";
import { useEffect, useState } from "react";


const Search = () => {

  const [page, setPage] = useState(1);

  const location = useLocation();

  const searchQuery = new URLSearchParams(location.search).get('q');

  const url = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=${page}`;

  // const options = useMemo(() => ({

  //   method: 'GET',

  //   headers: {

  //     accept: 'application/json',

  //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDM2NTViZTc0ZTNhOTA5ZTJmZWNiM2Q0ODQxMDc5YyIsIm5iZiI6MTcyNTk0OTc4Ny4yNDExNjIsInN1YiI6IjY2ZDllYzY2MzA2ZDU4YWFiNzYwNmQ2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OwMkEgQTEr3O3168_kJov1kMfEHfrnuLQOK0CrFdiTA'

  //   },
  // }), []);

  useEffect(() => {
    setPage(1);
  }, [searchQuery]);

  const { data: movies, loading, error } = useFetchMovies(url);

  if (loading) return <div>Loading...</div>;
  // if (loading) return (
  //   <div className="flex justify-center items-center min-h-screen">
  //     <div className="text-center">
  //       <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto"></div>
  //       <p className="mt-4 text-xl text-black">Loading...</p>
  //     </div>
  //   </div>
  // );

  if (error) return <div>{error}</div>;

  return (
    movies &&
    (<main>
      <section className="max-w-7xl max-auto py-7">

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {movies.results.map((movie, index) => (
            <Card key={index} movie={movie} />
          ))}

        </div>

        {movies.total_pages > 1 && <div className="flex justify-between mt-6">
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

          {page < movies.total_pages && (
            <button
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          )}
        </div>}

      </section>
    </main>)
  )
}

export default Search
