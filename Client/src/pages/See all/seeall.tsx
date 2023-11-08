import { NavLink, useLocation } from "react-router-dom";
import './seeall.css'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const SeeAll = () => {
    const query = useQuery();
    const title = query.get("title") || "";
    
    return (
        <>
            <main className="see-all-component">
                <h1 className="see-all-title">{title}</h1>
                <section className="movies-wrapper">
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
                </section>
            </main>
        </>
    )
} 

export default SeeAll