import { FormData } from "../components/Add Modal/Modal";

export const createMovie = async (movie: FormData, token: string, userId: number) => {
    const {VITE_API_URL: url} = import.meta.env
    try {
        const response = await fetch(`${url}/movie/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                name: movie.title,
                poster_image: movie.imgSrc,
                score: movie.rating,
                genres: [{name: movie.genres}]
            })
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error)
    }
}

export const fetchMovies = async (token: string, userId: number) => {
    const { VITE_API_URL: url } = import.meta.env;
    try {
        const response = await fetch(`${url}/movie/user/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const moviesData = await response.json();
            return moviesData;
        } else {
            console.error('Failed to fetch movies');
            return [];
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        return [];
    }
};

export const fetchMovieById = async (token: string, movieId: number) => {
    const { VITE_API_URL: url } = import.meta.env;
    try {
        const response = await fetch(`${url}/movie/${movieId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            const movieData = await response.json();
            return movieData;
        } else {
            console.error(`Failed to fetch movie with ID `);
            return null;
        }
    } catch (error) {
        console.error(`Error fetching movie with ID`, error);
        return null;
    }
};

export const deleteMovieById = async (token: string, movieId: number) => {
    const { VITE_API_URL: url } = import.meta.env;
    try {
        const response = await fetch(`${url}/movie/${movieId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            console.log(`Movie with ID deleted successfully`);
            return true; 
        } else {
            console.error(`Failed to delete movie with ID`);
            return false; 
        }
    } catch (error) {
        console.error(`Error deleting movie with ID `, error);
        return false;
    }
};
