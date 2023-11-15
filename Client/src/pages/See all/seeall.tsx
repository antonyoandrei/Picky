import { Key, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MovieContext } from "../../context/MovieContext";
import './seeall.css'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const SeeAll = () => {
    const query = useQuery();
    const title = query.get("title") || "";

    const { movieSets } = useContext(MovieContext);
    const movies = title === "All movies" ? movieSets.allMovies : movieSets.myMovies;

    return (
        <>
            <main className="see-all-component">
                <h1 className="see-all-title">{title}</h1>
                {movies.length > 0 ? (
                  <section className="movies-wrapper">
                      {movies.map((movie: { imgSrc: string; title: string; }, index: Key) => (
                          <article className="swiper-slide" key={index}>
                              <NavLink to={'/details'}>
                                  <img className='cover' src={movie.imgSrc || 'https://res.cloudinary.com/du94mex28/image/upload/v1699002566/Picky/sans-affiche_hgymml.png'} alt={movie.title}/>
                              </NavLink>
                          </article>
                      ))}
                  </section>
                ) : (
                  <p className="fallback-text-2">No movies added yet.</p>
                )}
            </main>
        </>
    )
} 

export default SeeAll;