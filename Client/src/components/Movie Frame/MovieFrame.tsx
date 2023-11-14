import Swiper from 'swiper';
import './movieframe.css';
import { Key, useContext, useEffect } from 'react';
import 'swiper/swiper-bundle.css';
import { NavLink } from 'react-router-dom';
import { MovieContext } from '../../context/MovieContext';

interface MovieFrameComponentProps {
  id: string;
  movieSet: 'allMovies';
}

const MovieFrameComponent: React.FC<MovieFrameComponentProps> = ({ id, movieSet }) => {
  const { movieSets } = useContext(MovieContext);
  const movies = movieSets[movieSet];

  useEffect(() => {
    const swiperContainer = document.querySelector(`.swiper-hero`) as HTMLElement;
    if (swiperContainer) {
      const swiper = new Swiper(swiperContainer, {
        loop: true,
        slidesPerView: 5,
        spaceBetween: 50,
        navigation: {
          nextEl: `.swiper-button-next`,
          prevEl: `.swiper-button-prev`,
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
      <section className="swiper swiper-hero">
        <div className="swiper-wrapper">
          {movies.map((movie: { imgSrc: any; title: string; }, index: Key) => (
            <article className="swiper-slide" key={index}>
              <NavLink to={'/details'}>
                <img className='cover' src={movie.imgSrc || 'https://res.cloudinary.com/du94mex28/image/upload/v1699002566/Picky/sans-affiche_hgymml.png'} alt={movie.title} />
              </NavLink>
            </article>
          ))}
        </div>
        {movies.length === 0 && <span className='fallback-text'>No movies added yet</span>}
        <button className={`swiper-button-prev`}></button>
        <button className={`swiper-button-next`}></button>
      </section>
    </>
  );
}

export default MovieFrameComponent;
