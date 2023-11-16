import { NavLink } from "react-router-dom"
import MovieFrameComponent from "../../components/Movie Frame/MovieFrame"
import './homepage.css'
import { useAuth0 } from "@auth0/auth0-react";

const Homepage = () => {
    const {isLoading} = useAuth0()

    if (isLoading) {
        return (
          <div className="cradle-wrapper">
            <div className="newtons-cradle">
              <div className="newtons-cradle__dot"></div>
              <div className="newtons-cradle__dot"></div>
              <div className="newtons-cradle__dot"></div>
              <div className="newtons-cradle__dot"></div>
            </div>
          </div>
        )
    };

    return (
        <>
            <main className="home-wrapper">
                <section className="frame-title-wrapper">
                    <div className="frame-title">All movies</div>
                    <NavLink to={`/see-all?title=All movies`}>
                        <button className="see-all-btn"><p className="see-all-text">See all</p></button>
                    </NavLink>
                </section>
                <MovieFrameComponent id="firstSwiper" movieSet="allMovies"/>
            </main>
        </>
    )
} 

export default Homepage
