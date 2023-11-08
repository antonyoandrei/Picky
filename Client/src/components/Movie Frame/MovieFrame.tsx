import Swiper from 'swiper';
import './movieframe.css';
import { useContext, useEffect, useRef } from 'react';
import 'swiper/swiper-bundle.css';
import { NavLink } from 'react-router-dom';
import { MovieContext } from '../../context/MovieContext';

interface MovieFrameComponentProps {
  id: string;
  movieSet: 'allMovies' | 'myMovies';
}

const MovieFrameComponent: React.FC<MovieFrameComponentProps> = ({ id, movieSet }) => {
  const swiperRef = useRef<HTMLDivElement>(null);
  const { movieSets } = useContext(MovieContext);
  const movies = movieSets[movieSet];

  useEffect(() => {
    const swiperContainer = swiperRef.current;
    if (swiperContainer) {
      const swiper = new Swiper(swiperContainer, {
        loop: true,
        slidesPerView: 5,
        spaceBetween: 50,
        navigation: {
          nextEl: `.swiper-button-next-${id}`,
          prevEl: `.swiper-button-prev-${id}`,
        },
      });

      swiper.update();

      return () => {
        swiper.destroy(true, true);
      };
    }
  }, [id, movies]);

  return (
    <>
      <section className="swiper swiper-hero" ref={swiperRef}>
        <div className="swiper-wrapper">
          {movies.map((movie, index) => (
            <article className="swiper-slide" key={index}>
              <NavLink to={'/details'}>
                <img className='cover' src={movie.imgSrc || 'https://res.cloudinary.com/du94mex28/image/upload/v1699002566/Picky/sans-affiche_hgymml.png'} alt={movie.title} />
              </NavLink>
            </article>
          ))}
        </div>
        {movies.length === 0 && <span className='fallback-text'>No movies added yet</span>}
        <button className={`swiper-button-prev swiper-button-prev-${id}`}></button>
        <button className={`swiper-button-next swiper-button-next-${id}`}></button>
      </section>
    </>
  );
}

export default MovieFrameComponent;
