import { NavLink } from "react-router-dom"
import MovieFrameComponent from "../../components/Movie Frame/MovieFrame"
import './homepage.css'

const Homepage = () => {
    return (
        <>
            <main className="home-wrapper">
                <section className="frame-title-wrapper">
                    <div className="frame-title">All movies</div>
                    <NavLink to={`/see-all?title=All movies`}>
                        <button className="see-all-btn"><p className="see-all-text">See all</p></button>
                    </NavLink>
                </section>
                <MovieFrameComponent id="firstSwiper"/>
                <section className="frame-title-wrapper">
                    <div className="frame-title">My movies</div>
                    <NavLink to={`/see-all?title=My movies`}>
                        <button className="see-all-btn"><p className="see-all-text">See all</p></button>
                    </NavLink>
                </section>
                <MovieFrameComponent id="secondSwiper"/>
            </main>
        </>
    )
} 

export default Homepage