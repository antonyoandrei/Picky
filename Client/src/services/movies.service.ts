import { FormData } from "../components/Add Modal/Modal";

export const createMovie = async (movie: FormData, token: string) => {
    const {VITE_API_URL: url} = import.meta.env

    try {
        const response = await fetch(`${url}/movie/6`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body:JSON.stringify({
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
