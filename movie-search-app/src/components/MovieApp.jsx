import React, { useEffect, useState } from 'react'
import './MovieApp.css'
import { AiOutlineSearch } from "react-icons/ai";
import axios from 'axios';

export const MovieApp = () => {
  const [movie, setMovie] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [expandedMovieId, setExpandedMovieId] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/genre/movie/list',
          {
            params: {
              api_key: '28143ec8304a3c9bac5a0b8e7657c290',
            },
          }
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let endpoint = searchQuery 
          ? 'https://api.themoviedb.org/3/search/movie'
          : 'https://api.themoviedb.org/3/discover/movie';
          
        const response = await axios.get(endpoint, {
          params: {
            api_key: '28143ec8304a3c9bac5a0b8e7657c290',
            sort_by: sortBy,
            page: 1,
            with_genres: selectedGenre,
            query: searchQuery || undefined,
          }
        });
        setMovie(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    
    fetchMovies();
  }, [searchQuery, sortBy, selectedGenre]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  }
  
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  }
  
  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  }

  const handleSearchSubmit = async () => {
    try {
      const response = await axios.get(
       'https://api.themoviedb.org/3/search/movie',
       {
        params: {
          api_key: '28143ec8304a3c9bac5a0b8e7657c290',
          query: searchQuery,
        },
       }
      );
      setMovie(response.data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  }
  
  const toggleDescription = (movieId) => {
    setExpandedMovieId(expandedMovieId === movieId ? null : movieId);
  }

  return (
    <div>
      <h1>MovieHouse</h1>
      <div className='search-bar'>
        <input 
          type="text" 
          value={searchQuery} 
          onChange={handleSearchChange} 
          className='search-input'  
          placeholder='Search Movie...'
        />
        <button onClick={handleSearchSubmit} className='search-button'>
          <AiOutlineSearch />
        </button>
      </div>
      
      <div className='filter'>
        <label htmlFor='sort-by'>Sort By:</label>
        <select id='sort-by' value={sortBy} onChange={handleSortChange}>
          <option value="popularity.desc">Popularity Descending</option>
          <option value="popularity.asc">Popularity Ascending</option>
          <option value="vote_average.desc">Rating Descending</option>
          <option value="vote_average.asc">Rating Ascending</option>
          <option value="release_date.desc">Release Date Descending</option>
          <option value="release_date.asc">Release Date Ascending</option>
        </select>
        
        <label htmlFor='genre'>Genre:</label>
        <select id='genre' value={selectedGenre} onChange={handleGenreChange}>
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>
      
      <div className='movie-wrapper'>
        {movie.map((movie) => (
          <div key={movie.id} className='movie'>
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title}
              onError={(e) => {e.target.onerror = null; e.target.src='https://via.placeholder.com/300x450?text=No+Image'}}
            />
            <h2>{movie.title}</h2>
            <p className='rating'>Rating: {movie.vote_average}</p>
            {movie.overview && (
              <>
                {expandedMovieId === movie.id ? (
                  <p>{movie.overview}</p>
                ) : (
                  <p>{movie.overview.substring(0, 150)}...</p>
                )}
                <button 
                  onClick={() => toggleDescription(movie.id)}
                  className='read-more'
                >
                  {expandedMovieId === movie.id ? 'Show Less' : 'Read More'}
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}