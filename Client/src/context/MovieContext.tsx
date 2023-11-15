import { createContext, useState, useEffect, ReactNode } from 'react';

export type MovieType = {
  title: string;
  rating: number;
  genres: string;
  imgSrc: string;
};

type MovieSets = {
  [x: string]: any;
  allMovies: MovieType[];
};

type MovieContextType = {
  movieSets: MovieSets;
  addMovieToAll: (movie: MovieType) => void;
};

export const MovieContext = createContext<MovieContextType>({
  movieSets: {
    allMovies: [],
  },
  addMovieToAll: () => {},
});

type MovieProviderProps = {
  children: ReactNode;
};

export const MovieProvider = ({ children }: MovieProviderProps) => {
  const [movieSets, setMovieSets] = useState<MovieSets>(() => {
    const localData = localStorage.getItem('movieSets');
    return localData ? JSON.parse(localData) : { allMovies: [] };
  });

  useEffect(() => {
    localStorage.setItem('movieSets', JSON.stringify(movieSets));
  }, [movieSets]);

  const addMovieToAll = (movie: MovieType) => {
    setMovieSets((prevSets) => {
      const updatedSets = {
        ...prevSets,
        allMovies: [...prevSets.allMovies, movie]
      };
      localStorage.setItem('movieSets', JSON.stringify(updatedSets));
      return updatedSets;
    });
  };

  return (
    <MovieContext.Provider value={{ movieSets, addMovieToAll }}>
      {children}
    </MovieContext.Provider>
  );
};
