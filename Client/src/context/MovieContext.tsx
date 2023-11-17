import { createContext, useState, useEffect, ReactNode } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { fetchMovies } from '../services/movies.service';

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

const MovieProvider = ({ children }: MovieProviderProps) => {
  const [movieSets, setMovieSets] = useState<MovieSets>(() => ({ allMovies: [] }));
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();

  useEffect(() => {
    const fetchMoviesForUser = async () => {
        try {
            const moviesData = await fetchMovies(user?.idToken || '');
            setMovieSets((prevSets) => ({
                ...prevSets,
                allMovies: moviesData,
            }));
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    if (isAuthenticated && user) {
        fetchMoviesForUser();
    }
}, [isAuthenticated, user]);

  const addMovieToAll = (movie: MovieType) => {
    if (isAuthenticated && user) {
      setMovieSets((prevSets) => ({
        ...prevSets,
        allMovies: [...prevSets.allMovies, movie],
      }));
    } else {
      loginWithRedirect();
    }
  };

  return (
    <MovieContext.Provider value={{ movieSets, addMovieToAll }}>
      {children}
    </MovieContext.Provider>
  );
};
const { VITE_AUTH0_DOMAIN: domain, VITE_AUTH0_CLIENT_ID: clientId, VITE_AUTH0_AUDIENCE: audience } = import.meta.env;
const redirectUri = window.location.origin

export const AuthenticatedMovieProvider = ({ children }: MovieProviderProps) => (
  <Auth0Provider 
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri,
                audience: audience
                }}>
    <MovieProvider>{children}</MovieProvider>
  </Auth0Provider>
);

export default AuthenticatedMovieProvider;
