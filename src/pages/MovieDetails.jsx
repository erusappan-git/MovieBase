import { useParams } from "react-router-dom";
import useFetchMovies from "../hooks/useFetchMovies";
import { useEffect } from "react";

const MovieDetails = () => {

  const { id } = useParams();

  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

  // const options = useMemo(() => ({
  //   method: 'GET',

  //   headers: {

  //     accept: 'application/json',

  //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDM2NTViZTc0ZTNhOTA5ZTJmZWNiM2Q0ODQxMDc5YyIsIm5iZiI6MTcyNTk0OTc4Ny4yNDExNjIsInN1YiI6IjY2ZDllYzY2MzA2ZDU4YWFiNzYwNmQ2MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OwMkEgQTEr3O3168_kJov1kMfEHfrnuLQOK0CrFdiTA'
    
  //   },
  // }), []);

  const { data: movie, error, loading } = useFetchMovies( url );

  useEffect(()=>{

    if(movie){
      document.title = `${movie.title} - MovieBase`
    }

    return () => {
      document.title = "MovieBase";
    };

  },[movie])

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

    movie && 
    <div className="relative bg-gray-800 text-white mt-1">

      <div className="absolute inset-0">
        
        <img
          className="w-full h-full object-cover opacity-40"
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
        />

        <div className="absolute inset-0 bg-black opacity-50"></div>

      </div>

      <div className="relative max-w-7xl mx-auto py-16 px-4 lg:px-8 flex flex-col lg:flex-row items-center">

        <div className="w-full lg:w-1/4">

          <img
            className="rounded-lg shadow-lg"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />

        </div>

        <div className="w-full lg:w-3/4 lg:pl-10">

          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

          <div className="flex items-center space-x-3 mb-4">

            <span className="bg-yellow-500 text-black py-1 px-3 rounded-md font-semibold">
              {movie.vote_average * 10}% Score
            </span>

            <span className="border border-gray-300 py-1 px-3 rounded-md">
              {movie.release_date}
            </span>

            <span className="border border-gray-300 py-1 px-3 rounded-md">
              {movie.runtime} min
            </span>

          </div>

          <p className="text-gray-300 mb-6">
            <span className="font-semibold">Genres:</span> {movie.genres.map((genre) => genre.name).join(", ")}
          </p>

          <p className="text-gray-100 text-lg mb-6">{movie.overview}</p>

          <a
            href={movie.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Watch Trailer
          </a>

        </div>

      </div>

    </div>
  )
}

export default MovieDetails
