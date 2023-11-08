import Swiper from 'swiper';
import './movieframe.css';
import { useEffect, useRef, useState } from 'react';
import 'swiper/swiper-bundle.css';
import { NavLink } from 'react-router-dom';

interface MovieFrameComponentProps {
  id: string;
}

const MovieFrameComponent: React.FC<MovieFrameComponentProps> = ({ id }) => {
  const swiperRef = useRef<HTMLDivElement>(null);
  const [hasSlides, setHasSlides] = useState(true);

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = new Swiper(swiperRef.current, {
        loop: true,
        slidesPerView: 5,
        spaceBetween: 50,
        navigation: {
          nextEl: `.swiper-button-next-${id}`,
          prevEl: `.swiper-button-prev-${id}`,
        },
      });

      const prevButton = document.querySelector(`.swiper-button-prev-${id}`) as HTMLElement;
      const nextButton = document.querySelector(`.swiper-button-next-${id}`) as HTMLElement;

      prevButton.addEventListener('click', () => {
        swiper.slidePrev();
      });

      nextButton.addEventListener('click', () => {
        swiper.slideNext();
      });

      if (swiper.slides.length === 0) {
        setHasSlides(false);
      } else {
        setHasSlides(true)
      }
    }
  }, [id]);

  return (
    <>
      <section className="swiper swiper-hero" ref={swiperRef}>
        <div className="swiper-wrapper">
          <article className="swiper-slide">
            <NavLink to={'/details'}>
              <img className='cover' src='https://res.cloudinary.com/du94mex28/image/upload/v1699002566/Picky/sans-affiche_hgymml.png'/>
            </NavLink>
          </article>
          <article className="swiper-slide">
            <NavLink to={'/details'}>
              <img className='cover' src='https://res.cloudinary.com/du94mex28/image/upload/v1699002566/Picky/sans-affiche_hgymml.png'/>
            </NavLink>
          </article>
          <article className="swiper-slide">
            <NavLink to={'/details'}>
              <img className='cover' src='https://res.cloudinary.com/du94mex28/image/upload/v1699002566/Picky/sans-affiche_hgymml.png'/>
            </NavLink>
          </article>
          <article className="swiper-slide">
            <NavLink to={'/details'}>
              <img className='cover' src='https://res.cloudinary.com/du94mex28/image/upload/v1699002566/Picky/sans-affiche_hgymml.png'/>
            </NavLink>
          </article>
          <article className="swiper-slide">
            <NavLink to={'/details'}>
              <img className='cover' src='https://res.cloudinary.com/du94mex28/image/upload/v1699002566/Picky/sans-affiche_hgymml.png'/>
            </NavLink>
          </article>
          <article className="swiper-slide">
            <NavLink to={'/details'}>
              <img className='cover' src='https://res.cloudinary.com/du94mex28/image/upload/v1699002566/Picky/sans-affiche_hgymml.png'/>
            </NavLink>
          </article>
        </div>
        {!hasSlides && <span className='fallback-text'>No movies added yet</span>}     
        <button className={`swiper-button-prev swiper-button-prev-${id}`}></button>
        <button className={`swiper-button-next swiper-button-next-${id}`}></button>
      </section>
    </>
  );
}

export default MovieFrameComponent;
